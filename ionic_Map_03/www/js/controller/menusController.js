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