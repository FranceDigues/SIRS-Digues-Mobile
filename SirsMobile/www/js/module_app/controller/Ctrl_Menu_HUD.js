/**
 * Created by roch dardie on 14/06/15.
 */
angular.module('module_app.controllers.menus.hud', [])

    .controller('cHud', function cHud ($scope, $state,  $log, sContext) {

        var me = this;




        me.logout = function () {
            $log.debug('logout')

            //TODO clear context

            $state.go('signin');
        };

        me.home = function () {
            $state.go('menu.home');
        };

    })
