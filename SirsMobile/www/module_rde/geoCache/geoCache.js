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

        me.gotoHome=function(){
            $state.go("home.map")
        }

        me.activeGeom=null;


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
       me.user = sContext.auth.user;



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


                //var myZoomSlider = new ol.control.ZoomSlider();
                //map.addControl(myZoomSlider);
                var myScaleLine = new ol.control.ScaleLine();
                map.addControl(myScaleLine);
                //var test = new ol.control.FullScreen();
                //map.addControl(test);


               //me.dragBox = new ol.interaction.DragBoxTouch({
               //     //condition: ol.events.condition.always,
               //     style: new ol.style.Style({
               //         stroke: new ol.style.Stroke({
               //             color: [0, 0, 255, 1]
               //         })
               //     })
               // });
               //
               //
               // map.getInteractions().clear();
               // map.addInteraction(me.dragBox);


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
                if (sContext.auth.user.cg != "") {
                    var gjson = new ol.format.GeoJSON();
                    var aFeatures = gjson.readFeatures(sContext.auth.user.cacheGjson);
                    $log.debug(aFeatures);

                   me.ExistingCacheSource.addFeatures(aFeatures);
                    //$log.debug($scope.ExistingCacheSource.getFeatures());

                }


                me.popNewZone=function(){
                    me.layerActiveCache.clear();

                    //var resolFactor =
                    //pa=me.centerMap.lat -

                       var e =  map.getView().calculateExtent(map.getSize());
                       var w= ol.extent.getWidth(e)/3;
                        var h = ol.extent.getHeight(e)/3;

            //geom reduction
                    e[0]=     e[0]+w;
                    e[1]=     e[1]+h;
                    e[2]=     e[2]-w;
                    e[3]=     e[3]-h;

                    //init geom



                    //(ol.extent.getWidth(extent)/2)/4
                     //= new new ol.geom.Polygon([[[ [,], [,], [,], [,], [,]]]]);
                    var g = ol.geom.Polygon.fromExtent(e);

                    //stock geom
                    me.activeGeom =  new ol.Feature({
                        geometry:me.dragBox.getGeometry()
                    });

                    /* ajout du rectangle*/
                    me.vsActiveCache.addFeature(me.activeGeom );
                }

            });


        //maintien de la zonne a l'ecran dans un calque temporaire
       $scope.$on('openlayers.map.pointermove', function (e, coord) {

           $scope.$apply(function () {

                //recup jeux de coordonnée
                var tGeom =me.dragBox.getGeometry().clone(); // comportement etrange
               me.var.CoordList = tGeom.transform('EPSG:3857', 'EPSG:4326').getCoordinates();
                /* netoyage de la couche */
               me.vsActiveCache.clear();

                /* ajout du rectangle*/
               me.vsActiveCache.addFeature(
                    new ol.Feature({
                        geometry:me.dragBox.getGeometry()

                    }));
            });
        });


       me.cachMe = function () {
            //TODO recup LayerName et OSM automatiquement

           $log.info("cachMe_RUN")

           //build cache descriptor
           var caDeList =[{
               "nom":"essaiWMS",
               "idf":"1000000",
               "source":"cstl-demo",
               "type":"ImageWMS",
               "zMin":"8",
               "zMax":"9",
               "url":"http://demo-cstl.geomatys.com/constellation/WS/wms/demoWMS",
               "layers":["ZA_EID_Nuisance"],
               "bbox":[[42.5,2.5],[44.0,5.0]]
           }]

           //envoie de la requette de dl au plugin
           CacheMapPlugin.updateCache(caDeList);


           //save Cache descriptor dans l'user
            var tmp =me.dragBox.getGeometry().clone();
            $log.debug(tmp)
            //affichage de l'emprise
           me.ExistingCacheSource.addFeature(
                new ol.Feature({
                    geometry: tmp,
                    nom: cacheName,
                    origine: LayerSourceName

                }));




            //eregistrement ds l'objet utilisater
            //TODO user dans le context!
            sContext.auth.user.cacheGeom = atoGeoJson($scope.ExistingCacheSource);
            //sContext.auth.user.cache.layers.push({nom: cacheName, origine: LayerSourceName});

            $log.debug(sContext.auth.user);
            //TODO stoker la liste des tuile pour controle au chargement

            //$rootScope.$broadcast("userChange"); //mise a jour de l'user dans la base
            sContext.saveUser();

        };


        me.clearMe = function(caDe){

            CacheMapPlugin.clearOneCache(caDe);

        }






    })
