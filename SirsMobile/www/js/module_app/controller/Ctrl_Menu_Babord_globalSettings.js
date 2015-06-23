/**
 * Created by roch dardie on 19/06/15.
 */




angular.module('module_app.controllers.menus.babord.globalSettings', [])

    .controller('cGlobalSettings', function cGlobalSettings($scope, $state, $log, sContext, sPouch) {
        var me = this;
        me.sContext = sContext;
        me.sPouch = sPouch;


        me.goToBaseCtrl = function(){
            //TODO fenetre de confimation multiple...
            $state.go('goToInit')
        }




    })