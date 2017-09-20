angular.module('app.controllers.observation_edit', [])

    .controller('ObservationEditController', function ObservationEditController($scope, $filter, $location, $ionicScrollDelegate,
                                                                                $ionicLoading, $ionicPlatform, $cordovaFile,
                                                                                $routeParams, GeolocationService, LocalDocument,
                                                                                EditionService, objectDoc, uuid4, $rootScope,contactList, urgenceList) {

        var self = this;

        $rootScope.loadingflag = false;

        self.flagLoading = function () {
            $rootScope.loadingflag = true;
        };

        // Navigation
        // -----------

        self.view = 'form';

        self.tab = 'medias';

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

        self.contactList = contactList;

        self.urgenceList = urgenceList;

        // Form
        // ----------

        self.isNewObject = !$routeParams.obsId;

        self.doc = self.isNewObject ? createNewObservation() : angular.copy(getTargetObservation());

        self.save = function() {
            if (self.isNewObject) {

                if(angular.isUndefined(objectDoc.observations)){
                    objectDoc.observations = [];
                }

                // Push the new observation.
                objectDoc.observations.push(self.doc);
            } else {
                // Apply modifications on target observation.
                angular.extend(getTargetObservation(), self.doc);
            }

            // Save document.
            EditionService.saveObject(objectDoc).then(function() {
                $location.path('/main');
            });
        };

        function createNewObservation() {
            return {
                'id': uuid4.generate(),
                '@class': 'fr.sirs.core.model.Observation',
                'date': $filter('date')(new Date(), 'yyyy-MM-dd'),
                'nombreDesordres': 0,
                'urgenceId': "RefUrgence:1",
                'photos': []
            };
        }

        function getTargetObservation() {
            var i = objectDoc.observations.length;
            while (i--) {
                if (objectDoc.observations[i].id === $routeParams.obsId) {
                    return objectDoc.observations[i];
                }
            }
            throw new Error('No observation "' + $routeParams.obsId + '" found in disorder document.')
        }

        // Medias
        // ----------

        self.mediaPath = null;

        self.photos = self.doc.photos;

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

                    // Store the photo in the object document.
                    self.photos.push({
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
    });