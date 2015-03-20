var mm =new Array();

angular.module('controllers', [])

.controller('MapCtrl', function($scope, sLayer,$log,sMap) {


        $scope.tt=tt;
        $log.debug(sLayer.json);

        $scope.layers = sLayer.list
        $scope.mode = sMap.mode;


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
                    }},

                controls: [
                    { name: 'zoom', active: false },
                    { name: 'rotate', active: false },
                    { name: 'attribution', active: false }
                ],

                mouseposition: {},
                mouseclickposition: {},
                projection: 'EPSG:4326',
                markers:mm  //FIXME zoom impossible si marker sur la carte



            });



    })



.controller('CacheCtrl', function($scope,sLayer,sMap,olData) {
        $scope.layers=sLayer.list;
        $scope.mode = sMap.mode;

          $scope.settings = {
            enableFriends: true
          };



        olData.getMap().then(function(map){

                var dragBox = new ol.interaction.DragBox({
                    condition: ol.events.condition.always,
                    style: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: [0, 0, 255, 1]
                        })
                    })
                });


                map.addInteraction(dragBox);


                $log.debug(map);
                $log.debug(map.getLayers().getArray());
                $log.debug(map.getLayers().getArray()[1].getSource());



                polygone = new ol.geom.Polygon([[[-120.313,33.118],[-109.766,20.281],[-87.617,32.823],[-101.504,51.385],[-121.895,51.385],[-129.453,46.784],[-120.313,33.118]]]);

                polygone.transform('EPSG:4326', 'EPSG:3857');
                var feature = new ol.Feature(polygone);


                map.getLayers().getArray()[1].getSource().addFeature(
                    new ol.Feature({
                        geometry:polygone
                    })
                );
//brutforce
                //layer non angular
                vsPoly = new ol.source.Vector({
                    //create empty vector
                });
                vsPoly.addFeature(feature);

                //creation du calque
                lPoly = new ol.layer.Vector({
                    source: vsPoly,
                    style: new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: 'rgba(255, 255, 255, 0.6)'
                        }),
                        stroke: new ol.style.Stroke({
                            color: '#ffcc33',
                            width: 2
                        })
                    })
                });


                map.addLayer(lPoly);
                $log.debug(map.getLayers().getArray());




            }


        );



})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

});
