angular.module('app.controllers.object_edit', [])

    .filter('lonlat', function ($filter) {
        return function (coordinate, fallback) {
            if (coordinate) {
                return $filter('number')(coordinate[0], 3) + ', ' + $filter('number')(coordinate[1], 3);
            }
            return fallback;
        }
    })

    .service('PositionMapManager', function CacheMapManager(BackLayerService, currentView) {

        var self = this;

        self.buildConfig = function () {
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
                                                                      EditionService, objectDoc, refTypes,
                                                                      uuid4, SirsDoc, $ionicModal, orientationsList, $filter,
                                                                      cotesList, $rootScope, listTroncons, MapManager) {

        var self = this;

        $rootScope.loadingflag = false;

        var dataProjection = SirsDoc.get().epsgCode;

        self.gpsAccuracy = '-';

        //@hb Watch the gps location

        GeolocationService.trackLocation().then(angular.noop, angular.noop, function (position) {
            self.gpsAccuracy = Math.round(position.coords.accuracy);
        });

        // Navigation
        // -----------

        self.view = 'form';

        self.tab = 'fields';

        self.setTab = function (name) {
            if (name !== self.tab) {
                self.tab = name;
                $ionicScrollDelegate.$getByHandle('formScroll').scrollTop(false);
            }
        };

        self.setView = function (name) {
            if (name !== self.view) {
                self.view = name;
            }
        };

        self.backToForm = function () {
            self.setView('form');
        };

        //@hb
        self.orientations = orientationsList;
        //@hb
        self.cotes = cotesList;

        self.type = $routeParams.type;

        // L'objet qui contient les information de l'objet à ajouter à la base de données
        self.doc = objectDoc;

        self.isNew = !$routeParams.id;

        self.isClosed = (!!objectDoc.positionFin || !!objectDoc.geometry);

        self.isLinear = (self.isNew || !self.isClosed || (objectDoc.positionDebut !== objectDoc.positionFin));

        self.refs = refTypes;

        self.linearPosEditionHandler = {
            startPoint: false,
            endPoint: false
        };

        //************************************************************************
        //Réfere au Tronçon Id

        var listeCool = cleanTronconsListe(listTroncons);

        $scope.$watch(function () {
            return self.doc.positionDebut;
        }, function (newValue) {
            if (angular.isDefined(newValue)) {
                var troncons = calculateDistanceObjectTroncon(
                    newValue,
                    listeCool);
                self.troncons = troncons;
            }
        });

        //@hb
        function cleanTronconsListe(liste) {
            var indexes = [];
            var listCool = [];
            // Get the indexes list of not validated Tronçons
            angular.forEach(liste, function (elt, ind) {
                if (elt.value.valid || angular.isDefined(elt.value.geometry)) {
                    listCool.push(elt);
                }
            });
            return listCool;
        }

        //@hb
        function calculateDistanceObjectTroncon(point, liste) {
            var nearTronconList = [];
            // geomatryPosition is instance of ol.geom.Point
            var geomatryPosition = new ol.format.WKT().readGeometry(point, {
                dataProjection: SirsDoc.get().epsgCode,
                featureProjection: 'EPSG:3857'
            });

            var positionCoord = geomatryPosition.getCoordinates();
            var geom, geomTronc;
            // Get of the LineStrings from the list of Troncons
            angular.forEach(liste, function (elt, i) {
                try {
                    geom = new ol.format.WKT().readGeometry(elt.value.geometry, {
                        dataProjection: SirsDoc.get().epsgCode,
                        featureProjection: 'EPSG:3857'
                    });
                }
                catch (e) {
                    console.log(e);
                }
                geomTronc = geom.getClosestPoint(positionCoord);
                // Calculate the distance between two point

                var wgs84Sphere = new ol.Sphere(6378137);
                // The distance
                var dist = wgs84Sphere.haversineDistance(ol.proj.transform(positionCoord, 'EPSG:3857', 'EPSG:4326'),
                    ol.proj.transform(geomTronc, 'EPSG:3857', 'EPSG:4326')) / 1000;
                if (dist <= 1) {
                    nearTronconList.push(elt.value);
                }
            });
            // The list of the nearest Troncons
            return nearTronconList;
        }

        self.setupRef = function (field, defaultRef, isMultiple) {
            if (angular.isDefined(objectDoc[field])) {
                return;
            }
            if (angular.isObject(defaultRef)) {
                objectDoc[field] = isMultiple ? [defaultRef.id] : defaultRef.id;
            } else {
                objectDoc[field] = isMultiple ? [] : undefined;
            }
        };

        self.createMeasure = function () {
            var defaultRef = self.refs.RefReferenceHauteur[0];
            return {
                '_id': uuid4.generate(),
                '@class': 'fr.sirs.core.model.MesureMonteeEaux',
                'date': new Date().toISOString(),
                'referenceHauteurId': defaultRef ? defaultRef.id : undefined,
                'hauteur': 0
            };
        };

        self.save = function () {
            //@hb Add the source of the Desordre
            if (objectDoc['@class'] === "fr.sirs.core.model.Desordre") {
                objectDoc["sourceId"] = "RefSource:4";
            }

            objectDoc.valid = false;
            // return to edit mode
            objectDoc.linearId = null;

            EditionService.saveObject(objectDoc).then(function () {
                MapManager.syncAllAppLayer();
                $location.path('/main');
            });
        };

        self.delete = function () {
            LocalDocument.remove(objectDoc).then(function () {
                $location.path('/main');
            });
        };

        self.changeObjectType = function () {
            if (self.isLinear) {
                delete objectDoc.positionFin;
            } else {
                objectDoc.positionFin = objectDoc.positionDebut;
            }
        };

        // Geolocation
        // ----------

        self.geoloc = undefined;

        self.locateMe = function () {
            waitForLocation(GeolocationService.start()).then(GeolocationService.stop);
        };

        self.selectPos = function () {
            self.setView('map');
        };

        self.handlePos = function (pos) {
            var coordinate = ol.proj.transform([pos.longitude, pos.latitude], 'EPSG:4326', dataProjection);
            // Point case
            if (!self.isLinear) {
                objectDoc.positionDebut = 'POINT(' + coordinate[0] + ' ' + coordinate[1] + ')';
                objectDoc.positionFin = 'POINT(' + coordinate[0] + ' ' + coordinate[1] + ')';
            } else {
                // Linear case
                if (self.isNew) {
                    objectDoc.positionDebut = 'POINT(' + coordinate[0] + ' ' + coordinate[1] + ')';
                } else {
                    if (self.linearPosEditionHandler.startPoint) {
                        objectDoc.positionDebut = 'POINT(' + coordinate[0] + ' ' + coordinate[1] + ')';
                        self.linearPosEditionHandler.startPoint = false;
                    }

                    if (self.linearPosEditionHandler.endPoint) {
                        objectDoc.positionFin = 'POINT(' + coordinate[0] + ' ' + coordinate[1] + ')';
                        self.linearPosEditionHandler.endPoint = false;
                    }
                }
            }
        };

        self.getStartPos = function () {
            return objectDoc.positionDebut ? parsePos(objectDoc.positionDebut) : undefined;
        };

        self.getEndPos = function () {
            return objectDoc.positionFin ? parsePos(objectDoc.positionFin) : undefined;
        };

        function parsePos(position) {
            var strings = position.substring(7, position.length - 1).split(' '),
                numbers = [parseFloat(strings[0]), parseFloat(strings[1])];
            return ol.proj.transform(numbers, dataProjection, 'EPSG:4326');
        }

        function waitForLocation(locationPromise) {
            $ionicLoading.show({template: 'En attente de localisation...'});
            return locationPromise.then(function handleLocation(location) {
                self.handlePos(location.coords);
                $ionicLoading.hide();
            });
        }

        // Medias
        // ----------

        self.mediaPath = null;

        //@hb get the value of Orientation & Côté from the Data Base
        self.goToMedia = function () {
            self.setView('media');
        };

        self.recordAudio = function () {
            // TODO → to implement
        };

        self.takePhoto = function () {
            navigator.camera.getPicture(photoCaptureSuccess, photoCaptureError, {
                quality: 50,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                encodingType: navigator.camera.EncodingType.JPEG
            });
        };

        self.drawNote = function () {
            self.setView('note');
        };

        self.saveNote = savePicture;

        self.loaded = {};

        window.b64toBlob = function (b64Data, contentType, sliceSize) {
            contentType = contentType || '';
            sliceSize = sliceSize || 512;

            var byteCharacters = atob(b64Data);
            var byteArrays = [];

            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);

                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);

                byteArrays.push(byteArray);
            }

            var blob = new Blob(byteArrays, {type: contentType});
            return blob;
        };

        self.loadImage = function (photo) {
            var image_url = self.getPhotoPath(photo);
            $.ajax({
                url: image_url, type: 'HEAD',
                error: function () {
                    if (self.doc._attachments) {
                        var keyAttachment = null;
                        var objAttachment;
                        angular.forEach(Object.keys(self.doc._attachments), function (key) {
                            if (key.indexOf(photo.id) != -1) {
                                keyAttachment = key;
                            }
                        });
                        objAttachment = self.doc._attachments[keyAttachment];
                        if (objAttachment) {
                            LocalDocument.getAttachment(self.doc._id, keyAttachment)
                                .then(function (blob) {
                                    var blobImage = blob;
                                    var fileName;
                                    if (keyAttachment.indexOf('.') != -1) {
                                        fileName = keyAttachment;
                                    } else {
                                        var ext;
                                        switch (objAttachment.content_type) {
                                            case "image/jpeg":
                                                ext = ".jpg";
                                                break;
                                            case "image/png":
                                                ext = ".png";
                                                break;
                                            case "image/gif":
                                                ext = ".gif";
                                                break;
                                            case "image/tiff":
                                                ext = ".tif";
                                                break;
                                        }
                                        fileName = keyAttachment + ext;
                                    }
                                    window.resolveLocalFileSystemURL(self.mediaPath, function (targetDir) {
                                        targetDir.getFile(fileName, {create: true}, function (file) {
                                            file.createWriter(function (fileWriter) {
                                                fileWriter.write(blobImage);
                                                window.setTimeout(function () {
                                                    $scope.$digest();
                                                    self.loaded[photo.id] = true;
                                                }, 10);
                                            }, function () {
                                                console.log('cannot write the data to the file');
                                            });
                                        });
                                    });
                                });
                        } else {
                            console.log("no attachment exit to load image");
                        }
                    }
                },
                success: function () {
                    window.setTimeout(function () {
                        window.setTimeout(function () {
                            self.loaded[photo.id] = true;
                            $scope.$digest();
                        }, 100);
                    }, 10);
                }
            });
        };

        self.open = function (photo) {
            var url = self.getPhotoPath(photo);
            window.cordova.plugins.fileOpener2.open(
                decodeURI(url),
                'image/jpeg',
                {
                    error: function (e) {
                        console.log('Error ' + e);
                    },
                    success: function () {
                        console.log('file opened successfully');
                    }
                }
            );
        };

        self.getPhotoPath = function (photo) {
            var path = photo.id + photo.chemin.substring(photo.chemin.indexOf('.')).toLowerCase();
            var image_url = self.mediaPath + '/' + path;
            return image_url;
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
            window.resolveLocalFileSystemURL(self.mediaPath, function (targetDir) {
                var photoId = uuid4.generate(),
                    fileName = photoId + '.jpg';

                // Copy image file in its final directory.
                imageFile.copyTo(targetDir, fileName, function () {
                    objectDoc.photos = objectDoc.photos || [];

                    // Store the photo in the object document.
                    objectDoc.photos.push({
                        'id': photoId,
                        '@class': 'fr.sirs.core.model.Photo',
                        'date': $filter('date')(new Date(), 'yyyy-MM-dd'),
                        'chemin': '/' + fileName,
                        'valid': false
                    });

                    objectDoc._attachments = objectDoc._attachments || {};

                    var xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        var reader = new FileReader();
                        reader.onloadend = function () {
                            // Save the photo like attachment to the object
                            objectDoc._attachments[photoId] = {
                                content_type: 'image/jpeg',
                                data: reader.result
                            };
                        };

                        reader.readAsDataURL(xhr.response);
                    };
                    xhr.open('GET', self.getPhotoPath(objectDoc.photos[objectDoc.photos.length - 1]));
                    xhr.responseType = 'blob';
                    xhr.send();

                    // Force digest.
                    $scope.$digest();
                });
            });
        }

        $ionicPlatform.ready(function () {
            // Acquire the medias storage path when the device is ready.
            self.mediaPath = window.cordova.file.externalDataDirectory + 'medias';
        });
    })

    .controller('ObjectEditPosController', function (currentView) {

        var self = this;


        self.success = angular.noop;

        self.exit = angular.noop;


        self.setup = function (success, exit) {
            self.success = success;
            self.exit = exit;
        };

        self.validate = function () {
            var coordinate = ol.proj.transform(currentView.getCenter(), 'EPSG:3857', 'EPSG:4326');
            self.success({
                longitude: coordinate[0],
                latitude: coordinate[1],
                accuracy: -1
            });
            self.exit();
        }
    })
    .controller('MediaController', function ($window, SirsDoc, $ionicLoading, $filter,
                                             uuid4, $ionicPlatform, $scope, GeolocationService, AuthService) {
        var self = this;

        var dataProjection = SirsDoc.get().epsgCode;

        self.orientations = $scope.c.orientations;

        self.cotes = $scope.c.cotes;

        self.back = function () {
            $scope.c.setView('form');
        };

        self.save = function () {
            if (angular.isUndefined($scope.c.doc.photos)) {
                $scope.c.doc.photos = [];
            }

            $scope.c.doc.photos.push(self.mediaOptions);

            $scope.c.doc._attachments = $scope.c.doc._attachments || {};

            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                var reader = new FileReader();
                reader.onloadend = function () {
                    // Save the photo like attachment to the object
                    $scope.c.doc._attachments[self.mediaOptions.id] = {
                        content_type: 'image/jpeg',
                        data: reader.result.replace('data:image/jpeg;base64,', '')
                    };
                };

                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', self.getPhotoPath($scope.c.doc.photos[$scope.c.doc.photos.length - 1]));
            xhr.responseType = 'blob';
            xhr.send();

            $scope.c.setView('form');
        };

        self.selectPos = function () {
            self.setView('map');
        };

        //@hb
        self.mediaOptions = {
            id: '',
            chemin: '',
            designation: "",
            positionDebut: "",
            orientationPhoto: "",
            coteId: "",
            commentaire: "",
            author: AuthService.getValue()._id
        };

        self.setView = function (name) {
            if (name !== self.view) {
                self.view = name;
            }
        };

        self.view = 'form';

        self.handlePos = function (pos) {

            var coordinate = ol.proj.transform([pos.longitude, pos.latitude], 'EPSG:4326', dataProjection);
            self.mediaOptions.positionDebut = 'POINT(' + coordinate[0] + ' ' + coordinate[1] + ')';

        };

        self.backToForm = function () {
            self.setView('form');
        };

        self.takePhoto = function () {
            self.mediaOptions['id'] = '';
            self.mediaOptions['chemin'] = '';
            navigator.camera.getPicture(photoCaptureSuccess, photoCaptureError, {
                quality: 50,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                encodingType: navigator.camera.EncodingType.JPEG
            });
        };

        self.drawNote = function () {
            self.setView('note');
        };

        self.saveNote = savePicture;

        function photoCaptureSuccess(imageURI) {
            window.resolveLocalFileSystemURL(imageURI, savePicture);
        }

        self.getPhotoPath = function (photo) {
            var path = photo.chemin.replace(/\\/g, '/');
            if (path.charAt(0) !== '/') {
                path = '/' + path;
            }
            return self.mediaPath + path;
        };

        function photoCaptureError() {
            // TODO → handle error
        }

        function savePicture(imageFile) {
            //Check image size
            imageFile.file(function (fileObj) {
                if (fileObj.size > 1048576) {
                    $cordovaToast
                        .showLongTop("S'il vous plaît, il faut choisir une image inférieure à 1,2 Mo");
                } else {
                    if (!self.mediaPath) {
                        return;
                    }
                    window.resolveLocalFileSystemURL(self.mediaPath, function (targetDir) {
                        var photoId = uuid4.generate(),
                            fileName = photoId + '.jpg';

                        // Copy image file in its final directory.
                        imageFile.copyTo(targetDir, fileName, function () {
                            // Store the photo in the object document.

                            self.mediaOptions['id'] = photoId;
                            self.mediaOptions['@class'] = 'fr.sirs.core.model.Photo';
                            self.mediaOptions['date'] = $filter('date')(new Date(), 'yyyy-MM-dd');
                            self.mediaOptions['chemin'] = '/' + fileName;
                            self.mediaOptions['valid'] = false;

                            // Force digest.
                            $scope.$digest();
                        });
                    });
                }
            });
        }

        self.waitForLocation = function (locationPromise) {
            $ionicLoading.show({template: 'En attente de localisation...'});
            return locationPromise.then(function handleLocation(location) {
                self.handlePos(location.coords);
                $ionicLoading.hide();
            });
        };

        self.locateMe = function () {
            self.waitForLocation(GeolocationService.start()).then(GeolocationService.stop);
        };

        $ionicPlatform.ready(function () {
            // Acquire the medias storage path when the device is ready.
            self.mediaPath = window.cordova.file.externalDataDirectory + 'medias';
        });
    });