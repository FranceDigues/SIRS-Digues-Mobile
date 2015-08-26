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
                saveToPhotoAlbum: false
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


              //
              //"observations": [
              //    {
              //        "@class": "fr.sirs.core.model.Observation",
              //        "nombreDesordres": 1,
              //        "designation": "4",
              //        "valid": true,
              //        "observateurId": "dbf7020b90a871e68dd51ba99c001b84",
              //        "photos": [
              //            {
              //                "@class": "fr.sirs.core.model.Photo",
              //                "borne_debut_aval": false,
              //                "borne_debut_distance": 0,
              //                "prDebut": 283.0174,
              //                "borne_fin_aval": false,
              //                "borne_fin_distance": 0,
              //                "prFin": 283.0174,
              //                "valid": true,
              //                "designation": "3",
              //                "longitudeMin": 4.589586845598048,
              //                "longitudeMax": 4.589586845598048,
              //                "latitudeMin": 43.688331794628915,
              //                "latitudeMax": 43.688331794628915,
              //                "chemin": "\\Photos\\2.JPG",
              //                "commentaire": "Passage sur talus",
              //                "orientationPhoto": "RefOrientationPhoto:7",
              //                "coteId": "RefCote:2",
              //                "photographeId": "dbf7020b90a871e68dd51ba99c001b84",
              //                "positionDebut": "POINT (828183.4417727306 6288989.939847441)",
              //                "positionFin": "POINT (828183.4417727306 6288989.939847441)",
              //                "geometry": "LINESTRING (828183.2535037622 6288990, 828183.2535037622 6288990)",
              //                "id": "76e6b9fc-4fe0-467c-b670-bf50ddf66549",
              //                "date": "2006-12-15"
              //            }
              //        ],
              //        "id": "53686a9c-2457-477f-9de6-9b8a6a4d992f",
              //        "date": "2006-12-15"
              //    }
              //]



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

            if(photo != null){
                me.sContext.noteImg=photo;
                $state.go('note');
            }else{
                me.sContext.noteImg=null;
                $state.go('note');
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