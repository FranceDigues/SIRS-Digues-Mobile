/**
 * Created by roch dardie on 12/06/15.
 */


/***************************************************************** --------- *****************************************************/
/***************************************************************** LOADER     *****************************************************/
/***************************************************************** --------- *****************************************************/

angular.module('module_app.controllers.loader', [])
.controller('cLoader', function cLoader ($scope, $state, sPouch, sMapLayer, $timeout, $log) {

    //var n = sMapLayer.list;
    //var u =  sMapLayer.usr;
    //var l = sMapLayer.cfg;
    $log.debug("loader");
    //$logitg.debug(n);
    ////$log.debug(u);
    ////$log.debug(l);
    //$log.debug("/ loader");

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
                    $state.go("home.map");
                }, 600);
            }, 600);
        }, 600);


    }, 600);


});