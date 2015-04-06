/**
 * Created by roch dardie on 03/04/15.
 */
angular.module('controllers.menus', [])

.controller('TabsCtrl', function($scope, $ionicSideMenuDelegate,sLayer,$log) {

    $scope.layers = sLayer.list;

    $log.debug(sLayer.json);

    $scope.openMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();

    }

})



.controller('HomeTabCtrl', function($scope, $ionicSideMenuDelegate) {

})

.controller('HomeCtrl', function($scope,$state,$cordovaFileOpener2,$log,sContext,sEventSuperviseur) {

    //$scope.visu = function() {
    //    $state.go('menu.tabs.map');
    //};
    //
    //$scope.mask = function() {
    //    $state.go('menu.mask');
    //};



    //miam
    $scope.warpJump = function(nextStar){ //param string
        //$state.go('menu.mask',{'next':nextStar});
        sContext.param.action = nextStar;
        $state.go('menu.mask');
    }





    $scope.form = function() {
        $state.go('formGenerator');
    };

    $scope.openPdf = function(){

        $cordovaFileOpener2.open(
            '/sdcard/Download/cv.pdf',
            'application/pdf'
        ).then(function(res) {
                $log.debug(res)
            }, function(err) {
                $log.debug(err)
            });

    }

        $scope.newCache = function () {

            sEventSuperviseur.event.sideMenu = false;
            $state.go('cache');
        };


})

.controller('SignInCtrl', function($scope, $state, sPouch,sMask,$log,sContext) {
//app.controller('SignInCtrl', function($scope, $state) {

    //var usr = sPouch.usr.allDocs;

    $scope.signIn = function(user) {
        console.log('Sign-In', user);

        //TODO DEMO Comment
        //$state.go('loading');

        //TODO DEMO unComment
        //sPouch.usr.query('name_index', {key: 'mok-sensei'}).then(function(result) {
        sPouch.usr.query('name_index', {key: user.username}).then(function(result) {
            // do something with result
            $log.debug(result);

            $log.debug(result.rows[0].value);
            $log.debug(parseInt( user.password)); //TODO not int only

            if(result.rows[0].value.psw == parseInt( user.password) )   {
                sContext.auth.user= result.rows[0].value;
                $state.go('loading');
            }

        });

    };


    $scope.logout = function() {
        $state.go('signin');
    };

    $scope.home = function() {
        $state.go('menu.home');
    };

})

.controller('SettingsCtrl', function($scope, $state,$log,sEventSuperviseur) {


})