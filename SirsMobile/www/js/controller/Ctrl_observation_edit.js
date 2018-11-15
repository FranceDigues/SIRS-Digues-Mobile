angular.module('app.controllers.observation_edit', [])

    .controller('ObservationEditController', function ObservationEditController($scope, $filter, $location, $ionicScrollDelegate,
                                                                                $ionicLoading, $ionicPlatform, $cordovaFile,
                                                                                $routeParams, GeolocationService, LocalDocument,
                                                                                EditionService, objectDoc, uuid4, $rootScope, contactList,
                                                                                urgenceList, orientationsList, cotesList, AuthService) {

        var self = this;

        $rootScope.loadingflag = false;

        self.isNewObject = !$routeParams.obsId;

        self.doc = self.isNewObject ? createNewObservation() : angular.copy(getTargetObservation());

        var author = AuthService.getValue();

        self.doc.author = author._id;

        self.flagLoading = function () {
            $rootScope.loadingflag = true;
        };

        self.objectDoc = objectDoc;

        // Navigation
        // -----------

        self.view = 'form';

        self.tab = 'medias';

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

        self.contactList = contactList;

        self.urgenceList = urgenceList.map(function (item) {
            item.value.id = parseInt(item.value.id.substring(item.value.id.lastIndexOf(":") + 1), 10);
            return item.value;
        });

        self.urgence = parseInt(self.doc.urgenceId.substring(self.doc.urgenceId.lastIndexOf(":") + 1), 10);

        self.changeUrgence = function () {
            self.doc.urgenceId = "RefUrgence:" + self.urgence;
        };

        self.changeContact = function () {
            self.doc.observateurId = self.contact;
        };

        self.contact = self.doc.observateurId;

        //@hb
        self.orientations = orientationsList;
        //@hb
        self.cotes = cotesList;

        self.save = function () {
            if (self.isNewObject) {
                if (angular.isUndefined(objectDoc.observations)) {
                    objectDoc.observations = [];
                }

                // Push the new observation.
                objectDoc.observations.push(self.doc);
            } else {
                // Apply modifications on target observation.
                angular.extend(getTargetObservation(), self.doc);
            }
            // Save document.
            EditionService.saveObject(objectDoc).then(function () {
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
                'photos': [],
                'valid': false
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

                    // Store the photo in the object document.
                    self.photos.push({
                        'id': photoId,
                        '@class': 'fr.sirs.core.model.Photo',
                        'date': $filter('date')(new Date(), 'yyyy-MM-dd'),
                        'chemin': '/' + fileName,
                        'valid': false
                    });

                    var xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        var reader = new FileReader();
                        reader.onloadend = function () {
                            // Save the photo like attachment to the object
                            self.objectDoc._attachments[photoId] = {
                                content_type: 'image/jpeg',
                                data: reader.result.replace('data:image/jpeg;base64,', '')
                            };
                        };

                        reader.readAsDataURL(xhr.response);
                    };
                    xhr.open('GET', self.getPhotoPath(self.photos[self.photos.length - 1]));
                    xhr.responseType = 'blob';
                    xhr.send();

                    // Force digest.
                    $scope.$digest();
                });
            });
        }

        //@hb get the value of Orientation & Côté from the Data Base
        self.goToMedia = function () {
            self.setView('media');
        };

        $ionicPlatform.ready(function () {
            // Acquire the medias storage path when the device is ready.
            self.mediaPath = window.cordova.file.externalDataDirectory + 'medias';
        });
    })
    .controller('MediaObservationController', function ($window, SirsDoc, $ionicLoading, GeolocationService,
                                                        uuid4, $ionicPlatform, $scope, AuthService, $filter, $cordovaToast) {
        var self = this;

        var dataProjection = SirsDoc.get().epsgCode;

        self.orientations = $scope.c.orientations;

        self.cotes = $scope.c.cotes;

        self.back = function () {
            $scope.c.setView('form');
        };

        self.save = function () {
            $scope.c.doc.photos.push(self.mediaOptions);
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                var reader = new FileReader();
                reader.onloadend = function () {
                    if (angular.isUndefined($scope.c.objectDoc._attachments)) {
                        $scope.c.objectDoc._attachments = {};
                    }
                    // Save the photo like attachment to the object
                    $scope.c.objectDoc._attachments[self.mediaOptions.id] = {
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
            var path = photo.id + photo.chemin.substring(photo.chemin.indexOf('.')).toLowerCase();
            var image_url = self.mediaPath + '/' + path;
            return image_url;
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
    })
    .directive('pointsHandler', function () {
        return {
            restrict: 'A',
            priority: 100,
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                if (ngModel) {
                    ngModel.$parsers.push(function (value) {
                        return "RefUrgence:" + value;
                    });

                    ngModel.$formatters.push(function (value) {
                        return value.substring(value.lastIndexOf(":") + 1);
                    });
                }
            }
        };
    });