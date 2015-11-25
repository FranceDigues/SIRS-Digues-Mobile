angular.module('module_app.controllers.object_edit', [])

    .filter('lonlat', function($filter) {
        return function(coordinate, fallback) {
            if (coordinate) {
                return $filter('number')(coordinate[0], 3) + ', ' + $filter('number')(coordinate[1], 3);
            }
            return fallback;
        }
    })

    .service('PositionMapManager', function CacheMapManager(BackLayerService, currentView) {

        var self = this;


        self.buildConfig = function() {
            var layerModel = BackLayerService.getActive(),
                source = angular.copy(layerModel.source),
                extent;

            // Override the source if the layer is available from cache.
            if (angular.isObject(layerModel.cache)) {
                extent = layerModel.cache.extent;
                source.type = 'XYZ';
                source.url = layerModel.cache.url;
            }

            // Create layer instance.
            var olLayer = new ol.layer.Tile({
                name: layerModel.title,
                extent: extent,
                model: layerModel,
                source: new ol.source[source.type](source)
            });

            return {
                view: currentView,
                layers: [olLayer],
                controls: [],
                interactions: ol.interaction.defaults({
                    altShiftDragRotate: false,
                    shiftDragZoom: false
                })
            };
        };
    })

    .controller('ObjectEditController', function ObjectEditController($scope, $location, $ionicScrollDelegate,
                                                                      $ionicLoading, $ionicPlatform, $cordovaFile,
                                                                      $routeParams, GeolocationService, LocalDocument,
                                                                      EditionService, objectDoc, refTypes, uuid4) {

        var self = this;

        // Navigation
        // -----------

        self.view = 'form';

        self.tab = 'fields';

        self.setTab = function(name) {
            if (name !== self.tab) {
                self.tab = name;
                $ionicScrollDelegate.$getByHandle('formScroll').scrollTop(false);
            }
        };

        self.setView = function(name) {
            if (name !== self.view) {
                self.view = name;
            }
        };

        self.backToForm = function() {
            self.setView('form');
        };

        // Form
        // ----------

        self.type = $routeParams.type;

        self.doc = objectDoc;

        self.isNew = !$routeParams.id;

        self.isClosed = (!!objectDoc.positionFin || !!objectDoc.geometry);

        self.isLinear = (self.isNew || !self.isClosed || (objectDoc.positionDebut !== objectDoc.positionFin));

        self.refs = refTypes;

        self.setupRef = function(field, defaultRef, isMultiple) {
            if (angular.isDefined(objectDoc[field])) {
                return;
            }
            if (angular.isObject(defaultRef)) {
                objectDoc[field] = isMultiple ? [defaultRef.id] : defaultRef.id;
            } else {
                objectDoc[field] = isMultiple ? [] : undefined;
            }
        };

        self.createMeasure = function() {
            var defaultRef = self.refs.RefReferenceHauteur[0];
            return {
                '_id': uuid4.generate(),
                '@class': 'fr.sirs.core.model.MesureMonteeEaux',
                'date': new Date().toISOString(),
                'referenceHauteurId': defaultRef ? defaultRef.id : undefined,
                'hauteur': 0
            };
        };

        self.save = function() {
            EditionService.saveObject(objectDoc).then(function() {
                $location.path('/main');
            });
        };

        self.delete = function() {
            LocalDocument.remove(objectDoc).then(function() {
                $location.path('/main');
            });
        };

        $scope.$watch(function() { return self.isClosed; }, function(newValue) {
            if (newValue === false) {
                delete objectDoc.positionFin;
            } else if (newValue === true) {
                objectDoc.positionFin = objectDoc.positionDebut;
            }
        });

        // Geolocation
        // ----------

        self.geoloc = undefined;

        self.locateMe = function() {
            if (GeolocationService.isEnabled()) {
                waitForLocation(GeolocationService.getLocationPromise());
            } else {
                waitForLocation(GeolocationService.start()).then(GeolocationService.stop);
            }
        };

        self.selectPos = function() {
            self.setView('map');
        };

        self.handlePos = function(pos) {
            var coordinate = ol.proj.transform([pos.longitude, pos.latitude], 'EPSG:4326', 'EPSG:2154');
            if (self.isNew) {
                objectDoc.positionDebut = 'POINT(' + coordinate[0] + ' ' + coordinate[1] + ')';
            }
            if ((self.isNew && !self.isLinear) || (!self.isNew && !self.isClosed)) {
                objectDoc.positionFin = 'POINT(' + coordinate[0] + ' ' + coordinate[1] + ')';
            }
        };

        self.getStartPos = function() {
            return objectDoc.positionDebut ? parsePos(objectDoc.positionDebut) : undefined;
        };

        self.getEndPos = function() {
            return objectDoc.positionFin ? parsePos(objectDoc.positionFin) : undefined;
        };

        function parsePos(position) {
            var strings = position.substring(7, position.length - 1).split(' '),
                numbers = [parseFloat(strings[0]), parseFloat(strings[1])];
            return ol.proj.transform(numbers, 'EPSG:2154', 'EPSG:4326');
        }

        function waitForLocation(locationPromise) {
            $ionicLoading.show({ template: 'En attente de localisation...' });
            return locationPromise.then(function handleLocation(location) {
                self.handlePos(location.coords);
                $ionicLoading.hide();
            });
        }

        // Medias
        // ----------

        self.mediaPath = null;

        self.recordAudio = function() {
            // TODO → to implement
        };

        self.takePhoto = function() {
            navigator.camera.getPicture(photoCaptureSuccess, photoCaptureError, {
                quality: 50,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                encodingType: navigator.camera.EncodingType.PNG
            });
        };

        self.drawNote = function() {
            self.setView('note');
        };

        self.saveNote = savePicture;

        self.getPhotoPath = function(photo) {
            var path = photo.chemin.replace(/\\/g, '/');
            if (path.charAt(0) !== '/') {
                path = '/' + path;
            }
            return self.mediaPath + path;
        };

        function photoCaptureSuccess(imageURI) {
            window.resolveLocalFileSystemURL(imageURI, savePicture);
        }

        function photoCaptureError() {
            // TODO → handle error
        }

        function savePicture(imageFile) {
            if (!self.mediaPath) {
                return;
            }
            window.resolveLocalFileSystemURL(self.mediaPath, function(targetDir) {
                var photoId = uuid4.generate(),
                    fileName = photoId + '.png';

                // Copy image file in its final directory.
                imageFile.copyTo(targetDir, fileName, function() {
                    objectDoc.photos = objectDoc.photos || [];

                    // Store the photo in the object document.
                    objectDoc.photos.push({
                        'id': photoId,
                        '@class': 'fr.sirs.core.model.Photo',
                        'chemin': '/' + fileName
                    });

                    // Force digest.
                    $scope.$digest();
                });
            });
        }

        $ionicPlatform.ready(function() {
            // Acquire the medias storage path when the device is ready.
            self.mediaPath = window.cordova.file.externalDataDirectory + 'medias';
        });
    })

    .controller('ObjectEditPosController', function(currentView) {

        var self = this;


        self.success = angular.noop;

        self.exit = angular.noop;


        self.setup = function(success, exit) {
            self.success = success;
            self.exit = exit;
        };

        self.validate = function() {
            var coordinate = ol.proj.transform(currentView.getCenter(), 'EPSG:3857', 'EPSG:4326');
            self.success({
                longitude: coordinate[0],
                latitude: coordinate[1],
                accuracy: -1
            });
            self.exit();
        }
    });