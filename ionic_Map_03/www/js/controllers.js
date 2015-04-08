/**
 * Created by Roch Dardie on 15/03/15.
 */


var mm = new Array();

angular.module('controllers', [])

/***************************************************************** --------- *****************************************************/
/*****************************************************************  MAP    *****************************************************/
/***************************************************************** --------- *****************************************************/


    .controller('MapCtrl', function ($scope, sLayer, $log, sMap, olData, sEventSuperviseur, sMask, sContext, $rootScope, $cordovaGeolocation,$timeout) {

        var me = this;
        //var myMap =null
        //$scope.tt=tt;
        $log.debug(sLayer.list);

        //$scope.msk = sMask.doc;
        //$log.debug($scope.msk)

        $scope.layers = sLayer.list;
        $scope.mode = sMap.mode;
        $scope.Ploting = [];
        $scope.newObs = null;
        $scope.sMask = sMask;



        $scope.$on("formUpdate", function (data) {
            $log.debug("reception event formUpdate")
            $timeout(function () {
                me.newObs = sMask.form;
            });
        });

        $scope.evalAngular = function (string) {
            return $scope.$eval(string);
        };

        $scope.publishForm = function () {
            $log.debug($scope.newObs.feature);
            sMask.writeObsOnDB($scope.newObs.param);
        };

        $scope.$on("ObsCreated", function () {
            //publish feature in layer
            self.newObs.feature.set('ObsUUID', sMask.obsUUID);
            sMask.doc.GeoJson = $scope.toGeoJson(featureOverlay);
            $timeout(function () {
                sMask.writeDocOnDb();
            })
        });

        $scope.toGeoJson = function (f) {
            return new ol.format.GeoJSON().writeFeatures(f.getFeatures().getArray());
        }



        $scope.drawType = {active: "Point"};
        $scope.typeEdition = [
            {label: 'Point', type: "Point"},
            {label: 'Ligne', type: "LineString"},
            {label: 'Polygone', type: "Polygon"}
        ];


        angular.extend($scope,
            {
                centreCarte: {
                    lat: 37.7,
                    lon: -96.67,
                    zoom: 3
                },
                //layers:  sLayer.json,
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
                markers: new Array()  //FIXME zoom impossible si marker sur la carte

            });


        var featureOverlay = null;
        //var myMap=null;


        //essai d'edition via feature overlay

        olData.getMap("map").then(function (map) {

            $log.debug(map);

            $scope.currentMap = map;

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
                    me.newObs.feature = f.feature
                    $rootScope.$broadcast('drawend', f);
                })

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
            $log.debug(sMask.doc);

            sMask.doc.GeoJson = toGeoJson(featureOverlay);
            sMask.writeDocOnDb();
        }


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

            };
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



        $scope.$on("maskGeoJsonUpdate", function () {
            $log.debug("event maskGeoJsonUpdate");
            $log.debug(sMask.doc.GeoJson);
            var gjson = new ol.format.GeoJSON();
            $log.debug(gjson);
            var currentGeoJson = gjson.readFeatures(sMask.doc.GeoJson);
            angular.forEach(currentGeoJson, function (feature, key) {
                    $log.debug('feature.ObsUUID: ' + feature.get('ObsUUID'));
                    sMask.getObs(key, feature.get('ObsUUID'));
                })
            var olcFeatures = new ol.Collection(currentGeoJson);
            $log.debug(olcFeatures);
            featureOverlay.setFeatures(olcFeatures);
            $log.debug(featureOverlay.getFeatures());
            sMask.searchFormByLayerUUID(sContext.param.mskUUID);
        });



$scope.lightInteruptor=function(f){
    $scope(f.OnAir);
    if(f.OnAir==true){
        $scope.hideGeom(f);
        f.OnAir=false;
    }else{

        $scope.displayGeom(f);
        f.OnAir=true;
    }


};



        $scope.displayGeom = function (featureIndex) {
            console.log("enter in displayGeom " + featureIndex);
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
            $scope.currentMap.getOverlays().pop();
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


    })

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

/***************************************************************** --------- *****************************************************/
/***************************************************************** ????????? *****************************************************/
/***************************************************************** --------- *****************************************************/

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    })

/***************************************************************** --------- *****************************************************/
/***************************************************************** Masque *****************************************************/
/***************************************************************** --------- *****************************************************/

    .controller('MskCtrl', function ($scope, sPouch, $log, sContext, $state, $rootScope) {

        $log.debug("mskCtrl");
        $log.debug(cMaskId);

        sPouch.cfg.get(cMaskId).then(function (doc) {
            $scope.masks = doc.cat;
            $log.debug($scope.masks);
        }).catch(function (err) {
            $log.debug(err);
        });


        /*
         * if given group is the selected group, deselect it
         * else, select the given group
         */
        $scope.toggleGroup = function (group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function (group) {
            return $scope.shownGroup === group;
        };


        //on se rend sur la carte avec le bon masque en contexte
        $scope.landingOnEarth = function (mskIdf) {

            //mise a jour du contexte
            sContext.param.mskUUID = mskIdf;
            $rootScope.$broadcast("msk_change"); //TODO faire des type d'event specifique pour les notification de contexte
            //de-orbitation
            $state.go('menu.tabs.map');


        }


    })

/***************************************************************** --------- *****************************************************/
/***************************************************************** Form List *****************************************************/
/***************************************************************** --------- *****************************************************/


    .controller('FormListCtrl', ['$scope', '$ionicPopup', '$ionicPopover', '$timeout', 'sPouch', '$log',
        function ($scope, $ionicPopup, $ionicPopover, $timeout, sPouch, $log) {
            $scope.form1 = null;

            sPouch.form.get(cFormTest).then(function (doc) {
                $log.debug("slayer init")
                $log.debug(doc)

                //me.list = doc.layers;
                $scope.form1 = doc.param;
                $log.debug($scope.form1);
                //$log.debug("slayer end")
            }).catch(function (err) {
                $log.debug(err);
            });

            $scope.evalAngular = function (string) {
                return $scope.$eval(string);
            };


            $scope.showPopup = function () {
                // An elaborate, custom popup
                var myPopup = $ionicPopup.show({
                    templateUrl: 'templates/formGenerator.html',
                    title: 'Form',
                    //subTitle: 'Please use normal things',
                    scope: $scope,
                    buttons: [
                        {text: 'Cancel'},
                        {
                            text: '<b>Ok</b>',
                            type: 'button-positive',
                            onTap: function (e) {

                            }
                        }
                    ]
                });
                myPopup.then(function (res) {
                    console.log('Tapped!', res);
                });
                $timeout(function () {
                    myPopup.close(); //close the popup after 3 seconds for some reason
                }, 3000);
            };


            $ionicPopover.fromTemplateUrl('my-popover.html', {
                scope: $scope
            }).then(function (popover) {
                $scope.popover = popover;
            });


            $scope.openPopover = function ($event) {
                $scope.popover.show($event);
            };
            $scope.closePopover = function () {
                $scope.popover.hide();
            };
            //Cleanup the popover when we're done with it!
            $scope.$on('$destroy', function () {
                $scope.popover.remove();
            });
            // Execute action on hide popover
            $scope.$on('popover.hidden', function () {
                // Execute action
            });
            // Execute action on remove popover
            $scope.$on('popover.removed', function () {
                // Execute action
            });


        }])

/***************************************************************** --------- *****************************************************/
/***************************************************************** SIDE MENU *****************************************************/
/***************************************************************** --------- *****************************************************/

    .controller('sideMenu', function ($scope, $state, $ionicSideMenuDelegate, sLayer, $log, sEventSuperviseur, $rootScope) { //kifkif un global controler non?


        $log.debug("sideMenu");
        //$log.debug(doc.layers);
        $scope.layers = sLayer.list;

        $rootScope.$on("layersListUpdated", function () {
            $log.debug("event layers recus");
            $scope.layers = sLayer.list;
        });


        $scope.sEventSuperviseur = sEventSuperviseur;

        //$log.debug( $scope.sEventSuperviseur);

        $scope.openMenu = function () {
            $ionicSideMenuDelegate.toggleLeft();
        }

        $scope.newCache = function () {

            sEventSuperviseur.event.sideMenu = false;
            $state.go('cache');
        };


    })

/***************************************************************** --------- *****************************************************/
/***************************************************************** LOADER     *****************************************************/
/***************************************************************** --------- *****************************************************/


    .controller('loader', function ($scope, $state, sPouch, sLayer, $timeout, $log) {

        var n = sLayer.list;
        //var u =  sLayer.usr;
        //var l = sLayer.cfg;
        $log.debug("loader");
        $log.debug(n);
        //$log.debug(u);
        //$log.debug(l);
        $log.debug("/ loader");

        $scope.loadingPercent = 0;


        //Bouchon de vase
        $timeout(function () {
            $scope.loadingPercent = $scope.loadingPercent + 25;

            $timeout(function () {
                $scope.loadingPercent = $scope.loadingPercent + 25;
                $timeout(function () {
                    $scope.loadingPercent = $scope.loadingPercent + 25;
                    $timeout(function () {
                        $scope.loadingPercent = $scope.loadingPercent + 25;
                        $state.go("menu.home");
                    }, 600);
                }, 600);
            }, 600);


        }, 600);


    });