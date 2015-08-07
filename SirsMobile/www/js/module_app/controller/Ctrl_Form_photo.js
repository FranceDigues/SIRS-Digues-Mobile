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
    .controller('cPhoto', function cPhoto($scope, $state, $stateParams, $log, sContext, sLoc, $cordovaCapture, Camera) {
        var me = this;
        me.sContext = sContext;
        me.sLoc = sLoc;
        me.layerActif = $stateParams.layer;

        me.newPhotos = [];

        //me.getNewImage = function() {
        //
        //    // $cordovaCapture.captureAudio(options).then(function(audioData) {
        //    $cordovaCapture.captureImage({limit:1}).then(function(imageURI) {
        //        $log.debug("Imagedata recup");
        //        $log.debug(imageURI);
        //        $scope.lastPhoto = imageURI;
        //    }, function(err) {
        //        $log.error(err);
        //        // An error occurred. Show a message to the user
        //    });
        //
        //};

        //todo add file dir
        me.getPhoto = function () {
            Camera.getPicture().then(function (imageURI) {
                console.log(imageURI);
                me.newPhotos.push(imageURI);

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