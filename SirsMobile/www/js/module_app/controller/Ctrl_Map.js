/**
 * Created by roch Dardie on 10/04/15.
 */


//"active": true,

angular.module('module_app.controllers.map', [])
/***************************************************************** --------- *****************************************************/
/*****************************************************************  MAP    *****************************************************/
/***************************************************************** --------- *****************************************************/

//sMap ==> ?
    .controller('cMap', function cMap($scope, $ionicSideMenuDelegate, $ionicScrollDelegate, sMapLayer, sAppLayer, $log, olData, sEventSuperviseur, sContext, $rootScope, $cordovaGeolocation, $timeout, sStyleFactory, sLoc) {

        var format = new ol.format.WKT();

        var white = [255, 255, 255, 1],
            grey = [84, 84, 84, 1],
            green = [0, 255, 0, 1];

        var selectInteraction = new ol.interaction.LongClickSelect({
            circleStyle: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: /* orange */ [255, 165, 0, 0.25]
                }),
                stroke: new ol.style.Stroke({
                    color: /* orange */ [255, 165, 0, 1],
                    width: 2
                })
            }),
            maxRadius: 100
        });
        selectInteraction.on('select', onFeaturesSelected);

        // affect
        var me = this;
        me.sMapLayer = sMapLayer;
        me.sAppLayer = sAppLayer;

        me.sLoc = sLoc;


//todo add to conf db
        angular.extend(me,
            {

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


//map instance
        olData.getMap('map').then(function(map) {
            me.currentMap = map;
            me.currentMap.addInteraction(selectInteraction);
        });

        $scope.$on('$destroy', function() {
            me.currentMap.removeInteraction(selectInteraction);
            me.currentMap = null;
        });


        $scope.$on("enableGeoLoc", function() {
            //todo link cme plugin
        });

        $scope.$on("disableGeoLoc", function() {
            //todo link cme plugin
        });


        $rootScope.$on("sAppLayer_LayerList_Update", function() {
            $log.debug("testLayer return");
            $log.debug(me.sAppLayer.list);
            $timeout(setFeaturesOfVectorLayers); // wait for openlayers directive update (next digest)
        });

        $scope.$on('editionModeChanged', setFeaturesStyle);


        //get One AppLayerfor debug
        sAppLayer.updateList();


        /**
         * Draws the features of application layers.
         */
        function setFeaturesOfVectorLayers() {
            forEachVectorLayer(function(layerInstance, layerIndex, layerModel) {

                // Remove old features.
                layerInstance.getSource().clear(true);

                // Create features from documents and display them.
                var features = [];
                angular.forEach(layerModel.data, function(item) {
                    if (item.doc && angular.isString(item.doc.geometry)) { // it seems that some documents have no geometry
                        var feature = format.readFeature(item.doc.geometry);
                        feature.getGeometry().transform('EPSG:2154', 'EPSG:3857');
                        feature.set('id', item.doc._id);
                        feature.set('rev', item.doc._rev);
                        feature.set('title', item.doc.libelle);
                        setFeatureStyle(feature, layerIndex);
                        features.push(feature);
                    }
                });
                layerInstance.getSource().addFeatures(features);

                // Log.
                $log.debug(features.length + ' feature(s) added to the layer named "' + layerModel.gIndex + '"');
            });
        }

        /**
         * Iterates over visible application layers.
         * 
         * @param callback {function(ol.layer.Layer, oAppLayer, Number)} the iterator function.
         */
        function forEachVectorLayer(callback) {
            olData.getMap('map').then(function(map) {
                angular.forEach(me.sAppLayer.asSimpleStack, function(layerModel, layerIndex) {
                    if (layerModel.visible === true) {
                        var layerInstance = getVectorLayerByName(map, layerModel.gIndex);
                        callback(layerInstance, layerIndex, layerModel);
                    }
                });
            });
        }

        /**
         * Iterates over features of vector layers.
         *
         * @param callback {function(ol.Feature, Number)} the iterator function.
         */
        function forEachFeatureInVectorLayers(callback) {
            forEachVectorLayer(function(layerInstance, layerIndex) {
                layerInstance.getSource().getFeatures().forEach(function(feature) {
                    callback(feature, layerIndex);
                });
            });
        }

        /**
         * Retrieves the ol.layer.Vector with the specified name from an ol.Map instance.
         *
         * @param {ol.Map} map the map instance.
         * @param {String} name the layer name.
         * @returns {ol.layer.Vector} the layer instance if exists.
         * @throws {Error} if the layer was not found.
         */
        function getVectorLayerByName(map, name) {
            var layers = map.getLayers(), i = layers.getLength();
            while (i--) {
                var olLayer = layers.item(i);
                if (olLayer instanceof ol.layer.Vector && olLayer.get('name') === name) {
                    return olLayer;
                }
            }
            throw new Error('No layer named "' + name + '" was found on map');
        }

        /**
         * Sets/updates the style of all visible features (feature per feature).
         */
        function setFeaturesStyle() {
            forEachFeatureInVectorLayers(setFeatureStyle);
        }

        /**
         * Sets/updates the style of the specified feature.
         *
         * @param feature {ol.Feature} the feature to style
         * @param layerIndex {Integer} the vector layer index
         */
        function setFeatureStyle(feature, layerIndex) {
            if (feature.get('selected')) {
                feature.setStyle(sStyleFactory.createByIndex(layerIndex, white));
            } else if (sContext.editionMode) {
                feature.setStyle(sStyleFactory.create(feature.get('edited') ? green : grey));
            } else {
                feature.setStyle(sStyleFactory.createByIndex(layerIndex));
            }
        }

        /**
         * Callback for ol.interaction.LongClickSelect 'select' event.
         *
         * @param {ol.SelectEvent} event the select event.
         */
        function onFeaturesSelected(event) {
            $log.debug(event.selected.length + ' feature(s) selected');

            forEachFeatureInVectorLayers(function(feature, layerIndex) {
                feature.set('selected', event.selected.indexOf(feature) !== -1);
                setFeatureStyle(feature, layerIndex);
            });

            if (event.selected.length) {
                sContext.tribordView.active = 'desordreSlct';
                sContext.selectedFeatures = event.selected;
                $ionicSideMenuDelegate.toggleRight();

                // Scroll to top of the selection list (if already visible).
                var ionContent = $ionicScrollDelegate.$getByHandle('selectionScroll');
                if (angular.isDefined(ionContent)) {
                    ionContent.scrollTop(false);
                }
            }
        }
    });
