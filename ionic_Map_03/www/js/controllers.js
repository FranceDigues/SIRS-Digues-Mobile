/**
 * Created by Roch Dardie on 15/03/15.
 */


var mm =new Array();

angular.module('controllers', [])

/***************************************************************** --------- *****************************************************/
/*****************************************************************  MAP    *****************************************************/
/***************************************************************** --------- *****************************************************/


    .controller('MapCtrl', function($scope, sLayer,$log,sMap,olData, sEventSuperviseur,sMask,sContext) {

        //var myMap =null
        //$scope.tt=tt;
        $log.debug(sLayer.list);

        //$scope.msk = sMask.doc;
        //$log.debug($scope.msk)

        $scope.layers = sLayer.list;
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



        var featureOverlay = null;



        //essai d'edition via feature overlay

        olData.getMap("map").then(function(map) {

            $log.debug(map);

            //myMap = map;

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


        $scope.publie = function(){
            $log.debug(featureOverlay.getFeatures());
            $log.debug(toGeoJson(featureOverlay));
            $log.debug(sContext.param);
            //$log.debug($scope.msk);
            $log.debug(sMask.doc);

            sMask.doc.GeoJson=toGeoJson(featureOverlay);
            sMask.writeDocOnDb();
        }

        $scope.$on('openlayers.drawend', function(F) {
            $log.debug(F);

            $log.debug(featureOverlay);

            featureOverlay.getFeatures().clear();
            featureOverlay.addFeature(F);

        });


    })

/***************************************************************** --------- *****************************************************/
/***************************************************************** CACHE     *****************************************************/
/***************************************************************** --------- *****************************************************/


.controller('CacheCtrl', function($scope,sLayer,sMap,olData,$log,$timeout,sCacheMap) {
        $scope.var={CoordList : null};


        $scope.layers=sLayer.list;
        $scope.mode = sMap.mode;
        $scope.vsCacheBox= null;
        $scope.lCacheBox= null;

        $scope.polyOrnotPoly = false;




        //todo faire le trie :
        $scope.nbTileDownloaded = sCacheMap.nbTileDownloaded;
        $scope.nbTile =sCacheMap.nbTile;
        $scope.imageTmp = null;
        $scope.HL = false; //Mode Hors Ligne
        $scope.z={zmin :1, zMax :3};
        //$scope.zMax=3;


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
                        map: [ 'singleclick', 'pointermove','boxend' ]
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
                markers:new Array()  //FIXME zoom impossible si marker sur la carte

            });






        olData.getMap("mapCache").then(function(map){
                $log.debug("Cache Control getMap :")






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
                var lPoly = new ol.layer.Vector({
                    source:  $scope.vsPoly,
                    style: styles
                });


                map.addLayer(lPoly);
            }
        );


            //maintien de la zonne a l'ecran dans un calque temporaire
            $scope.$on('openlayers.map.pointermove', function(e, coord) {

                $scope.$apply(function () {

                    //recup jeux de coordonnée
                    var tGeom = $scope.dragBox.getGeometry().clone(); // comportement etrange
                    $scope.var.CoordList =  tGeom.transform('EPSG:3857','EPSG:4326').getCoordinates();
                    $log.debug( $scope.var.CoordList);
                        /* netoyage de la couche */
                    $scope.vsPoly.clear();

                        /* ajout du rectangle*/
                    $scope.vsPoly.addFeature(
                            new ol.Feature({
                                geometry: $scope.dragBox.getGeometry()

                            }));
                });
            });


        $scope.cachMe=function(){
            //TODO recup LayerName et OSM automatiquement
            $log.debug($scope.var.CoordList);
            sCacheMap.cache("http://a.tile.openstreetmap.org/",$scope.var.CoordList,"essai","OSM",$scope.z.zMin,$scope.z.zMax);
        };

})

/***************************************************************** --------- *****************************************************/
/***************************************************************** ????????? *****************************************************/
/***************************************************************** --------- *****************************************************/

    .controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

/***************************************************************** --------- *****************************************************/
/***************************************************************** Masque *****************************************************/
/***************************************************************** --------- *****************************************************/

.controller('MskCtrl', function($scope,sPouch,$log,sContext,$state,$rootScope) {

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



        //on se rend sur la carte avec le bon masque en contexte
        $scope.landingOnEarth = function(mskIdf){

            //mise a jour du contexte
            sContext.param.mskUUID=mskIdf;
            $rootScope.$broadcast("msk_change"); //TODO faire des type d'event specifique pour les notification de contexte
            //de-orbitation
            $state.go('menu.tabs.map');

            //switch(mskIdf) {
            //    case 1:
            //        code block
            //        break;
            //    case 2:
            //        code block
            //        break;
            //    default:
            //    default code block
            //}

        }


})

/***************************************************************** --------- *****************************************************/
/***************************************************************** Form List *****************************************************/
/***************************************************************** --------- *****************************************************/


    .controller('FormListCtrl', ['$scope','$ionicPopup','$ionicPopover','$timeout','sPouch','$log',
    function ($scope,$ionicPopup,$ionicPopover, $timeout,sPouch,$log) {
        $scope.form1 = null;

        sPouch.form.get(cFormTest).then(function (doc) {
                $log.debug("slayer init")
                $log.debug(doc)

                //me.list = doc.layers;
                $scope.form1 = doc.param;
                $log.debug( $scope.form1);
                //$log.debug("slayer end")
            }).catch(function (err) {
                $log.debug(err);
            });
        //    [
        //    {
        //        label: 'username',
        //        id: 'forminput1',
        //        type: 'text',
        //        value: '',
        //        placeholder: 'Enter your username here..'
        //    },
        //    {
        //        label: 'date',
        //        id: 'forminput2',
        //        type: 'date',
        //        value: new Date('01/01/1970'),
        //        placeholder: 'Enter your date here ..',
        //        hide: 'form1[0].value=="test"'
        //    },
        //    {
        //        label: 'select1',
        //        id: 'select1',
        //        type: 'select',
        //        values: [
        //            {
        //                'text': 'toto',
        //                'value': 'testValue'
        //            },
        //            {
        //                'text': 'titi',
        //                'value': 'titiValue'
        //            }
        //        ],
        //        change: 'if (form1[2].value=="testValue"){form1[3].values = [{"text": "test","value":"blbl"}]}'
        //    },
        //    {
        //        label: 'select2',
        //        id: 'select2',
        //        type: 'select',
        //        values: [
        //            {
        //                'text': 'tata',
        //                'value': 'tataValue'
        //            },
        //            {
        //                'text': 'tutu',
        //                'value': 'tutuValue'
        //            }
        //        ]
        //    }
        //
        //];

        $scope.evalAngular = function (string) {
            return $scope.$eval(string);
        };


        $scope.showPopup = function() {
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
        }).then(function(popover) {
            $scope.popover = popover;
        });


        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };
        //Cleanup the popover when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });
        // Execute action on hide popover
        $scope.$on('popover.hidden', function() {
            // Execute action
        });
        // Execute action on remove popover
        $scope.$on('popover.removed', function() {
            // Execute action
        });






    }])

    /***************************************************************** --------- *****************************************************/
    /***************************************************************** SIDE MENU *****************************************************/
    /***************************************************************** --------- *****************************************************/

    .controller('sideMenu', function($scope,$state, $ionicSideMenuDelegate,sLayer,$log,sEventSuperviseur,$rootScope) { //kifkif un global controler non?


            $log.debug("sideMenu");
            //$log.debug(doc.layers);
            $scope.layers = sLayer.list;

        $rootScope.$on("layersListUpdated",  function(){
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


    .controller('loader', function($scope,$state,sPouch,sLayer,$timeout,$log) {

       var n = sLayer.list;
       //var u =  sLayer.usr;
       //var l = sLayer.cfg;
        $log.debug("loader");
        $log.debug(n);
        //$log.debug(u);
        //$log.debug(l);
        $log.debug("/ loader");

        $scope.loadingPercent= 0;


        //Bouchon de vase
            $timeout(function(){
                $scope.loadingPercent=$scope.loadingPercent+25;

                $timeout(function(){
                    $scope.loadingPercent=$scope.loadingPercent+25;
                    $timeout(function(){
                        $scope.loadingPercent=$scope.loadingPercent+25;
                        $timeout(function(){
                            $scope.loadingPercent=$scope.loadingPercent+25;
                            $state.go("menu.home");
                        },600);
                        },600);
                },600);


            },600);






    });