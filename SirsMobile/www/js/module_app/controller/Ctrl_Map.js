/**
 * Created by roch Dardie on 10/04/15.
 */


//"active": true,

angular.module('module_app.controllers.map', [])
/***************************************************************** --------- *****************************************************/
/*****************************************************************  MAP    *****************************************************/
/***************************************************************** --------- *****************************************************/

//sMap ==> ?
    .controller('cMap', function cMap ($scope, sMapLayer,sAppLayer, $log,  olData, sEventSuperviseur, sContext, $rootScope, $cordovaGeolocation,$timeout,sStyleGenerator) {

        var format = new ol.format.WKT();

        // affect
        var me = this;
        me.sMapLayer = sMapLayer;
        me.sAppLayer = sAppLayer;


//todo add to conf db
        angular.extend(me,
            {
                centreCarte: {
                    lat: 43.5,
                    lon: 3.5,
                    zoom: 8
                },
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


        });












        $scope.$on("enableGeoLoc", function () {
             //todo link cme plugin
        });

        $scope.$on("disableGeoLoc", function () {
            //todo link cme plugin
        });


        $rootScope.$on("sAppLayer_LayerList_Update",function(){
            $log.debug("testLayer return");
            $log.debug(me.sAppLayer.list);
            $timeout(addDisorderFeatures); // wait for openlayers directive update (next digest)
        });

        $scope.$on('$destroy', function() {
            if (me.currentMap instanceof ol.Map) {

            }
        });


        //get One AppLayerfor debug
        sAppLayer.updateList();


        /**
         * Creates and adds the disorder features to application layers.
         */
        function addDisorderFeatures() {
            olData.getMap("map").then(function(map) {
                angular.forEach(me.sAppLayer.list, function(layer, layerIndex) {

                    // Retrieve the map layer from its name.
                    var olLayer = getVectorLayerByName(map, layer.name);

                    // Create features from documents and display them.
                    var features = [];
                    angular.forEach(layer.data, function(item) {
                        if (item.doc && angular.isString(item.doc.geometry)) { // it seems that some documents have no geometry
                            var feature = format.readFeature(item.doc.geometry);
                            feature.getGeometry().transform('EPSG:2154', 'EPSG:3857');
                            feature.set('id', item.doc._id);
                            feature.set('rev', item.doc._rev);
                            feature.setStyle(sStyleGenerator(layerIndex));
                            features.push(feature);
                        }
                    });
                    $log.debug('Add ' + features.length + ' feature(s) to the layer named "' + layer.name + '"');
                    olLayer.getSource().addFeatures(features);
                });
            });
        }

        /**
         * Retrieves the ol.layer.Vector with the specified name from an ol.Map
         * instance.
         *
         * @param {ol.Map} map the map instance.
         * @param {String} name the layer name.
         * @returns {ol.layer.Vector} the layer instance if exists.
         * @throws {Error} if the layer was not found.
         */
        function getVectorLayerByName(map, name) {
            var layers = map.getLayers(), i = layers.getLength();
            while(i--) {
                var olLayer = layers.item(i);
                if (olLayer instanceof ol.layer.Vector && olLayer.get('name') === name) {
                    return olLayer;
                }
            }
            throw new Error('No layer named "' + layerName + '" was found on map');
        }
    });
