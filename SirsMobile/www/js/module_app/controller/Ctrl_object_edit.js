angular.module('module_app.controllers.object_edit', [])

    .filter('lonlat', function($filter) {
        return function(location, fallback) {
            if (location) {
                return $filter('number')(location.longitude, 2) + ', ' + $filter('number')(location.latitude, 2);
            }
            return fallback;
        }
    })

    .controller('ObjectEditController', function ObjectEditController($scope, $location, $ionicScrollDelegate,
                                                                      $ionicLoading, $ionicPlatform, $cordovaFile,
                                                                      $routeParams, GeolocationService, LocalDocument,
                                                                      EditionService, objectDoc, uuid4) {

        var self = this;

        var isClosed = self.isClosed = !!objectDoc.positionFin;

        var isNewObject = self.isNewObject = !$routeParams.id;

        var mediaPath = self.mediaPath = null;


        self.view = 'form';

        self.tab = 'fields';

        self.objectType = $routeParams.type;

        self.objectDoc = objectDoc;

        self.geoloc = undefined;

        self.photos = angular.copy(objectDoc.photos);

        self.isLinear = true;

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

        self.locateMe = function() {
            if (GeolocationService.isEnabled()) {
                waitForLocation(GeolocationService.getLocationPromise());
            } else {
                waitForLocation(GeolocationService.start()).then(GeolocationService.stop);
            }
        };

        self.recordAudio = function() {

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

        self.save = function() {
            var coordinate = ol.proj.transform([self.geoloc.longitude, self.geoloc.latitude], 'EPSG:4326', 'EPSG:2154');

            // Set position(s).
            if (isNewObject) {
                objectDoc.positionDebut = 'POINT(' + coordinate[0] + ' ' + coordinate[1] + ')';
            }
            if (!self.isLinear || (!isNewObject && !isClosed)) {
                objectDoc.positionFin = 'POINT(' + coordinate[0] + ' ' + coordinate[1] + ')';
            }

            // Set photo(s).
            objectDoc.photos = self.photos;

            // Save document.
            EditionService.saveObject(objectDoc).then(function() {
                $location.path('/main');
            });
        };

        self.delete = function() {
            LocalDocument.remove(objectDoc).then(function() {
                $location.path('/main');
            });
        };


        // Acquire the medias storage path when the device is ready.
        $ionicPlatform.ready(function() {
            mediaPath = self.mediaPath = window.cordova.file.externalDataDirectory + 'medias';
        });


        function waitForLocation(locationPromise) {
            $ionicLoading.show({ template: 'En attente de localisation...' });
            return locationPromise.then(function handleLocation(location) {
                self.geoloc = location.coords;
                $ionicLoading.hide();
            });
        }

        function photoCaptureSuccess(imageURI) {
            window.resolveLocalFileSystemURL(imageURI, function(imageFile) {
                window.resolveLocalFileSystemURL(mediaPath, function(targetDir) {
                    var fileName = objectDoc._id + '_' + uuid4.generate() + '.png';

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
            });
        }

        function photoCaptureError() {
            // TODO → handle error
        }
    });