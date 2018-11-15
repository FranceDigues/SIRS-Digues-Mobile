angular.module('app.controllers.observation_details', [])

    .controller('ObservationDetailsController', function ObservationDetailsController($ionicPlatform, sContext, $scope, $ionicPopup,
                                                                                      SidePanelService, LocalDocument, $rootScope, AuthService) {

        var self = this;

        self.doc = sContext.selectedObservation;

        self.objectDoc = sContext.selectedObject;

        self.urgencyLabel = null;

        self.mediaPath = null;

        self.objectId = sContext.selectedObject._id;

        self.loaded = {};

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

                                    window.resolveLocalFileSystemURL(self.mediaPath, function (targetDir) {
                                        targetDir.getFile(fileName, {create: true}, function (file) {
                                            file.createWriter(function (fileWriter) {
                                                fileWriter.write(blobImage);
                                                window.setTimeout(function () {
                                                    $scope.$digest();
                                                    self.loaded[photo.id] = true;
                                                }, 100);
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
                    }
                    else {
                        self.loaded[photo.id] = true;
                    }
                },
                success: function () {
                    window.setTimeout(function () {
                        window.setTimeout(function () {
                            self.loaded[photo.id] = true;
                            $scope.$digest();
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
            return AuthService.getValue().role === 'ADMIN' ? true : AuthService.getValue()._id === self.doc.author;
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