angular.module('module_app.controllers.object_edit', [])

    .filter('lonlat', function($filter) {
        return function(location, fallback) {
            if (location) {
                return $filter('number')(location.longitude, 2) + ', ' + $filter('number')(location.latitude, 2);
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

        self.isClosed = !!objectDoc.positionFin;

        self.isNewObject = !$routeParams.id;

        self.isLinear = true;

        self.refs = refTypes;

        self.setupRef = function(field, defaultRef, isMultiple) {
            if (angular.isDefined(self.doc[field])) {
                return;
            }
            if (angular.isObject(defaultRef)) {
                self.doc[field] = isMultiple ? [defaultRef.id] : defaultRef.id;
            } else {
                self.doc[field] = isMultiple ? [] : undefined;
            }
        };

        self.save = function() {
            var coordinate = ol.proj.transform([self.geoloc.longitude, self.geoloc.latitude], 'EPSG:4326', 'EPSG:2154');

            // Set position(s).
            if (self.isNewObject) {
                self.doc.positionDebut = 'POINT(' + coordinate[0] + ' ' + coordinate[1] + ')';
            }
            if (!self.isLinear || (!self.isNewObject && !self.isClosed)) {
                self.doc.positionFin = 'POINT(' + coordinate[0] + ' ' + coordinate[1] + ')';
            }

            // Set photo(s).
            self.doc.photos = self.photos;

            // Save document.
            EditionService.saveObject(self.doc).then(function() {
                $location.path('/main');
            });
        };

        self.delete = function() {
            LocalDocument.remove(self.doc).then(function() {
                $location.path('/main');
            });
        };

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

        self.setPos = function(pos) {
            self.geoloc = pos;
        };

        function waitForLocation(locationPromise) {
            $ionicLoading.show({ template: 'En attente de localisation...' });
            return locationPromise.then(function handleLocation(location) {
                self.geoloc = location.coords;
                $ionicLoading.hide();
            });
        }

        // Medias
        // ----------

        self.mediaPath = null;

        self.photos = angular.copy(self.doc.photos);

        self.recordAudio = function() {
            // TODO → to implement
        };

        self.takePhoto = function() {
            navigator.camera.getPicture(photoCaptureSuccess, photoCaptureError, {
                quality: 50,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                encodingType:navigator.camera.EncodingType.PNG
            });
        };

        self.drawNote = function() {
            self.setView('note');
        };

        self.saveNote = savePicture;

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
                var fileName = self.doc._id + '_' + uuid4.generate() + '.png';

                // Copy image file in its final directory.
                imageFile.copyTo(targetDir, fileName, function() {

                    // Store the photo in the object document.
                    self.photos.push({
                        '@class': 'fr.sirs.core.model.Photo',
                        'chemin': fileName
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