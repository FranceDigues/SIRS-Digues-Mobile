/**
 * Created by roch dardie on 14/06/15.
 */
angular.module('module_app.controllers.menus.hud', [])

    .controller('cHud', function cHud ($scope, $state,  $log,sMapLayer, sContext,sPouch, $rootScope,$ionicSideMenuDelegate, $timeout) {

        var me = this;
        me.swipeProxy= false;
        me.sContext=sContext;
        me.addButton = true;


        me.logout = function () {
            $log.debug('logout')

            //TODO clear context

            $state.go('signin');
        };

        me.home = function () {
            $state.go('menu.home');
        };


        me.swipeProxy= false;

        //me.switchLock= function(){
        //    $log.debug("swipe");
        //    me.swipeProxy=true;
        //
        //    //FIXME replace by swipe end event?
        //    $timeout(function(){
        //        me.swipeProxy = false;
        //
        //        $log.debug("swipe end : "+me.swipeProxy)
        //    },1000)
        //}

        $log.debug("sideMenu");
        //$log.debug(doc.layers);
        $scope.layers = sMapLayer.list;

        $rootScope.$on("layersListUpdated", function () {
            $log.debug("event layers recus");
            $scope.layers = sMapLayer.list;
        });

        me.toggleLeftMenu = function () {
            $ionicSideMenuDelegate.toggleLeft();
        }

        me.toggleRightMenu = function () {
            $ionicSideMenuDelegate.toggleRight();
            $state.go("home.tAddDesordre");
            me.addButton = !me.addButton;
        }


        //$ionicSideMenuDelegate.$getByHandle('babordHandle').toggleLeft();

    })
