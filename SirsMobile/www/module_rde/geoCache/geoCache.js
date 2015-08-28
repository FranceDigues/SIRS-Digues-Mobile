/**
 * Created by roch Dardie on 07/05/15.
 */



/**
 * const :
 */
var CACHE_FIRST_IDF = 1000000;





angular.module('module_rde.geoCache', [
    //'data.services.source',
    //'data.services.pipe',
    //'module_rde.data.services.context',
    //'module_rde.data.services.Maplayer',
    //'module_rde.data.services.dbManager',

    'module_rde.data.services',
    'openlayers-directive',
    'ionic',
    'ngCordova',
    'rzModule',
    'pouchdb'
])

    .controller('cGeoCache', function cGeoCache ($scope, sMapLayer, olData, $log, $timeout, sContext, $rootScope,$state) {

        var me = this;
        me.Dt= Date.now();
        me.sContext=sContext;

        me.gotoHome=function(){
            $state.go("home.map")
        }

        me.activeGeom=null;
        me.lastClickCoord=null;
        me.layerToCache = [];
        me.cacheM0 = 0;
        me.freeSpace = 0 ;
        me.enableNewCacheControl=false;

        /***
         * ****/

        //mappage du plugin
        me.CacheMapPlugin = CacheMapPlugin;


        me.var = {CoordList: null};


        me.layers = sMapLayer.list; // maj .?
        me.sMapLayer = sMapLayer; // maj .?


        me.vsCacheBox = null;
        me.lCacheBox = null;

        me.polyOrnotPoly = false;


        //TODO faire un objet cache param.

       me.CacheName = "";
       //me.user = sContext.auth.user;



       me.imageTmp = null;
       me.HL = false; //Mode Hors Ligne
       me.z = {zMin: 8, zMax: 13};
        //$scope.zMax=3;


       me.settings = {
            enableFriends: true
        };

        me.centerMap= {
            lat: 43.5,
                lon: 3.5,
                zoom: 7
        };

        angular.extend($scope,
            {
            //    centreCarte: {
            //        lat: 43.5,
            //        lon: 3.5,
            //        zoom: 7
            //    },

                //layers:  sMapLayer.json,
                defaults: {
                    events: {
                        map: ['singleclick', 'pointermove', 'boxend']
                    }


                },


                mouseposition: {},
                mouseclickposition: {},
                projection: 'EPSG:4326',
                markers: new Array()  //FIXME zoom impossible si marker sur la carte

            });


        olData.getMap("mapCache").then(function (map) {
                $log.debug("Cache Control getMap :")



                var myScaleLine = new ol.control.ScaleLine();
                map.addControl(myScaleLine);

                //layer non angular
               me.vsActiveCache = new ol.source.Vector({
                    //create empty vector
                });

                me.ExistingCacheSource = new ol.source.Vector({
                    //create empty vector
               });



                var styles = [

                    new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: 'rgba(255, 255, 0, 0.6)'
                        }),
                        stroke: new ol.style.Stroke({
                            color: 'blue',
                            width: 2
                        })
                    }),
                    new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: 5,
                            fill: new ol.style.Fill({
                                color: 'orange'
                            })
                        }),
                        geometry: function (feature) {
                            // return the coordinates of the first ring of the polygon
                            var coordinates = feature.getGeometry().getCoordinates()[0];
                            return new ol.geom.MultiPoint(coordinates);
                        }
                    })
                ];

                //creation du calque
                var layerActiveCache = new ol.layer.Vector({
                    source:me.vsActiveCache,
                    style: styles
                });

                var existingCacheLayer = new ol.layer.Vector({
                    source:me.ExistingCacheSource,
                    style: new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: 'rgba(220, 175, 175, 0.6)'
                        }),
                        stroke: new ol.style.Stroke({
                            color: 'red',
                            width: 2
                        })
                    })
                });


                map.addLayer(layerActiveCache);
                map.addLayer(existingCacheLayer);


                //init des zonne de cache
                if (sContext.auth.user.cacheGeom != ""&& sContext.auth.user.cacheGeom != null) {
                    var gjson = new ol.format.GeoJSON();
                    $log.debug(gjson);
                    $log.debug(sContext.auth.user.cacheGeom);
                    var aFeatures = gjson.readFeatures(sContext.auth.user.cacheGeom);
                    $log.debug(aFeatures);

                   me.ExistingCacheSource.addFeatures(aFeatures);
                    //$log.debug($scope.ExistingCacheSource.getFeatures());

                }

                me.escape=function(){
                    me.enableNewCacheControl=false;
                    me.vsActiveCache.clear();
                }
                me.popNewZone=function(){

                    //active view
                    me.enableNewCacheControl=true;

                    //clean active :
                     me.vsActiveCache.clear()


                       var e =  map.getView().calculateExtent(map.getSize());
                       var w= ol.extent.getWidth(e)/3;
                       var h = ol.extent.getHeight(e)/3;
            //geom reduction
                    e[0]=      e[0]+w; //xmin
                    e[1]=      e[1]+h; //ymin
                    e[2]=      e[2]-w; //xmax
                    e[3]=      e[3]-h; //ymax



                    //var g = new ol.geom.Polygon([[ [minX,minY], [maxX,minY], [maxX,maxY], [minX,maxY], [minX,minY]]]);
                    var g = me._polyFromExtent(e);
                    //var g = fromExtent_ol3_7(e);
                    //stock geom
                    me.activeGeom =  new ol.Feature({
                        geometry: g
                    });

                    /* ajout du rectangle*/
                    me.vsActiveCache.addFeature(me.activeGeom );
                }

            //map.on('click', function(event) {
            //    $log.debug( "event");
            //    $log.debug( me.selectEditCorner);
            //    if(me.selectEditCorner===true){
            //        me.editingZone(event.coordinate)
            //    }
            //    //me.lastClickCoord =  event.coordinate;
            //    //$log.debug( me.lastClickCoord);
            //});

            map.getView().on('change:center', function (center){
            //map.on('pointerdrag', function (center){


                    $log.debug( map.getView().getCenter());
                    //$log.debug(center.target.values.center);


                //$log.debug(me.centerMap);
                if(me.editingCacheZone===true && me.targetIndex != null){
                    $log.debug("editing");
                    me._updatePoly( map.getView().getCenter());

                }
            })

            });


        me.editingCacheZone = false;
        me.selectEditCorner = false;
        me.targetIndex=null;
        me.editingZone = function(index){

//get coordinate
           var g = me.activeGeom.getGeometry();

//get index
          me.targetIndex =  index;

            //
            //$log.debug(index)
            //
            //var p = g.getCoordinates();



            var redress = function(index){

                if(index==0){
                    return 2;
                }
                if(index==1){
                    return 3;
                }
                if(index==2){
                    return 0;
                }
                if(index==3){
                    return 1;
                }
            }

            //redress
            var indexRedress = redress(me.targetIndex);

            //reproj
            var x = ol.proj.transform( [g.flatCoordinates[(indexRedress*2)],g.flatCoordinates[((indexRedress*2)+1)]], 'EPSG:3857','EPSG:4326');

            //move to point
            me.centerMap.lat=x[1]
            me.centerMap.lon=x[0]

            //run edit change event
            me.selectEditCorner=false;
            $timeout(function(){
                me.editingCacheZone=true;
            },200)

        }

        //me._getClosestPointByIndex=function(c,arrP){
        //    $log.debug("_getClosestPointByIndex  :");
        //    $log.debug(arrP);
        //    var dists = []
        //    for(var i =0; i<4;i++){
        //        $log.debug(c);
        //        //$log.debug(arrP[i]);
        //        dists.push(  me._calcDist(c,arrP[i]));
        //        $log.debug(dists);
        //    }
        //
        //    $log.debug(    dists.indexOf(Math.max.apply(Math, dists))  );
        //
        //    return dists.indexOf(Math.max.apply(Math, dists));
        //}

        //me._calcDist= function(p1,p2){
        //    //todo gestion axes
        //
        //    return (p2[0]-p1[0])*(p2[0]-p1[0]) + (p2[1]-p1[1])*(p2[1]-p1[1]);
        //}

        me._polyFromExtent=function(e){
            return new ol.geom.Polygon([[ [e[0],e[1]], [ e[2],e[1]], [ e[2],e[3]], [e[0],e[3]], [e[0],e[1]]]]);
        }

        me._addCleanPoly=function(g) {
            me.vsActiveCache.clear();
            me.activeGeom = new ol.Feature({
                geometry: g
            });

            /* ajout du rectangle*/
            me.vsActiveCache.addFeature(me.activeGeom);

            //mise a jour de l'estim
            me._updateEstim();

        }

        me._updateEstim=function(){
            //mise a jour de l'estim
            if(me.activeGeom !== null){

            var size = ol.extent.getSize(me.activeGeom.getGeometry().getExtent());
            $log.debug("size : ");
            $log.debug(size);
            var s = size[0] * size[1];
                $log.debug(s);


            me.cacheM0 = 0;
            for(var i = me.z.zMin ; i <= me.z.zMax; i++){
                $log.debug(ARRAY_DEF_ZOOM_LVL[i].ratio);
                $log.debug(s/ARRAY_DEF_ZOOM_LVL[i].ratio);
                me.cacheM0= me.cacheM0+(s/ARRAY_DEF_ZOOM_LVL[i].ratio);
            }

            me.cacheM0= ((me.cacheM0*0.016)/1024)/1024; //aply mo + ratio factor (0.5)
            }
        }

        me._updatePoly = function(center){ //int 0 -3

            //var updatedGeom
//TODO instersection
            var e= me.activeGeom.getGeometry().getExtent();
            $log.debug(me.targetIndex);
            me._switchCaseMove(me.targetIndex,center,e)

        }

        me._checkExtent = function(e){
            $log.debug(e);
            if(me.targetIndex == 0 ){
                if(e[0]>e[2]){
                    me.targetIndex = 1;
                }else if(e[1]>e[3]){
                    me.targetIndex = 3;
                }else if(e[0]>e[2] && e[1]>e[3]){
                    me.targetIndex = 2;
                }
            }
            else if(me.targetIndex == 1 ){
                if(e[0]>e[2]){
                    me.targetIndex = 0;
                }else if(e[1]>e[3]){
                    me.targetIndex = 2;
                }else if(e[0]>e[2] && e[1]>e[3]){
                    me.targetIndex = 3;
                }
            }
            else if(me.targetIndex == 2 ){
                if(e[0]>e[2]){
                    me.targetIndex = 3;
                }else if(e[1]>e[3]){
                    me.targetIndex = 1;
                }else if(e[0]>e[2] && e[1]>e[3]){
                    me.targetIndex = 0;
                }
            }
            else if(me.targetIndex == 3 ){
                if(e[0]>e[2]){
                    me.targetIndex = 2;
                }else if(e[1]>e[3]){
                    me.targetIndex = 0;
                }else if(e[0]>e[2] && e[1]>e[3]){
                    me.targetIndex = 1;
                }
            }
            return [Math.min(e[0],e[2]),Math.min(e[1],e[3]),Math.max(e[0],e[2]),Math.max(e[1],e[3])];
        }

        me._switchCaseMove = function(indexe,center,e){
            switch (indexe){
                case 0 :
                    $log.debug("case 0")
                    e[3]= center[1];
                    e[2]= center[0];
                    //me._addCleanPoly(me._polyFromExtent( me._checkExtent(e)));
                    break;
                case 1:
                    $log.debug("case 1")
                    e[0]= center[0];
                    e[3]= center[1];
                    //me._addCleanPoly(me._polyFromExtent( me._checkExtent(e)));
                    break;
                case 2:
                    $log.debug("case 2")
                    e[0]= center[0];
                    e[1]= center[1];
                    //me._addCleanPoly(me._polyFromExtent( me._checkExtent(e)));
                    break;
                case 3:
                    $log.debug("case 3")
                    e[2]= center[0];
                    e[1]= center[1];
                    //me._addCleanPoly(me._polyFromExtent( me._checkExtent(e)));
                    break;
            }

            me._addCleanPoly(me._polyFromExtent( me._checkExtent(e)));
        }


       me.cachMe = function () {
            //TODO recup LayerName et OSM automatiquement

           $log.info("cachMe_RUN")

           var layers= me.sMapLayer.list.filter(function(layer){
               if(layer.hasOwnProperty('needToCache')){
                   return layer.needToCache  === true ?true:false;
               }
               else{
                   return false;
               }
           });
           $log.debug(layers);



           //build cache descriptor
           //var caDeList =[{
           //    "nom":"essaiWMS",
           //    "idf":"1000000",
           //    "source":"cstl-demo",
           //    "type":"ImageWMS",
           //    "zMin": me.z.zMin,
           //    "zMax":me.z.zMax,
           //    "url":"http://demo-cstl.geomatys.com/constellation/WS/wms/demoWMS",
           //    "layers":["ZA_EID_Nuisance"],
           //    "bbox":[[42.5,2.5],[44.0,5.0]]
           //}]


           var e =   ol.extent.applyTransform( me.activeGeom.getGeometry().getExtent(),  ol.proj.getTransform('EPSG:3857', 'EPSG:4326'))

           //round
           var i =0;
           while(i < e.length){
              e[i] = e[i].toFixed(2);
               i++
           }

           //envoie de la requette de dl au plugin
///TODO func in olayer pr obtenir le param ocade.
           CacheMapPlugin.updateCache([{
               "name": me.CacheName,
               "idf":1000000+getRandomInt(1,1000),
               "layerSource":layers[0].name,
               "typeSource":layers[0].source.type,
               "zMin": me.z.zMin,
               "zMax":me.z.zMax,
               "urlSource":layers[0].source.url,

               "bbox":[[e[1],e[0]],[e[3],e[2]]]
           }]);


            //affichage de l'emprise
           me.ExistingCacheSource.addFeature(
                new ol.Feature({
                    geometry: me.activeGeom.getGeometry(),

                        "name":me.CacheName,
                        "idf":1000000+getRandomInt(1,1000),
                        "layerSource":layers[0].name,
                        "typeSource":layers[0].source.type,
                        "zMin": me.z.zMin,
                        "zMax":me.z.zMax,
                        "urlSource":layers[0].source.url,

                        "bbox":[[e[1],e[0]],[e[3],e[2]]]

                }));

           //"layers":["ZA_EID_Nuisance"],

            //eregistrement ds l'objet utilisater
            //TODO user dans le context!
            sContext.auth.user.cacheGeom = atoGeoJson(me.ExistingCacheSource);
            //sContext.auth.user.cache.layers.push({nom: cacheName, origine: LayerSourceName});

            $log.debug(sContext.auth.user);
            //TODO stoker la liste des tuile pour controle au chargement

            //$rootScope.$broadcast("userChange"); //mise a jour de l'user dans la base
            sContext.saveUser();
        };


        me.editLayer = function(item){
            //TODO center on item!
            //init
            me.enableNewCacheControl= true;
            me.vsActiveCache.clear();

            //write values
            $log.debug(item)
           var gjson= new ol.format.GeoJSON();

            me.vsActiveCache.addFeatures(gjson.readFeature(item))
            me.z.zMin=item.properties.zMin;
            me.z.zMax=item.properties.zMax;
            me.CacheName=item.properties.name;


            angular.forEach( me.sMapLayer.list, function(layer) {
                    layer.needToCache = item.properties.layerSource === layer.name?true:false;
            });

        }

        me.clearMe = function(caDe){

            CacheMapPlugin.clearOneCache(caDe);

        }

        me.clearall = function(){
            CacheMapPlugin.clearAll();
            sContext.auth.user.cacheGeom=null;
            sContext.saveUser();
            //TODO reload feature on user update event
            me.ExistingCacheSource.clear();
        }


        $scope.$on("slideEnded", function() {
            $timeout( function(){
                me._updateEstim()}, 200
            )

        });


//note invertion du parcours des arbres de tuile??


    })
