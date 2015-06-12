/**
 * Created by roch dardie on 12/06/15.
 */

angular.module('module_app.controllers.menus.tab', [])

.controller('cTabs', function cTabs ($scope, $ionicSideMenuDelegate, sMapLayer, $log) {

    $scope.layers = sMapLayer.list;

    $log.debug(sMapLayer.json);

    $scope.openMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();

    }

})