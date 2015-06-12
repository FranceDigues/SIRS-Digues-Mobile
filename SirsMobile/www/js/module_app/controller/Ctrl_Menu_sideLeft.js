/**
 * Created by rochDardie on 12/06/15.
 */


//TODO un controlleur par sous vue


/***************************************************************** --------- *****************************************************/
/***************************************************************** SIDE MENU *****************************************************/
/***************************************************************** --------- *****************************************************/
angular.module('module_app.controllers.menus.sideLeft', [])

.controller('cSideLeft', function  cSideLeft ($scope, $state, $ionicSideMenuDelegate, sMapLayer, $log, sEventSuperviseur, $rootScope) { //kifkif un global controler non?

    //$log.debug("sideMenu");
    ////$log.debug(doc.layers);
    //$scope.layers = sMapLayer.list;
    //
    //$rootScope.$on("layersListUpdated", function () {
    //    $log.debug("event layers recus");
    //    $scope.layers = sMapLayer.list;
    //});

    $scope.openMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    }

})
