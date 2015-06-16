/**
 * Created by roch dardie on 14/06/15.
 */
angular.module('module_app.controllers.menus.hud', [])

    .controller('cHud', function cHud ($scope, $state,  $log,sMapLayer, sContext, $rootScope,$ionicSideMenuDelegate) {

        var me = this;

        me.logout = function () {
            $log.debug('logout')

            //TODO clear context

            $state.go('signin');
        };

        me.home = function () {
            $state.go('menu.home');
        };




        $log.debug("sideMenu");
        //$log.debug(doc.layers);
        $scope.layers = sMapLayer.list;

        $rootScope.$on("layersListUpdated", function () {
            $log.debug("event layers recus");
            $scope.layers = sMapLayer.list;
        });

        $scope.openLeftMenu = function () {
            $ionicSideMenuDelegate.toggleLeft();
        }

        $scope.openRightMenu = function () {
            $ionicSideMenuDelegate.toggleRight();
        }

    })
