/**
 * Created by roch dardie on 19/06/15.
 */



angular.module('module_app.controllers.menus.babord.backLayerMgmt', [])

    .controller('cBackLayerMgmt', function cBackLayerMgmt($scope, $state, $log, sContext, sMapLayer) {
        var me = this;

        me.sContext = sContext;
        me.sMapLayer = sMapLayer;

        me.typeServeur = [{name:"WMS",type:"ImageWMS"},{name:"TMS",type:"OSM"}]
        me.addlayer= false;
        me.goToGeoCache = function(){
            $log.debug("goto geoCache")
            $state.go('geoCache')
        }

        me.goToAddLayer = function(){
            $log.debug("goto add layer source")
            //todo

            me.addlayer= true;
        }


        me.updateBaseLayer=function(layerName){

            for(var i=0 ; i< me.sMapLayer.list.length ; i++)

                if( me.sMapLayer.list[i].name === layerName ){
                    me.sMapLayer.list[i].active = true;
                }else{
                    me.sMapLayer.list[i].active = false;
                }
        }



        me.addSource = function(){

            var source = new oSource()
            var layer = new oLayer();

        }


        //{
        //    "idf": 5,
        //    "active": false,
        //    "name": "constelDemo_ZA",
        //    "isCache": false,
        //    "opacity": 0.5,
        //    "source": {
        //    "type": "ImageWMS",
        //        "url": "http://demo-cstl.geomatys.com/constellation/WS/wms/demoWMS",
        //        "params": {
        //        "LAYERS": "ZA_EID_Nuisance"
        //    }
        //}
    })


