/**
 * Created by roch dardie on 19/06/15.
 */



angular.module('module_app.controllers.menus.babord.backLayerMgmt', [])

    .controller('cBackLayerMgmt', function cBackLayerMgmt($scope, $state, $log, sContext, sMapLayer, sPouch) {
        var me = this;

        me.sContext = sContext;
        me.sMapLayer = sMapLayer;

        me.typeServeur = [{name:"WMS",type:"ImageWMS"},{name:"TMS",type:"OSM"}]
        me.viewAddSourceForm= false;


        //debug
        //me.newSource = {name:"essai OSM",url:"http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",type:"OSM"};



        me.goToGeoCache = function(){
            $log.debug("goto geoCache")
            $state.go('geoCache')
        }

        me.goToAddSource = function(){
            $log.debug("goto add layer source")
            //todo

            me.viewAddSourceForm= true;
            $log.debug(me.viewAddSourceForm);
        }


        me.updateBaseLayer=function(layerName){

            for(var i=0 ; i< me.sMapLayer.list.length ; i++)

                if( me.sMapLayer.list[i].name === layerName ){
                    me.sMapLayer.list[i].active = true;
                }else{
                    me.sMapLayer.list[i].active = false;
                }
        }



        me.addSource = function(obj){

            me.viewAddSourceForm=false;
            //var source = new oSource()


            sPouch.confDb.get('layersList').then(function (res) {

                $log.debug(res);
                $log.debug(obj);


                var newLayer = new oLayer({idf:res.layers.length+1, active:false, name:obj.name ,isCache:false, opacity:0.6, source:{url:obj.url, type:obj.type}});
                $log.debug(newLayer);

                res.layers.push(newLayer);

                sPouch.confDb.put(res).then(function (response) {
                   $log.debug("layer Added")
                }).catch(function (err) {
                    $log.debug("add layer error")
                });



            }).catch(function (err) {
                //$log.debug(err);
            });



            //var layers = new oLayer({idf:, active:false, name:obj.name ,isCache:false, opacity:0.6, source:{}});

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


