/**
 * Created by roch dardie on 19/06/15.
 */



angular.module('module_app.controllers.menus.babord.backLayerMgmt', [])

    .controller('cBackLayerMgmt', function cBackLayerMgmt($scope, $state, $log, sContext, sMapLayer) {
        var me = this;

        me.sContext = sContext;
        me.sMapLayer = sMapLayer;

        me.goToGeoCache = function(){
            $log.debug("goto geoCache")
            $state.go('geoCache')
        }


        me.updateBaseLayer=function(layerName){

            for(var i=0 ; i< me.sMapLayer.list.length ; i++)

                if( me.sMapLayer.list[i].name === layerName ){
                    me.sMapLayer.list[i].active = true;
                }else{
                    me.sMapLayer.list[i].active = false;
                }
        }
    })


