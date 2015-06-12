/**
 * Created by roch Dardie on 12/06/15.
 */



angular.module('module_app.controllers.menus.home', [])
//.controller('HomeCtrl', function ($scope, $state, $log, sContext, sEventSuperviseur) {
.controller('cHome', function cHome($scope, $state, $log, sContext, sEventSuperviseur) {


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
