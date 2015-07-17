/**
 * Created by roch Dardie on 10/04/15.
 */


//"active": true,

angular.module('module_app.controllers.map', [])
/***************************************************************** --------- *****************************************************/
/*****************************************************************  MAP    *****************************************************/
/***************************************************************** --------- *****************************************************/

//sMap ==> ?
    .controller('cMap', function cMap($scope, sMapLayer, sAppLayer, $log, olData, sEventSuperviseur, sContext, $rootScope, $cordovaGeolocation, $timeout, sStyleFactory, sLoc) {

        var format = new ol.format.WKT();

        var white = [255, 255, 255, 1],
            grey = [84, 84, 84, 1],
            blue = [0, 153, 255, 1],
            green = [0, 255, 0, 1];

        var selectInteraction = new ol.interaction.LongClickSelect({
            circleStyle: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 165, 0, 0.25)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(255, 165, 0, 1)',
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
        olData.getMap("map").then(function (map) {
            me.currentMap = map;
            me.currentMap.addInteraction(selectInteraction);
        });

        $scope.$on('$destroy', function () {
            me.currentMap.removeInteraction(selectInteraction);
            me.currentMap = null;
        });


        $scope.$on("enableGeoLoc", function () {
            //todo link cme plugin
        });

        $scope.$on("disableGeoLoc", function () {
            //todo link cme plugin
        });


        $rootScope.$on("sAppLayer_LayerList_Update", function () {
            $log.debug("testLayer return");
            $log.debug(me.sAppLayer.list);
            $timeout(addFeaturesToAppLayers); // wait for openlayers directive update (next digest)
        });

        $scope.$on('editionModeChanged', updateStyleOfAppLayers);


        //get One AppLayerfor debug
        sAppLayer.updateList();


        /**
         * Draws the features of application layers.
         */
        function addFeaturesToAppLayers() {
            olData.getMap("map").then(function (map) {
                angular.forEach(me.sAppLayer.asSimpleStack.filter(function (layer) {
                    return layer.visible === true ? true : false;
                }), function (layer, layerIndex) {

                    // Retrieve the map layer from its name.
                    var olLayer = getVectorLayerByName(map, layer.gIndex);

                    // Remove old features.
                    olLayer.getSource().clear(true);

                    // Create features from documents and display them.
                    var features = [];
                    angular.forEach(layer.data, function (item) {
                        if (item.doc && angular.isString(item.doc.geometry)) { // it seems that some documents have no geometry
                            var feature = format.readFeature(item.doc.geometry);
                            feature.getGeometry().transform('EPSG:2154', 'EPSG:3857');
                            feature.set('id', item.doc._id);
                            feature.set('rev', item.doc._rev);
                            setFeatureStyle(feature, layerIndex);
                            features.push(feature);
                        }
                    });
                    olLayer.getSource().addFeatures(features);

                    // Log.
                    $log.debug(features.length + ' feature(s) added to the layer named "' + layer.gIndex + '"');
                });
            });
        }

        /**
         * Iterates over features of application layers.
         *
         * @param callback {function(ol.Feature, Number)} the iterator function.
         */
        function forEachFeatureInAppLayers(callback) {
            olData.getMap("map").then(function (map) {
                angular.forEach(me.sAppLayer.list, function (layer, layerIndex) {
                    var olLayer = getVectorLayerByName(map, layer.name);
                    olLayer.getSource().getFeatures().forEach(function (feature) {
                        callback(feature, layerIndex);
                    });
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
         * Updates the style of application layers (feature per feature).
         */
        function updateStyleOfAppLayers() {
            forEachFeatureInAppLayers(setFeatureStyle);
        }

        /**
         * Sets/updates the style of the specified feature.
         *
         * @param feature {ol.Feature} the feature to style
         * @param layerIndex {Integer} the vector layer index
         */
        function setFeatureStyle(feature, layerIndex) {
            if (feature.get('selected')) {
                feature.setStyle(sStyleFactory.create(blue, white));
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

            forEachFeatureInAppLayers(function (feature, layerIndex) {
                feature.set('selected', event.selected.indexOf(feature) !== -1);
                setFeatureStyle(feature, layerIndex);
            });

            // TODO -> handle selected features
        }
    });
