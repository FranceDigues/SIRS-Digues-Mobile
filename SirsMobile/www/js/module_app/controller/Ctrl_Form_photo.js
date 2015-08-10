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
    .controller('cPhoto', function cPhoto($scope, $state, $stateParams, $log, sContext, sLoc, $cordovaCapture, Camera,$cordovaFile) {
        var me = this;
        me.sContext = sContext;
        me.sLoc = sLoc;
        me.layerActif = $stateParams.layer;

        me.newPhotos = [];

        //todo add file dir
        me.getPhoto = function () {
            Camera.getPicture().then(function (imageURI) {
                console.log(imageURI);

                $log.debug(imageURI)
                var patern = /(.*\/)(.*\.jpg)/

                imageURI


                if(patern.test(imageURI)){
                    //$log.debug(RegExp.$1);

                    $cordovaFile.copyFile(RegExp.$2,  RegExp.$2,  sContext.photoDir, sContext.activeDesordreId+"_"+sContext.getLinearIndex())
                }


                me.newPhotos.push({selected:false,path:imageURI}); //Param Obj.

            }, function (err) {
                console.err(err);
            }, {
                quality: 75,
                targetWidth: 320,
                targetHeight: 320,
                saveToPhotoAlbum: false
            });
        };

        me.runNotePad = function () {
            $state.go('note');
        }

        me.deletePhoto = function (index) {
            $log.debug(index)
            var file = me.newPhotos.splice(index,1);
            $log.debug(file);
            //todo kill file;
        }
    })