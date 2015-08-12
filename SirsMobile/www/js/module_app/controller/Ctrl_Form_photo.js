/**
 * Created by roch dardie on 06/08/15.
 */



angular.module('module_app.controllers.from.photo', [])
    .factory('Camera', ['$q', function ($q) {

        return {
            getPicture: function (options) {
                var q = $q.defer();

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
    .controller('cPhoto', function cPhoto($scope, $state, $stateParams, $log, sContext, sLoc, $cordovaCapture, Camera, $cordovaFile) {
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
                saveToPhotoAlbum: false
            });
        };




       me._copyFile= function(fileEntry) {
            me.tmpFileImg = sContext.activeDesordreId + "_" + sContext.getLinearIndex() + '.jpg';

            window.resolveLocalFileSystemURL(sContext.photoDir, function(fileSystem2) {
                    fileEntry.copyTo(
                        fileSystem2,
                        me.tmpFileImg,
                        me._onCopySuccess,
                        me._onCopyFail
                    );
                },
                me._onCopyFail);
        }

      me._onCopySuccess= function () {
          me.newPhotos.push({selected: false, path: sContext.photoDir, file:  me.tmpFileImg});
          $scope.$digest()
        }

       me._onCopyFail = function fail(error) {
            console.log("fail: " + error.code);
        }




        me.runNotePad = function () {
            $state.go('note');
        }

        me.deletePhoto = function (index, photo) {
            $log.debug(index)
            var file = me.newPhotos.splice(index, 1);
            $log.debug(file);
            //todo kill file;
            $cordovaFile.removeFile(photo.path);
        }
    })