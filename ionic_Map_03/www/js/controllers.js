/**
 * Created by Roch Dardie on 15/03/15.
 */


var mm =new Array();

angular.module('controllers', [])

.controller('MapCtrl', function($scope, sLayer,$log,sMap,olData, sEventSuperviseur) {

        //var myMap =null
        $scope.tt=tt;
        $log.debug(sLayer.json);

        $scope.layers = sLayer.list
        $scope.mode = sMap.mode;


        $scope.drawType = {active:"Point"};
        $scope.typeEdition = [
            { label: 'Point', type: "Point" },
            { label: 'Ligne', type: "LineString" },
            { label: 'Polygone', type: "Polygon" }
        ];


        angular.extend($scope,
            {
                centreCarte: {
                    lat: 37.7,
                    lon: -96.67,
                    zoom: 3
                },
                //layers:  sLayer.json,
                defaults:{
                    events: {
                        //map: [ 'drawend' ]
                    }},

                controls: [
                    { name: 'zoom', active: false },
                    { name: 'rotate', active: false },
                    { name: 'attribution', active: false }
                ],

                mouseposition: {},
                mouseclickposition: {},
                projection: 'EPSG:4326',
                markers:new Array()  //FIXME zoom impossible si marker sur la carte

            });







        //essai d'edition via feature overlay

        olData.getMap("map").then(function(map) {

            $log.debug(map);

            //myMap = map;

            var featureOverlay = new ol.FeatureOverlay({
                style: new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#ffcc33',
                        width: 2
                    }),
                    image: new ol.style.Circle({
                        radius: 7,
                        fill: new ol.style.Fill({
                            color: '#ffcc33'
                        })
                    })
                })
            });
            featureOverlay.setMap(map);

            $log.debug(featureOverlay);

            var modify = new ol.interaction.Modify({
                features: featureOverlay.getFeatures(),
                // the SHIFT key must be pressed to delete vertices, so
                // that new vertices can be drawn at the same position
                // of existing vertices
                deleteCondition: function (event) {
                    return ol.events.condition.shiftKeyOnly(event) &&
                        ol.events.condition.singleClick(event);
                }
            });
            map.addInteraction(modify);

            $log.debug(modify);

            var draw; // global so we can remove it later
            function addInteraction() {
                //clear feature
                featureOverlay.getFeatures().clear();

                draw = new ol.interaction.Draw({
                    features: featureOverlay.getFeatures(),
                    //type: ol.geom.GeometryType.POLYGON
                    type: /** @type {ol.geom.GeometryType} */ ($scope.drawType.active)
                });

                //draw.setActive(false);
                $log.debug(draw.getActive());
                sEventSuperviseur.draw = draw;

                map.addInteraction(draw);
            }



            ///************************************ deport gestion des interacton ol3 ************************************/
            ////todo deport direct dans le service?
            ////copy copy copy
            //angular.copy($scope.master)
            //
            //
            //idrawP = new ol.interaction.Draw({
            //    features: featureOverlay.getFeatures(),
            //    //type: ol.geom.GeometryType.POLYGON
            //    type: ol.geom.GeometryType.POINT
            //});
            //$log.debug(idrawP);
            //
            ////idrawL = new ol.interaction.Draw({
            ////    features: featureOverlay.getFeatures(),
            ////    //type: ol.geom.GeometryType.POLYGON
            ////    type: ol.geom.GeometryType.LineString
            ////});
            ////$log.debug(idrawL);
            //
            //idrawA = new ol.interaction.Draw({
            //    features: featureOverlay.getFeatures(),
            //    //type: ol.geom.GeometryType.POLYGON
            //    type: ol.geom.GeometryType.Polygon
            //});
            //$log.debug(idrawA);
            //
            //
            ////desactivation initiale
            ////idrawP
            //idrawL.setActive(false);
            //idrawA.setActive(false);
            //
            ////ajout a la carte
            //map.addInteraction(idrawP);
            //map.addInteraction(idrawL);
            //map.addInteraction(idrawA);
            //
            ////ajout au service
            //sEventSuperviseur.olInteract.draw.point = idrawP;
            //sEventSuperviseur.olInteract.draw.line = idrawL;
            //sEventSuperviseur.olInteract.draw.area= idrawA;
            //
            //
            ///************************************ end ************************************/


            $scope.updateType = function (dt) {

                $log.debug("change");
                $log.debug(dt);
                $log.debug($scope.drawType.active);

                map.removeInteraction(draw);
                addInteraction();

            };


            addInteraction();
        });


        $scope.$on('openlayers.DrawEvent.drawend', function(F) {
            $log.debug(F);

            featureOverlay.getFeatures().clear();
            featureOverlay.addFeature(F);

        });


    })



.controller('CacheCtrl', function($scope,sLayer,sMap,olData,$log) {
        $scope.layers=sLayer.list;
        $scope.mode = sMap.mode;
        $scope.vsCacheBox= null;
        $scope.lCacheBox= null;


          $scope.settings = {
            enableFriends: true
          };




        angular.extend($scope,
            {
                centreCarte: {
                    lat: 37.7,
                    lon: -96.67,
                    zoom: 3
                },

                //layers:  sLayer.json,
                defaults:{
                    events: {
                        map: [ 'singleclick', 'pointermove' ]
                    }
                    ,
                    styles: {
                        marker: {
                            image: new ol.style.Icon({
                                anchor: [0.5, 0.5],
                                anchorXUnits: 'fraction',
                                anchorYUnits: 'fraction',
                                opacity: 0.90,
                                src: 'img/gbb_20x20.png'
                            })
                        }
                    }

                },



                controls: [
                    { name: 'zoom', active: false },
                    { name: 'rotate', active: false },
                    { name: 'attribution', active: false }
                ],

                mouseposition: {},
                mouseclickposition: {},
                projection: 'EPSG:4326',
                markers:new Array()  //FIXME zoom impossible si marker sur la carte

            });




        olData.getMap("mapCache").then(function(map){

                $log.debug("Cache Control getMap :")
/*
                var dragBox = new ol.interaction.DragBox({
                    condition: ol.events.condition.always,
                    style: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: [0, 0, 255, 1]
                        })
                    })
                });


                map.addInteraction(dragBox);*/


                $log.debug(map);
                $log.debug(map.getLayers().getArray());

//brutforce
                //layer non angular
                vsPoly = new ol.source.Vector({
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
                        geometry: function(feature) {
                            // return the coordinates of the first ring of the polygon
                            var coordinates = feature.getGeometry().getCoordinates()[0];
                            return new ol.geom.MultiPoint(coordinates);
                        }
                    })
                ];

                //creation du calque
                lPoly = new ol.layer.Vector({
                    source: vsPoly,
                    style: styles
                });


                map.addLayer(lPoly);
                $log.debug(map.getLayers().getArray());


                $scope.vsCacheBox = vsPoly;
                $scope.lCacheBox = lPoly;

                $log.debug("control");
                $log.debug(vsPoly);
                $log.debug(lPoly);



            }


        );








        $scope.$on('openlayers.map.singleclick', function(e, coord) {
            $scope.$apply(function() {
                if ($scope.projection === coord.projection) {
                    $scope.mouseclickposition = coord;
                } else {
                    var p = ol.proj.transform([coord.lon, coord.lat], coord.projection, $scope.projection);
                    $scope.mouseclickposition = {
                        lat: Math.round(p[1]*1000)/1000,
                        lon: Math.round(p[0]*1000)/1000,
                        projection: $scope.projection
                    }
                }


                $scope.markers.push({
                    name: "t1",
                    lat: $scope.mouseclickposition.lat,
                    lon: $scope.mouseclickposition.lon
                })


                $scope.imageLoadingProgress = 0;


                //layer non angular
                $scope.vsCacheBox.clear();
                var cbox =  new ol.geom.Polygon(asPolygon($scope.markers));
                cbox.transform('EPSG:4326', 'EPSG:3857');


                $scope.vsCacheBox.addFeature(
                    new ol.Feature({
                        geometry: cbox
                    })
                );


            });
        });





})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})


.controller('MskCtrl', function($scope,sPouch,$log) {

    $log.debug("mskCtrl");
    $log.debug(cMaskId);

    sPouch.cfg.get(cMaskId).then(function (doc) {
        $scope.masks = doc.cat;
        $log.debug( $scope.masks);
    }).catch(function (err) {
        $log.debug(err);
    });


    /*
     * if given group is the selected group, deselect it
     * else, select the given group
     */
    $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    };
    $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
    };
});