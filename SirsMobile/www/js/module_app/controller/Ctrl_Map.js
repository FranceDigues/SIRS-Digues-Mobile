/**
 * Created by roch Dardie on 10/04/15.
 */


//"active": true,

angular.module('module_app.controllers.map', [])
/***************************************************************** --------- *****************************************************/
/*****************************************************************  MAP    *****************************************************/
/***************************************************************** --------- *****************************************************/


    .controller('cMap', function cMap ($scope, sMapLayer, $log, sMap, olData, sEventSuperviseur, sContext, $rootScope, $cordovaGeolocation,$timeout,$ionicPopover) {

        var me = this;
        //var myMap =null
        //$scope.tt=tt;
        $log.debug(sMapLayer.list);

        //$scope.msk = sMask.doc;
        //$log.debug($scope.msk)

        //$scope.layers= null;
        //$scope.layersStateList= null;


        $scope.layers = sMapLayer.list;


        $scope.pluginTest = function(){
            CacheMapPlugin.CaDeListReQuest();
        }

        //me.updateLayer = function(){
        //
        //
        //    var aRef = [];
        //    for(var i = 0; i < $scope.layers.length; i++) {
        //
        //       var tmpState =  {idf:$scope.layers[i].idf,active:false};
        //
        //            for (var j = 0; j < $scope.layersStateList.length; j++) {
        //
        //                if ($scope.layersStateList[j].idf === $scope.layers[i].idf) {
        //                    tmpState.active = $scope.layersStateList[j].active);
        //                }
        //
        //
        //            }
        //
        //            aRef.push({idf: tmpState.idf.idf, active:tmpState.active});
        //
        //    }
        //
        //    $scope.layersStateList = aRef;
        //
        //};


        //me.updateLayer();



        $scope.mode = sMap.mode;
        $scope.Ploting = [];
        $scope.newObs = null;
        //$scope.sMask = sMask;
        $scope.limitList = 2;


        $scope.$on("formUpdate", function (data) {
            $log.debug("reception event formUpdate");
            $timeout(function () {
                //$scope.newObs = sMask.form;
            });
        });

        $scope.evalAngular = function (string) {
            return $scope.$eval(string);
        };

        $scope.publishForm = function () {
            $log.debug($scope.newObs.feature);
            $log.debug($scope.newObs.param);
            //sMask.writeObsOnDB($scope.newObs.param);
        };

        $scope.$on("ObsCreated", function () {
            //publish feature in layer
            //$scope.newObs.feature.set('ObsUUID', sMask.obsUUID);
            //sMask.doc.GeoJson = $scope.toGeoJson(featureOverlay);
            $timeout(function () {
                //sMask.writeDocOnDb();
            })
        });

        $scope.toGeoJson = function (f) {
            return new ol.format.GeoJSON().writeFeatures(f.getFeatures().getArray());
        };



        $scope.drawType = {active: "Point"};
        $scope.typeEdition = [
            {label: 'Point', type: "Point"},
            {label: 'Ligne', type: "LineString"},
            {label: 'Polygone', type: "Polygon"}
        ];


        angular.extend($scope,
            {
                centreCarte: {
                    lat: 43.5,
                    lon: 3.5,
                    zoom: 8
                    //, style: {
                    //     icon: {
                    //         anchor: [0.5, 1],
                    //         anchorXUnits: 'fraction',
                    //         anchorYUnits: 'fraction',
                    //         opacity: 0.90,
                    //         src: 'img/viseur.png'
                    //     }
                    // }
                },
                //layers:  sMapLayer.json,
                defaults: {
                    events: {
                        //map: [ 'drawend' ]
                    }
                },

                controls: [
                    {name: 'zoom', active: false},
                    {name: 'rotate', active: false},
                    {name: 'attribution', active: false}
                ],

                mouseposition: {},
                mouseclickposition: {},
                projection: 'EPSG:4326',
                markers: []  //FIXME zoom impossible si marker sur la carte

            });


        var featureOverlay = null;
        //var myMap=null;


        //essai d'edition via feature overlay

        olData.getMap("map").then(function (map) {

            $log.debug(map);

            $scope.currentMap = map;




//INIT du feature de selection
            $scope.featureOverlaySelected = new ol.FeatureOverlay({
                style: new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#77cc99',
                        width: 2
                    }),
                    image: new ol.style.Circle({
                        radius: 7,
                        fill: new ol.style.Fill({
                            color: '#77cc99'
                        })
                    })
                })
            });

            featureOverlay = new ol.FeatureOverlay({
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
                //featureOverlay.getFeatures().clear();

                draw = new ol.interaction.Draw({
                    features: featureOverlay.getFeatures(),
                    //type: ol.geom.GeometryType.POLYGON
                    type: /** @type {ol.geom.GeometryType} */ ($scope.drawType.active)
                });

                //draw.setActive(false);
                $log.debug(draw.getActive());
                sEventSuperviseur.draw = draw;

                draw.on('drawend', function (f) {
                    //elPropagator
                    $scope.newObs.feature = f.feature;
                    $rootScope.$broadcast('drawend', f);
                });

                map.addInteraction(draw);
            }



            $scope.updateType = function (dt) {

                $log.debug("change");
                $log.debug(dt);
                $log.debug($scope.drawType.active);

                map.removeInteraction(draw);
                addInteraction();

            };


            addInteraction();
        });


//FIXME pb d'init du mask, resolve?
        /*        //init juste pour test
         var gjson =  new ol.format.GeoJSON(sMask.doc.GeoJson);
         var aFeature = gjson.readFeatures();
         featureOverlay.addFeature(aFeature);

         //end essai de rechargement*/


        $scope.publie = function () {
            $log.debug(featureOverlay.getFeatures());
            $log.debug(toGeoJson(featureOverlay));
            $log.debug(sContext.param);
            //$log.debug(sMask.doc);

            //sMask.doc.GeoJson = toGeoJson(featureOverlay);
            //sMask.writeDocOnDb();
        };


//todo clear avant dessin
        //todo
        var ixix = 0;
        $scope.plot = function () {

            //zoom quand on plote
            $scope.centreCarte.zoom = 18;



            //EMULATE MOVE MODE
            var cTemp =  [($scope.centreCarte.lat+ixix),($scope.centreCarte.lon+(ixix*2))];
            //NORMAL MODE
            //var cTemp =  [$scope.centreCarte.lat,$scope.centreCarte.lon];


            $log.debug(cTemp);
            var cTemp1 = ol.proj.transform(cTemp.reverse(),'EPSG:4326', 'EPSG:3857');
            $log.debug(cTemp1);

            $scope.Ploting.push(cTemp1);
            //ol.proj.transform.(
            //    cTemp,
            //'EPSG:3857','EPSG:4326'));
            ixix++;


            if(($scope.drawType.active=="Polygon") || ($scope.drawType.active=="LineString") ){

//FIXME stoque la feature active ou alors avoir un calque special dessin??
                featureOverlay.getFeatures().clear();

                featureOverlay.addFeature(
                    new ol.Feature({
                        geometry: new ol.geom.LineString(
                            $scope.Ploting
                        )
                    }));

                $log.debug($scope.Ploting);
                $log.debug(featureOverlay.getFeatures());

            }
            if($scope.drawType.active=="Point"){ $scope.Clore()}


        };

        //TODO garde Fous
        $scope.Clore = function () {



            if(($scope.drawType.active=="Polygon") ){
                featureOverlay.getFeatures().clear();

                featureOverlay.addFeature(
                    new ol.Feature({
                        geometry: new ol.geom.Polygon(ArrayasPolygon($scope.Ploting))

                    }));

                ixix = 0;

            }
            if($scope.drawType.active=="LineString"){
                //do nothing
                ixix = 0;
            }
            if($scope.drawType.active=="Point"){

                featureOverlay.addFeature(
                    new ol.Feature({
                        geometry: new ol.geom.Point(
                            $scope.Ploting[0]
                        )
                    }));

            }

            //eraseTempVar
            $scope.Ploting = [];



            //launch edition de formulaire
        };


        //biutifule
        $scope.$on('drawend', function (F) {
            //on pluble quand on enregistre le form
            //$scope.publie();

        });


        $scope.$on('layersListUpdated', function () {


            //me.updateLayer();

            $scope.layers = sMapLayer.list;
        });



        $scope.$on("maskGeoJsonUpdate", function () {
            //$log.debug("event maskGeoJsonUpdate");
            ////$log.debug(sMask.doc.GeoJson);
            //if(featureOverlay != null){
            //    featureOverlay.getFeatures().clear();
            //}
            //
            //
            //if(sMask.doc.GeoJson != "") {
            //    var gjson = new ol.format.GeoJSON();
            //    $log.debug(gjson);
            //    //var currentGeoJson = gjson.readFeatures(sMask.doc.GeoJson);
            //    //angular.forEach(currentGeoJson, function (feature, key) {
            //    //    $log.debug('feature.ObsUUID: ' + feature.get('ObsUUID'));
            //    //    sMask.getObs(key, feature.get('ObsUUID'));
            //    //})
            //    var olcFeatures = new ol.Collection(currentGeoJson);
            //    $log.debug(olcFeatures);
            //    featureOverlay.setFeatures(olcFeatures);
            //    $rootScope.$broadcast('msk_Geom_Updated');
            //}
            //
            //if(featureOverlay != null) {
            //    $log.debug(featureOverlay.getFeatures());
            //}
            //
            ////sMask.searchFormByLayerUUID(sContext.param.mskUUID);
        });



        $scope.lightInteruptor=function(f){
            fp=f.featurePos;

            $log.debug(featureOverlay.getFeatures().item(fp).OnAir);
            if(featureOverlay.getFeatures().item(fp).get('OnAir')==true){
                $scope.hideGeom(fp);
                featureOverlay.getFeatures().item(fp).set('OnAir', false);
                f.set('obsStyle', "white");
            }else{

                $scope.displayGeom(fp);
                featureOverlay.getFeatures().item(fp).set('OnAir', true);
                f.set('obsStyle', "");
            }


        };

//FIXME non multi  calque

        $scope.displayGeom = function (featureIndex) {
            console.log("enter in displayGeom " + featureIndex);

            //netoyage du calque de selection
            $scope.featureOverlaySelected.getFeatures().clear();

            var feature = new ol.Feature({
                geometry: featureOverlay.getFeatures().item(featureIndex).getGeometry().clone()
            });
            var col = new ol.Collection();
            col.push(feature);
            $scope.featureOverlaySelected.setFeatures(col);

            $log.debug($scope.currentMap);
            $log.debug($scope.featureOverlaySelected);
            $scope.currentMap.addOverlay($scope.featureOverlaySelected);
            console.log("leave in displayGeom" + featureIndex);
        };


        $scope.hideGeom = function (featureIndex) {
            console.log("enter in hideGeom" + featureIndex);
            //$scope.currentMap.getOverlays().pop();
            $scope.featureOverlaySelected.getFeatures().clear();
            console.log("leave in hideGeom" + featureIndex);
        };



        //GeoLoc
        var sneakHolow = null;//TODO Service or not service??

        $scope.$on("enableGeoLoc", function () {
            $log.debug("event enableGeoLoc");
            sneakHolow = $cordovaGeolocation.watchPosition({
                maximumAge: 15000,
                timeout: 120000,
                enableHighAccuracy: true
            });
            sneakHolow.then(
                null,
                function (err) {
                    $log.debug(err);
                },
                function (position) {
                    $log.debug(position);
                    $scope.centreCarte.lat =  Math.round(position.coords.latitude * 1000) / 1000 ;
                    $scope.centreCarte.lon = Math.round(position.coords.longitude * 1000) / 1000;
                });

        });

        $scope.$on("disableGeoLoc", function () {
            $log.debug("event disableGeoLoc");
            sneakHolow.clearWatch();

        });







        $rootScope.$on("msk_Geom_Updated", function () {
            $log.debug("event msk geom Updated recive");
            var gjson = new ol.format.GeoJSON();
            $log.debug(gjson);
            //var currentGeoJson = gjson.readFeatures(sMask.doc.GeoJson);
            //angular.forEach(currentGeoJson, function (feature, key) {
            //    $log.debug('feature.ObsUUID: ' + feature.get('ObsUUID'));
            //    sMask.getObs(key, feature.get('ObsUUID'));
            //
            //});
        });

        //POPOVER

        //$ionicPopover.fromTemplateUrl('templates/dynFormPopOver.html', {
        //    scope: $scope
        //}).then(function (popover) {
        //    $scope.popover = popover;
        //});
        //
        //
        //$scope.openPopover = function ($event) {
        //    $scope.popover.show($event);
        //};
        //$scope.closePopover = function () {
        //    $scope.popover.hide();
        //};
        ////Cleanup the popover when we're done with it!
        //$scope.$on('$destroy', function () {
        //    $scope.popover.remove();
        //});
        //// Execute action on hide popover
        //$scope.$on('popover.hidden', function () {
        //    // Execute action
        //});
        //// Execute action on remove popover
        //$scope.$on('popover.removed', function () {
        //    // Execute action
        //});



    });
