
angular.module('app.controllers.observation_details', [])

    .controller('ObservationDetailsController', function ObservationDetailsController($ionicPlatform, sContext, $scope,
                                                                                      SidePanelService, LocalDocument, $rootScope) {

        var self = this;

        self.doc = sContext.selectedObservation;

        self.urgencyLabel = null;

        self.mediaPath = null;

        self.objectId = sContext.selectedObject._id;

        self.loaded = {};

        b64toBlob = function (b64Data, contentType, sliceSize) {
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
            $.ajax({url:image_url,type:'HEAD',
                    error:function () {
                        if(self.doc._attachments && self.doc._attachments[photo.id] && self.doc._attachments[photo.id].data){
                            var fileName = photo.id+'.png';
                            var blobImage = b64toBlob(self.doc._attachments[photo.id].data,'image/png');

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
                        } else {
                            console.log("no attachment exit to load image");
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
            var path = photo.chemin.replace(/\\/g, '/');
            if (path.charAt(0) !== '/') {
                path = '/' + path;
            }

            var image_url = self.mediaPath + path;

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