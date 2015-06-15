/**
 * Created by roch Dardie on 10/04/15.
 */


//"active": true,

angular.module('module_app.controllers.map', [])
/***************************************************************** --------- *****************************************************/
/*****************************************************************  MAP    *****************************************************/
/***************************************************************** --------- *****************************************************/

//sMap ==> ?
    .controller('cMap', function cMap ($scope, sMapLayer, $log,  olData, sEventSuperviseur, sContext, $rootScope, $cordovaGeolocation,$timeout,$ionicPopover) {

        var me = this;
        //var myMap =null
        //$scope.tt=tt;
        $log.debug(sMapLayer.list);

        //$scope.msk = sMask.doc;
        //$log.debug($scope.msk)

        //$scope.layers= null;
        //$scope.layersStateList= null;


        me.layers = sMapLayer.list;


        me.pluginTest = function(){
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




        me.Ploting = [];
        me.newObs = null;
        //me.sMask = sMask;
        me.limitList = 2;


        $scope.$on("formUpdate", function (data) {
            $log.debug("reception event formUpdate");
            $timeout(function () {
                //me.newObs = sMask.form;
            });
        });

        me.evalAngular = function (string) {
            return me.$eval(string);
        };

        me.publishForm = function () {
            $log.debug(me.newObs.feature);
            $log.debug(me.newObs.param);
            //sMask.writeObsOnDB(me.newObs.param);
        };

        $scope.$on("ObsCreated", function () {
            //publish feature in layer
            //me.newObs.feature.set('ObsUUID', sMask.obsUUID);
            //sMask.doc.GeoJson = me.toGeoJson(featureOverlay);
            $timeout(function () {
                //sMask.writeDocOnDb();
            })
        });

        me.toGeoJson = function (f) {
            return new ol.format.GeoJSON().writeFeatures(f.getFeatures().getArray());
        };



        me.drawType = {active: "Point"};
        me.typeEdition = [
            {label: 'Point', type: "Point"},
            {label: 'Ligne', type: "LineString"},
            {label: 'Polygone', type: "Polygon"}
        ];


        angular.extend(me,
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

            me.currentMap = map;




//INIT du feature de selection
            me.featureOverlaySelected = new ol.FeatureOverlay({
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
                    type: /** @type {ol.geom.GeometryType} */ (me.drawType.active)
                });

                //draw.setActive(false);
                $log.debug(draw.getActive());
                sEventSuperviseur.draw = draw;

                draw.on('drawend', function (f) {
                    //elPropagator
                    me.newObs.feature = f.feature;
                    $rootScope.$broadcast('drawend', f);
                });

                map.addInteraction(draw);
            }



            me.updateType = function (dt) {

                $log.debug("change");
                $log.debug(dt);
                $log.debug(me.drawType.active);

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


        me.publie = function () {
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
        me.plot = function () {

            //zoom quand on plote
            me.centreCarte.zoom = 18;



            //EMULATE MOVE MODE
            var cTemp =  [(me.centreCarte.lat+ixix),(me.centreCarte.lon+(ixix*2))];
            //NORMAL MODE
            //var cTemp =  [me.centreCarte.lat,me.centreCarte.lon];


            $log.debug(cTemp);
            var cTemp1 = ol.proj.transform(cTemp.reverse(),'EPSG:4326', 'EPSG:3857');
            $log.debug(cTemp1);

            me.Ploting.push(cTemp1);
            //ol.proj.transform.(
            //    cTemp,
            //'EPSG:3857','EPSG:4326'));
            ixix++;


            if((me.drawType.active=="Polygon") || (me.drawType.active=="LineString") ){

//FIXME stoque la feature active ou alors avoir un calque special dessin??
                featureOverlay.getFeatures().clear();

                featureOverlay.addFeature(
                    new ol.Feature({
                        geometry: new ol.geom.LineString(
                            me.Ploting
                        )
                    }));

                $log.debug(me.Ploting);
                $log.debug(featureOverlay.getFeatures());

            }
            if(me.drawType.active=="Point"){ me.Clore()}


        };

        //TODO garde Fous
        me.Clore = function () {



            if((me.drawType.active=="Polygon") ){
                featureOverlay.getFeatures().clear();

                featureOverlay.addFeature(
                    new ol.Feature({
                        geometry: new ol.geom.Polygon(ArrayasPolygon(me.Ploting))

                    }));

                ixix = 0;

            }
            if(me.drawType.active=="LineString"){
                //do nothing
                ixix = 0;
            }
            if(me.drawType.active=="Point"){

                featureOverlay.addFeature(
                    new ol.Feature({
                        geometry: new ol.geom.Point(
                            me.Ploting[0]
                        )
                    }));

            }

            //eraseTempVar
            me.Ploting = [];



            //launch edition de formulaire
        };


        //biutifule
        $scope.$on('drawend', function (F) {
            //on pluble quand on enregistre le form
            //me.publie();

        });


        $scope.$on('layersListUpdated', function () {


            //me.updateLayer();

            me.layers = sMapLayer.list;
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



        me.lightInteruptor=function(f){
            fp=f.featurePos;

            $log.debug(featureOverlay.getFeatures().item(fp).OnAir);
            if(featureOverlay.getFeatures().item(fp).get('OnAir')==true){
                me.hideGeom(fp);
                featureOverlay.getFeatures().item(fp).set('OnAir', false);
                f.set('obsStyle', "white");
            }else{

                me.displayGeom(fp);
                featureOverlay.getFeatures().item(fp).set('OnAir', true);
                f.set('obsStyle', "");
            }


        };

//FIXME non multi  calque

        me.displayGeom = function (featureIndex) {
            console.log("enter in displayGeom " + featureIndex);

            //netoyage du calque de selection
            me.featureOverlaySelected.getFeatures().clear();

            var feature = new ol.Feature({
                geometry: featureOverlay.getFeatures().item(featureIndex).getGeometry().clone()
            });
            var col = new ol.Collection();
            col.push(feature);
            me.featureOverlaySelected.setFeatures(col);

            $log.debug(me.currentMap);
            $log.debug(me.featureOverlaySelected);
            me.currentMap.addOverlay(me.featureOverlaySelected);
            console.log("leave in displayGeom" + featureIndex);
        };


        me.hideGeom = function (featureIndex) {
            console.log("enter in hideGeom" + featureIndex);
            //me.currentMap.getOverlays().pop();
            me.featureOverlaySelected.getFeatures().clear();
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
                    me.centreCarte.lat =  Math.round(position.coords.latitude * 1000) / 1000 ;
                    me.centreCarte.lon = Math.round(position.coords.longitude * 1000) / 1000;
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
        //    scope: me
        //}).then(function (popover) {
        //    me.popover = popover;
        //});
        //
        //
        //me.openPopover = function ($event) {
        //    me.popover.show($event);
        //};
        //me.closePopover = function () {
        //    me.popover.hide();
        //};
        ////Cleanup the popover when we're done with it!
        //$scope.$on('$destroy', function () {
        //    me.popover.remove();
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
