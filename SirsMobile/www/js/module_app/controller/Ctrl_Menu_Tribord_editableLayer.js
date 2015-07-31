/**
 * Created by roch dardie on 29/06/15.
 */




angular.module('module_app.controllers.menus.tribord.editableLayer', [])

    .controller('cEditableLayer', function cEditableLayer ($scope, $log, sContext,sAppLayer, $state) {

        var me = this;
        me.sContext = sContext;
        me.sAppLayer = sAppLayer;

        me.layerforAddDesordre = null;

        me.drawOnMap = function(){

        }
        me.runWithGps =function(){
            $state.go('forms.desordre');
            //$state.go('newDesordre', {layer:me.layerforAddDesordre});
        }




    })