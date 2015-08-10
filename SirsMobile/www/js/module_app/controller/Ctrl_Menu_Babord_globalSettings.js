/**
 * Created by roch dardie on 19/06/15.
 */

angular.module('module_app.controllers.menus.babord.globalSettings', [])

    .controller('cGlobalSettings', function cGlobalSettings($scope, $state, $log, sContext, sPouch, sLoc) {
        var me = this;
        me.sContext = sContext;
        me.sPouch = sPouch;
        me.sLoc = sLoc;


        me.goToInit = function(){
            //TODO fenetre de confimation multiple...
            $log.debug("goto init")
            $state.go('init')
        }




    })