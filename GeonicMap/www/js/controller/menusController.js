/**
 * Created by roch dardie on 03/04/15.
 */
angular.module('controllers.menus', [])

    .controller('TabsCtrl', function ($scope, $ionicSideMenuDelegate, sLayer, $log) {

        $scope.layers = sLayer.list;

        $log.debug(sLayer.json);

        $scope.openMenu = function () {
            $ionicSideMenuDelegate.toggleLeft();

        }

    })


    .controller('HomeTabCtrl', function ($scope, $ionicSideMenuDelegate) {

    })

    .controller('DocCtrl', function ($scope, $ionicSideMenuDelegate, $cordovaMedia, $ionicLoading, $cordovaFileOpener2, $log, $cordovaFileTransfer) {

        //$log.debug(cordova.file.externalDataDirectory)
        //$log.debug(cordova.file.externalRootDirectory)
        //
        ////$scope.play = function (src) {
        //
        //    src = cordova.file.externalDataDirectory + 'doc/' + src;
        //    $log.debug(src);
        //    var media = new Media(src, null, null, mediaStatusCallback);
        //    $log.error($cordovaMedia);
        //    $cordovaMedia.play(media);
        //}
        //
        //var mediaStatusCallback = function (status) {
        //    if (status == 1) {
        //        $ionicLoading.show({template: 'Loading...'});
        //    } else {
        //        $ionicLoading.hide();
        //    }
        //};


        $scope.plugTestUpdateTMS = function(){
            //$log.debug("test");
            CacheMapPlugin.updateCache([{
                "nom":"essai",
                "idf":"1000001",
                "source":"OSM",
                "type":"TMS",
                "zMin":"8",
                "zMax":"11",
                "url":"http://a.tile.openstreetmap.org",
                "bbox":[[43.0,3.0],[44.0,9.0]]
            }]);
        };
        $scope.plugTestUpdateWMS = function(){
            //$log.debug("test");
            CacheMapPlugin.updateCache([{
                "nom":"essaiWMS",
                "idf":"1000000",
                "source":"cstl-demo",
                "type":"ImageWMS",
                "zMin":"8",
                "zMax":"9",
                "url":"http://demo-cstl.geomatys.com/constellation/WS/wms/demoWMS",
                "layers":["ZA_EID_Nuisance"],
                "bbox":[[42.5,2.5],[44.0,5.0]]
            }]);
        };

        $scope.plugTestClearAll = function(){
            CacheMapPlugin.clearAll();
        };

        $scope.plugTestClearOne = function(){
            CacheMapPlugin.clearCaches([{
                "nom":"essaiWMS",
                "idf":"1000000",
                "source":"cstl-demo",
                "type":"ImageWMS",
                "zMin":"8",
                "zMax":"9",
                "url":"http://demo-cstl.geomatys.com/constellation/WS/wms/demoWMS",
                "layers":["ZA_EID_Nuisance"],
                "bbox":[[42.5,2.5],[44.0,5.0]]
            }]);
        };

        $scope.openPdf = function (pdf) {
            //$log.debug(cordova.file.externalDataDirectory + 'doc/cv.pdf');
            $cordovaFileOpener2.open(
                //cordova.file.externalDataDirectory+'doc/cv.pdf',
                //'Removable/MicroSD/Android/data/com.ionic.Map03/files/' + 'doc/cv.pdf',
                'Removable/MicroSD/Android/data/com.ionic.Map03/files/' + pdf,
                'application/pdf'
            ).then(function (res) {
                    $log.debug(res)
                }, function (err) {
                    $log.debug(err)
                });


//essai ecriture
//            $cordovaFileTransfer.download('http://www.vuelaviajes.com/wp-content/2009/03/espejo-salar-uyuni-3.jpg',  cordova.file.externalDataDirectory+'doc/salar.jpg')
//            $cordovaFileTransfer.download('http://www.vuelaviajes.com/wp-content/2009/03/espejo-salar-uyuni-3.jpg', 'Removable/MicroSD/Android/data/com.ionic.Map03/files/' + 'doc/salar.jpg')
//                .then(function (result) {
//                    // Success!
//                    //$log.debug('Dl done : ');
//                    $log.debug(result);
//                    //TODO implementer un retour
//                    //me.nbTileDownloaded++; //declaration de la fin du Dl de la tuile
//                    //$log.debug( me.nbTileDownloaded)
//                }, function (err) {
//                    // Error
//                    $log.debug('Dl fail :');
//                    $log.error(err);
//                }, function (progress) {
//                    //$timeout(function () {
//                    //    //$scope.imageTmp = targetPath;
//                    //    //$log.debug($scope.imageTmp);
//                    //})
//                });

        };


    })

    .controller('HomeCtrl', function ($scope, $state, $log, sContext, sEventSuperviseur) {

        //miam
        $scope.warpJump = function (nextStar) { //param string
            //$state.go('menu.mask',{'next':nextStar});
            sContext.param.action = nextStar;
            $state.go('menu.mask');
        }


        $scope.form = function () {
            $state.go('formGenerator');
        };


        $scope.newCache = function () {

            sEventSuperviseur.event.sideMenu = false;
            $state.go('cache');
        };


        $scope.openDoc = function () {

            //sEventSuperviseur.event.sideMenu = false;
            $state.go('menu.doc');
        };


    })

    .controller('SignInCtrl', function ($scope, $state, sPouch, sMask, $log, sContext) {


        $scope.signIn = function (user) {
            console.log('Sign-In', user);

            //TODO DEMO Comment
            //$state.go('loading');

            //TODO DEMO unComment
            //sPouch.usr.query('name_index', {key: 'mok-sensei'}).then(function(result) {
            sPouch.usr.query('name_index', {key: user.username}).then(function (result) {
                // do something with result
                $log.debug(result);

                $log.debug(result.rows[0].value);
                $log.debug(parseInt(user.password)); //TODO not int only

                if (result.rows[0].value.psw == parseInt(user.password)) {
                    sContext.auth.user = result.rows[0].value;
                    $state.go('loading');
                }

            });

        };


        $scope.logout = function () {
            $state.go('signin');
        };

        $scope.home = function () {
            $state.go('menu.home');
        };

    })

    .controller('SettingsCtrl', function ($scope, $state, $log, sEventSuperviseur) {


    })


/***************************************************************** --------- *****************************************************/
/***************************************************************** ????????? *****************************************************/
/***************************************************************** --------- *****************************************************/

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    })

/***************************************************************** --------- *****************************************************/
/***************************************************************** Masque *****************************************************/
/***************************************************************** --------- *****************************************************/

    .controller('MskCtrl', function ($scope, sPouch, $log, sContext, $state, $rootScope) {

        $log.debug("mskCtrl");
        $log.debug(cMaskId);

        sPouch.cfg.get(cMaskId).then(function (doc) {
            $scope.masks = doc.cat;
            $log.debug($scope.masks);
        }).catch(function (err) {
            $log.debug(err);
        });


        /*
         * if given group is the selected group, deselect it
         * else, select the given group
         */
        $scope.toggleGroup = function (group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function (group) {
            return $scope.shownGroup === group;
        };


        //on se rend sur la carte avec le bon masque en contexte
        $scope.landingOnEarth = function (mskIdf) {

            //mise a jour du contexte
            sContext.param.mskUUID = mskIdf;
            $rootScope.$broadcast("msk_change"); //TODO faire des type d'event specifique pour les notification de contexte
            //de-orbitation
            $state.go('menu.tabs.map');


        }


    })

/***************************************************************** --------- *****************************************************/
/***************************************************************** Form List *****************************************************/
/***************************************************************** --------- *****************************************************/


    .controller('FormListCtrl', ['$scope', '$ionicPopup', '$ionicPopover', '$timeout', 'sPouch', '$log',
        function ($scope, $ionicPopup, $ionicPopover, $timeout, sPouch, $log) {
            $scope.form1 = null;

            sPouch.form.get(cFormTest).then(function (doc) {
                $log.debug("slayer init")
                $log.debug(doc)

                //me.list = doc.layers;
                $scope.form1 = doc.param;
                $log.debug($scope.form1);
                //$log.debug("slayer end")
            }).catch(function (err) {
                $log.debug(err);
            });

            $scope.evalAngular = function (string) {
                return $scope.$eval(string);
            };





            //$scope.showPopup = function () {
            //    // An elaborate, custom popup
            //    var myPopup = $ionicPopup.show({
            //        templateUrl: 'templates/formGenerator.html',
            //        title: 'Form',
            //        //subTitle: 'Please use normal things',
            //        scope: $scope,
            //        buttons: [
            //            {text: 'Cancel'},
            //            {
            //                text: '<b>Ok</b>',
            //                type: 'button-positive',
            //                onTap: function (e) {
            //
            //                }
            //            }
            //        ]
            //    });
            //    myPopup.then(function (res) {
            //        console.log('Tapped!', res);
            //    });
            //    $timeout(function () {
            //        myPopup.close(); //close the popup after 3 seconds for some reason
            //    }, 3000);
            //};


            $ionicPopover.fromTemplateUrl('templates/dynFormPopOver.html', {
                scope: $scope
            }).then(function (popover) {
                $scope.popover = popover;
            });


            $scope.openPopover = function ($event) {
                $scope.popover.show($event);
            };
            $scope.closePopover = function () {
                $scope.popover.hide();
            };
            //Cleanup the popover when we're done with it!
            $scope.$on('$destroy', function () {
                $scope.popover.remove();
            });
            // Execute action on hide popover
            $scope.$on('popover.hidden', function () {
                // Execute action
            });
            // Execute action on remove popover
            $scope.$on('popover.removed', function () {
                // Execute action
            });


        }])

/***************************************************************** --------- *****************************************************/
/***************************************************************** SIDE MENU *****************************************************/
/***************************************************************** --------- *****************************************************/

    .controller('sideMenu', function ($scope, $state, $ionicSideMenuDelegate, sLayer, $log, sEventSuperviseur, $rootScope) { //kifkif un global controler non?


        $log.debug("sideMenu");
        //$log.debug(doc.layers);
        $scope.layers = sLayer.list;

        $rootScope.$on("layersListUpdated", function () {
            $log.debug("event layers recus");
            $scope.layers = sLayer.list;
        });




        $scope.sEventSuperviseur = sEventSuperviseur;

        //$log.debug( $scope.sEventSuperviseur);

        $scope.openMenu = function () {
            $ionicSideMenuDelegate.toggleLeft();
        }

        $scope.newCache = function () {

            sEventSuperviseur.event.sideMenu = false;
            $state.go('cache');
        };


    })

/***************************************************************** --------- *****************************************************/
/***************************************************************** LOADER     *****************************************************/
/***************************************************************** --------- *****************************************************/


    .controller('loader', function ($scope, $state, sPouch, sLayer, $timeout, $log) {

        var n = sLayer.list;
        //var u =  sLayer.usr;
        //var l = sLayer.cfg;
        $log.debug("loader");
        $log.debug(n);
        //$log.debug(u);
        //$log.debug(l);
        $log.debug("/ loader");

        $scope.loadingPercent = 0;


        //Bouchon de vase
        $timeout(function () {
            $scope.loadingPercent = $scope.loadingPercent + 25;

            $timeout(function () {
                $scope.loadingPercent = $scope.loadingPercent + 25;
                $timeout(function () {
                    $scope.loadingPercent = $scope.loadingPercent + 25;
                    $timeout(function () {
                        $scope.loadingPercent = $scope.loadingPercent + 25;
                        $state.go("menu.home");
                    }, 600);
                }, 600);
            }, 600);


        }, 600);


    });