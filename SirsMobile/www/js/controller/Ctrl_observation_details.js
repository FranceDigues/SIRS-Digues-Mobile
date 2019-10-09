angular.module('app.controllers.observation_details', [])

    .controller('ObservationDetailsController', function ObservationDetailsController($ionicPlatform, sContext, $scope, MapManager,
                                                                                      $ionicPopup, uuid4, $filter, EditionService,
                                                                                      SidePanelService, LocalDocument, $rootScope, AuthService, $cordovaToast) {

        var self = this;

        self.doc = sContext.selectedObservation;

        self.objectDoc = sContext.selectedObject;

        self.showContent = true;

        if (!self.doc.photos) {
            self.doc.photos = [];
        }

        self.photos = self.doc.photos;

        self.urgencyLabel = null;

        self.mediaPath = null;

        self.objectId = sContext.selectedObject._id;

        self.loaded = {};

        function calculateImageSize(base64String) {
            var padding, inBytes, base64StringLength;
            if (base64String.endsWith("==")) padding = 2;
            else if (base64String.endsWith("=")) padding = 1;
            else padding = 0;

            base64StringLength = base64String.length;
            inBytes = (base64StringLength / 4) * 3 - padding;
            return inBytes;
        }

        function getTargetObservation() {
            var i = self.objectDoc.observations.length;
            while (i--) {
                if (self.objectDoc.observations[i].id === self.doc.id) {
                    return self.objectDoc.observations[i];
                }
            }
            throw new Error('No observation "' + self.doc.id + '" found in disorder document.')
        }

        self.addPhotoFromAlbum = function () {
            navigator.camera.getPicture(function (imageData) {
                if (calculateImageSize(imageData) > 1048576) {
                    $cordovaToast
                        .showLongTop("Veuillez choisir une photo de taille inférieure à 1,2 Mo");
                    return;
                }

                var photoId = uuid4.generate(),
                    fileName = photoId + '.jpg';

                self.photos.push({
                    'id': photoId,
                    '@class': 'fr.sirs.core.model.Photo',
                    'date': $filter('date')(new Date(), 'yyyy-MM-dd'),
                    'chemin': '/' + fileName,
                    'valid': false
                });

                if (!self.objectDoc._attachments) {
                    self.objectDoc._attachments = {};
                }

                self.objectDoc._attachments[photoId] = {
                    content_type: 'image/jpeg',
                    data: imageData.replace('data:image/jpeg;base64,', '')
                };

                angular.extend(getTargetObservation(), self.doc);

                self.objectDoc.valid = false;
                self.objectDoc.editMode = true;

                EditionService.saveObject(self.objectDoc)
                    .then(function () {
                        MapManager.syncAllAppLayer();
                    });
            }, function (error) {
                console.log(error);
            }, {
                quality: 50,
                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                destinationType: navigator.camera.DestinationType.DATA_URL,
                encodingType: navigator.camera.EncodingType.JPEG
            });

        };

        // @hb remove observation
        self.remove = function () {
            return $ionicPopup.confirm({
                title: 'Suppression d\'une observation',
                template: 'Voulez vous vraiment supprimer cette observation ?'
            }).then(function (confirmed) {
                if (confirmed) {
                    var i = sContext.selectedObject.observations.length;
                    while (i--) {
                        if (sContext.selectedObject.observations[i].id === self.doc.id) {
                            // Delete the photos of the observation
                            for (var j = 0; j < sContext.selectedObject.observations[i].photos.length; j++) {
                                delete sContext.selectedObject._attachments[sContext.selectedObject.observations[i].photos[j].id];
                            }

                            sContext.selectedObject.observations.splice(i, 1);
                            break;
                        }
                    }
                    LocalDocument.save(sContext.selectedObject).then(function () {
                        // Return to the selection list view.
                        self.backToDisorderDetails();
                    });
                }
                return confirmed;
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

        self.loadImage = function (photo) {
            var image_url = self.getPhotoPath(photo);
            $.ajax({
                url: image_url, type: 'HEAD',
                error: function () {
                    if (self.objectDoc._attachments) {
                        var keyAttachment = null;
                        var objAttachment;
                        angular.forEach(Object.keys(self.objectDoc._attachments), function (key) {
                            if (key.indexOf(photo.id) != -1) {
                                keyAttachment = key;
                            }
                        });
                        objAttachment = self.objectDoc._attachments[keyAttachment];
                        if (objAttachment) {
                            LocalDocument.getAttachment(self.objectDoc._id, keyAttachment)
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

                                    self.showContent = false;
                                    window.resolveLocalFileSystemURL(self.mediaPath, function (targetDir) {
                                        targetDir.getFile(fileName, {create: true}, function (file) {
                                            file.createWriter(function (fileWriter) {
                                                fileWriter.write(blobImage);
                                                window.setTimeout(function () {
                                                    self.loaded[photo.id] = true;
                                                    $scope.$apply();
                                                }, 100);

                                                setTimeout(function () {
                                                    self.showContent = true;
                                                    $scope.$apply();
                                                }, 500);
                                            }, function () {
                                                console.log('cannot write the data to the file');
                                                self.loaded[photo.id] = true;
                                            });
                                        });
                                    });
                                });
                        } else {
                            self.loaded[photo.id] = true;
                            console.log("no attachment exit to load image");
                        }
                    } else {
                        self.loaded[photo.id] = true;
                    }
                },
                success: function () {
                    window.setTimeout(function () {
                        window.setTimeout(function () {
                            self.loaded[photo.id] = true;
                            $scope.$apply();
                        }, 10);
                    }, 10);
                }
            });

        };

        self.getPhotoPath = function (photo) {
            var path = photo.id + '.' + photo.chemin.substring(photo.chemin.indexOf('.') + 1).toLowerCase();
            var image_url = self.mediaPath + '/' + path;
            return image_url;
        };

        self.backToDisorderDetails = function () {
            SidePanelService.setTribordView('object_details');
        };

        self.flagLoading = function () {
            $rootScope.loadingflag = true;
        };

        self.canShowEditionButtons = function () {
            if (AuthService.getValue().role === 'USER' || AuthService.getValue().role === 'ADMIN') {
                return true;
            }
            if (AuthService.getValue().role === 'GUEST') {
                return false;
            }
            if (AuthService.getValue().role === 'EXTERN') {
                return self.doc.author && AuthService.getValue()._id === self.doc.author;
            }
        };

        if (self.doc.urgenceId) {
            // Acquire label for urgency identifier.
            LocalDocument.get(self.doc.urgenceId).then(function (result) {
                self.urgencyLabel = result.libelle;
            });
        }

        $ionicPlatform.ready(function () {
            // Acquire the medias storage path when the device is ready.
            self.mediaPath = window.cordova.file.externalDataDirectory + 'medias';
        });
    });
