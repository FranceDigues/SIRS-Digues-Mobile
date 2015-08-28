/**
 * Created by roch dardie on 06/08/15.
 */



angular.module('module_app.controllers.from.photo', [])
    .factory('Camera', ['$q', function ($q) {
        navigator.camera.enco

        return {
            getPicture: function (options) {
                var q = $q.defer();

                navigator.camera.EncodingType=1;

                navigator.camera.getPicture(function (result) {
                    // Do any magic you need
                    q.resolve(result);
                }, function (err) {
                    q.reject(err);
                }, options);

                return q.promise;
            }
        }
    }])
    .controller('cPhoto', function cPhoto($scope, $state, $stateParams, $log, sContext, sLoc, $cordovaCapture, Camera, $cordovaFile,sPouch) {
        var me = this;
        me.sContext = sContext;
        me.sLoc = sLoc;
        me.layerActif = $stateParams.layer;

        me.newPhotos = [];


        //todo add file dir
        me.getPhoto = function () {
            Camera.getPicture().then(function (imageURI) {
                //var patern = /(.*\/)(.*\.jpg)/
                window.resolveLocalFileSystemURL(imageURI, me._copyFile, me._onCopyFail);
            }, function (err) {
               $log.error(err);
            }, {
                quality: 75,
                targetWidth: 320,
                targetHeight: 320,
                saveToPhotoAlbum: false,
                encodingType:navigator.camera.EncodingType.PNG
            });
        };




       me._copyFile= function(fileEntry) {
            me._tmpSirsPhoto = new oSirsPhoto({author:sContext.auth.user._id,commentaire:""})
                //uuid4.generate() + '.jpg';

            window.resolveLocalFileSystemURL(sContext.photoDir, function(fileSystem2) {
                    fileEntry.copyTo(
                        fileSystem2,
                        me._tmpSirsPhoto.chemin,
                        me._onCopySuccess,
                        me._onCopyFail
                    );
                },
                me._onCopyFail);
        }

      me._onCopySuccess= function () {
          me.newPhotos.push(me._tmpSirsPhoto );  //{selected: false, path: sContext.photoDir, file:  me._tmpSirsPhoto.chemin}

          sPouch.localDb.get(sContext.activeDesordreId).then(function (doc){


              doc.observations.photos.push(me._tmpSirsPhoto);
              $log.debug(doc);
              $log.debug(doc.observations);

              sPouch.localDb.put(doc);

          }).catch(function (err) {
              console.log(err);
          });

          $scope.$digest()
        }

       me._onCopyFail = function fail(error) {
            console.log("fail: " + error.code);
        }




        me.runNotePad = function (photo) {
            $log.debug("PHOTO");
            $log.debug(photo);
            me.sContext.noteImg=null;

            if(photo != null){
                me.sContext.noteImg=photo;
                $state.go('note',{}, {reload: true});
            }else{
                me.sContext.noteImg=null;
                $state.go('note',{}, {reload: true});
            }
            //fixme error with /?
           // $state.go('note',{fond:photo});
            //,{reload: true}
        }


        me.deletePhoto = function (index, filePhoto) {
            $log.debug(index)
            var file = me.newPhotos.splice(index, 1);
            $log.debug(file);
            //todo kill file;
            $cordovaFile.removeFile(sContext.photoDir,filePhoto);
        }
    })