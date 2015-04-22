/**
 * Created by roch Dardie on 10/04/15.
 */


angular.module('controllers.mapCache', [])

/***************************************************************** --------- *****************************************************/
/***************************************************************** CACHE     *****************************************************/
/***************************************************************** --------- *****************************************************/


    .controller('CacheCtrl', function ($scope, sLayer, sMap, olData, $log, $timeout, sCacheMap, sContext, $rootScope) {
        $scope.var = {CoordList: null};


        $scope.layers = sLayer.list;
        $scope.mode = sMap.mode;
        $scope.vsCacheBox = null;
        $scope.lCacheBox = null;

        $scope.polyOrnotPoly = false;


        //TODO faire un objet cache param.

        $scope.CacheName = "";
        $scope.user = sContext.auth.user;


        //todo faire le trie :
        $scope.nbTileDownloaded = sCacheMap.nbTileDownloaded;
        $scope.nbTile = sCacheMap.nbTile;
        $scope.imageTmp = null;
        $scope.HL = false; //Mode Hors Ligne
        $scope.z = {zMin: 8, zMax: 13};
        //$scope.zMax=3;


        $scope.settings = {
            enableFriends: true
        };


        angular.extend($scope,
            {
                centreCarte: {
                    lat: 43.5,
                    lon: 3.5,
                    zoom: 7
                },

                //layers:  sLayer.json,
                defaults: {
                    events: {
                        map: ['singleclick', 'pointermove', 'boxend']
                    },
                    iinteractions: {
                        mouseWheelZoom: false,
                        doubleClickZoom: false,
                        keyboardPan: false,
                        dragPan: false
                    }

                },


                mouseposition: {},
                mouseclickposition: {},
                projection: 'EPSG:4326',
                markers: new Array()  //FIXME zoom impossible si marker sur la carte

            });


        olData.getMap("mapCache").then(function (map) {
                $log.debug("Cache Control getMap :")


                var myZoomSlider = new ol.control.ZoomSlider();
                map.addControl(myZoomSlider);
                var myScaleLine = new ol.control.ScaleLine();
                map.addControl(myScaleLine);
                var test = new ol.control.FullScreen();
                map.addControl(test);


                $scope.dragBox = new ol.interaction.DragBoxTouch({
                    //condition: ol.events.condition.always,
                    style: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: [0, 0, 255, 1]
                        })
                    })
                });


                map.getInteractions().clear();
                map.addInteraction($scope.dragBox);


                //layer non angular
                $scope.vsPoly = new ol.source.Vector({
                    //create empty vector
                });
                $scope.ExistingCacheSource = new ol.source.Vector({
                    //create empty vector
                });
                //vsPoly.addFeature(feature);


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
                var lPoly = new ol.layer.Vector({
                    source: $scope.vsPoly,
                    style: styles
                });

                var existingCacheLayer = new ol.layer.Vector({
                    source: $scope.ExistingCacheSource,
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


                map.addLayer(lPoly);
                map.addLayer(existingCacheLayer);


                //init
                if (sContext.auth.user.cacheGeom != "") {
                    var gjson = new ol.format.GeoJSON();
                    var aFeatures = gjson.readFeatures(sContext.auth.user.cacheGeom);
                    $log.debug(aFeatures);

                    $scope.ExistingCacheSource.addFeatures(aFeatures);
                    $log.debug($scope.ExistingCacheSource.getFeatures());

                }
                ;


            }
        );


        //maintien de la zonne a l'ecran dans un calque temporaire
        $scope.$on('openlayers.map.pointermove', function (e, coord) {

            $scope.$apply(function () {

                //recup jeux de coordonnée
                var tGeom = $scope.dragBox.getGeometry().clone(); // comportement etrange
                $scope.var.CoordList = tGeom.transform('EPSG:3857', 'EPSG:4326').getCoordinates();
                /* netoyage de la couche */
                $scope.vsPoly.clear();

                /* ajout du rectangle*/
                $scope.vsPoly.addFeature(
                    new ol.Feature({
                        geometry: $scope.dragBox.getGeometry()

                    }));
            });
        });


        $scope.cachMe = function () {
            //TODO recup LayerName et OSM automatiquement
            //var cacheName = $scope.CacheName;
            var cacheName = "essai";
            var LayerSourceName = "OSM";

            $log.debug($scope.var.CoordList);
            //sCacheMap.cache("http://a.tile.openstreetmap.org/", $scope.var.CoordList, $scope.CacheName, LayerSourceName, $scope.z.zMin, $scope.z.zMax);
            sCacheMap.cache("http://a.tile.openstreetmap.org/", $scope.var.CoordList, cacheName, LayerSourceName, $scope.z.zMin, $scope.z.zMax);


            var tmp = $scope.dragBox.getGeometry().clone();
            $log.debug(tmp)
            //affichage de l'emprise
            $scope.ExistingCacheSource.addFeature(
                new ol.Feature({
                    geometry: tmp,
                    nom: cacheName,
                    origine: LayerSourceName

                }));

            $log.debug($scope.ExistingCacheSource.getFeatures());


            //eregistrement ds l'objet utilisater
            //TODO user dans le context!
            sContext.auth.user.cacheGeom = atoGeoJson($scope.ExistingCacheSource);
            sContext.auth.user.cache.layers.push({nom: cacheName, origine: LayerSourceName});

            $log.debug(sContext.auth.user);
            //TODO stoker la liste des tuile pour controle au chargement

            //$rootScope.$broadcast("userChange"); //mise a jour de l'user dans la base
            sContext.saveUser();

        };


    })