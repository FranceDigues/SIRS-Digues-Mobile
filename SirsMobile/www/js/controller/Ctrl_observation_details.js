
angular.module('app.controllers.observation_details', [])

    .controller('ObservationDetailsController', function ObservationDetailsController($ionicPlatform, sContext, $scope,$ionicPopup,
                                                                                      SidePanelService, LocalDocument, $rootScope) {

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
            }).then(function(confirmed) {
                if (confirmed) {
                        var i = sContext.selectedObject.observations.length;
                        while (i--) {
                            if (sContext.selectedObject.observations[i].id === self.doc.id) {
                                // Delete the photos of the observation
                                for(var j=0; j<sContext.selectedObject.observations[i].photos.length;j++){
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

        self.loadImage = function (photo) {
            var image_url = self.getPhotoPath(photo);
            $.ajax({url:image_url,type:'HEAD',
                    error:function () {
                        if(self.objectDoc._attachments){
                            var keyAttachment = null;
                            var objAttachment;
                            angular.forEach(Object.keys(self.objectDoc._attachments),function (key) {
                                if(key.indexOf(photo.id) != -1){
                                    keyAttachment = key;
                                }
                            });
                            objAttachment = self.objectDoc._attachments[keyAttachment];
                            if(objAttachment){
                                LocalDocument.getAttachment(self.objectDoc._id, keyAttachment)
                                    .then(function (blob) {
                                        var blobImage = blob;
                                        var fileName = keyAttachment;
                                        window.resolveLocalFileSystemURL(self.mediaPath, function(targetDir) {
                                            targetDir.getFile(fileName, {create:true}, function(file) {
                                                file.createWriter(function(fileWriter) {
                                                    fileWriter.write(blobImage);
                                                    window.setTimeout(function () {
                                                        self.loaded[photo.id] = true;
                                                        $scope.$digest();
                                                    },10);
                                                }, function(){
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
                    success:function () {
                        window.setTimeout(function () {
                            window.setTimeout(function () {
                                self.loaded[photo.id] = true;
                                $scope.$digest();
                            },10);
                        },10);
                    }
                });

        };

        self.getPhotoPath = function(photo) {
            var path = photo.id+photo.chemin.substring(photo.chemin.indexOf('.'));
            var image_url = self.mediaPath +'/'+ path;
            return image_url;
        };

        self.backToDisorderDetails = function() {
            SidePanelService.setTribordView('object_details');
        };

        self.flagLoading = function () {
            $rootScope.loadingflag = true;
        };

        if (self.doc.urgenceId) {
            // Acquire label for urgency identifier.
            LocalDocument.get(self.doc.urgenceId).then(function(result) {
                self.urgencyLabel = result.libelle;
            });
        }

        $ionicPlatform.ready(function() {
            // Acquire the medias storage path when the device is ready.
            self.mediaPath = window.cordova.file.externalDataDirectory + 'medias';
        });
    });