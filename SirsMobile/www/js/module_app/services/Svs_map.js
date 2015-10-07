angular.module('module_app.services.map', ['module_app.services.context'])

    .factory('featureCache', function($cacheFactory) {
        return $cacheFactory('featureCache');
    })

    .service('MapManager', function MapManager($rootScope, $q, $ionicSideMenuDelegate, olMap, BackLayerService,
                                               AppLayersService, LocalDocument, StyleFactory, sContext,
                                               GeolocationService, featureCache) {

        var self = this;


        // OpenLayers objects
        // ----------

        var lastSelection = [];

        var currentView = new ol.View({
            zoom: 8,
            center: ol.proj.transform([3.5, 43.5], 'CRS:84', 'EPSG:3857')
        });

        var wktFormat = new ol.format.WKT();

        var wgs84Sphere = new ol.Sphere(6378137);

        var selectInteraction = new ol.interaction.LongClickSelect({
            circleStyle: new ol.style.Style({
                fill: new ol.style.Fill({ color: [255, 255, 255, 0.5] })
            }),
            layers: function isSelectable(olLayer) {
                var model = olLayer.get('model');
                return angular.isObject(model) && model.selectable === true;
            }
        });

        var backLayer = new ol.layer.Tile({
            name: 'Background',
            source: createBackLayerSourceInstance(BackLayerService.getActive())
        });

        var appLayers = new ol.layer.Group({
            name: 'Business',
            layers: AppLayersService.getFavorites().map(createAppLayerInstance)
        });

        var geolocLayer = new ol.layer.Vector({
            name: 'Geolocation',
            visible: GeolocationService.isEnabled(),
            source: new ol.source.Vector({ useSpatialIndex: false }),
            style: function(feature) {
                switch(feature.getGeometry().getType()) {
                    case 'Polygon':
                        return [
                            new ol.style.Style({
                                fill: new ol.style.Fill({ color: [255, 255, 255, 0.2] }),
                                stroke: new ol.style.Stroke({ color: [0, 0, 255, 1], width: 1 })
                            })
                        ];
                    case 'Point':
                        return [
                            new ol.style.Style({
                                image: new ol.style.Icon({
                                    anchor: [0.5, 1],
                                    anchorXUnits: 'fraction',
                                    anchorYUnits: 'fraction',
                                    src: 'img/pin-icon.png'
                                })
                            })
                        ];
                    default:
                        return [];
                }
            }
        });


        // Public methods
        // ----------

        self.buildConfig = function() {
            return {
                view: currentView,
                layers: [backLayer, appLayers, geolocLayer],
                controls: [],
                interactions: ol.interaction.defaults({
                    altShiftDragRotate: false,
                    shiftDragZoom: false
                }).extend([selectInteraction])
            };
        };

        // TODO → find a way to do this through event
        self.toggleAppLayer = function(layerModel) {
            var olLayer = getAppLayerInstance(layerModel);

            // Update layer model.
            layerModel.visible = !layerModel.visible;

            // Update OL layer.
            olLayer.setVisible(layerModel.visible);

            // Load data if necessary.
            if (layerModel.visible === true) {
                setAppLayerFeatures(olLayer);
            } else {
                olLayer.getSource().getSource().clear();
            }
        };


        // Private methods
        // ----------

        function createBackLayerSourceInstance(layerModel) {
            return new ol.source[layerModel.source.type](layerModel.source);
        }

        function createAppLayerInstance(layerModel) {
            var olLayer = new ol.layer.Image({
                name: layerModel.title,
                visible: layerModel.visible,
                model: layerModel,
                source: new ol.source.ImageVector({
                    source: new ol.source.Vector({ useSpatialIndex: false })
                })
            });

            if (layerModel.visible === true) {
                setAppLayerFeatures(olLayer);
            }
            return olLayer;
        }

        function createAppFeatureInstances(featureDocs) {
            var features = [];
            angular.forEach(featureDocs, function(featureDoc) {
                if (angular.isString(featureDoc.value.geometry)) {
                    var feature = wktFormat.readFeature(featureDoc.value.geometry);
                    feature.getGeometry().transform('EPSG:2154', 'EPSG:3857');
                    feature.set('id', featureDoc.value.id);
                    feature.set('rev', featureDoc.value.rev);
                    feature.set('title', featureDoc.value.libelle);
                    features.push(feature);
                }
            });
            return features;
        }

        function createGeolocFeatureInstances(location) {
            var pos = [location.longitude, location.latitude];
            return [
                new ol.Feature({
                    geometry: new ol.geom.Point(pos)
                        .transform('EPSG:4326', 'EPSG:3857')
                }),
                new ol.Feature({
                    geometry: ol.geom.Polygon.circular(wgs84Sphere, pos, location.accuracy, 200)
                        .transform('EPSG:4326', 'EPSG:3857')
                })
            ];
        }

        function getAppLayerInstance(layerModel) {
            var layers = appLayers.getLayers(),
                i = layers.getLength();
            while (i--) {
                if (layers.item(i).get('model') === layerModel) {
                    return layers.item(i);
                }
            }
            return null;
        }

        function setAppLayerFeatures(olLayer) {
            var layerModel = olLayer.get('model'),
                olSource = olLayer.getSource().getSource();

            // Try to get the promise of a previous query.
            var promise = featureCache.get(layerModel.title);
            if (angular.isUndefined(promise)) {

                // No promise found, create a deferred object.
                var deferred = $q.defer();

                // Try to get the layer features.
                LocalDocument.query('Element/byClassAndLinear', {
                    startkey: [layerModel.filterValue],
                    endkey: [layerModel.filterValue, {}]
                }).then(
                    function(results) {
                        deferred.resolve(createAppFeatureInstances(results));
                    },
                    function(error) {
                        deferred.reject(error);
                    });

                // Set and store the promise.
                promise = deferred.promise;
                featureCache.put(layerModel.title, promise);
            }

            // Wait for promise resolution or rejection.
            promise.then(
                function onSuccess(features) {
                    // Set feature styles.
                    angular.forEach(features, function(feature) {
                        feature.setStyle(StyleFactory(layerModel.color, feature.getGeometry().getType()));
                    });

                    // Draw features.
                    olSource.addFeatures(features);
                },
                function onError(error) {
                    // TODO → handle error
                });
        }


        // Event listeners
        // ----------

        selectInteraction.on('select', function(event) {
            angular.forEach(lastSelection, function(feature) {
                feature.set('selected', false);
            });
            lastSelection = event.selected;
            angular.forEach(event.selected, function(feature) {
                feature.set('selected', true);
            });
            $rootScope.$broadcast('objectSelected', event.selected);

            // TODO → move it and listen the above event
            sContext.tribordView.active = 'desordreSlct';
            if (lastSelection.length) {
                sContext.selectedFeatures = event.selected;
                !$ionicSideMenuDelegate.isOpenRight() && $ionicSideMenuDelegate.toggleRight();
            } else {
                sContext.selectedFeatures = [];
                $ionicSideMenuDelegate.isOpenRight() && $ionicSideMenuDelegate.toggleRight();
            }
        });

        $rootScope.$on('backLayerChanged', function(event, layerModel) {
            backLayer.setSource(createBackLayerSourceInstance(layerModel));
        });

        $rootScope.$on('appLayerAdded', function(event, layerModel) {
            appLayers.getLayers().push(createAppLayerInstance(layerModel));
        });

        $rootScope.$on('appLayerRemoved', function(event, layerModel, index) {
            appLayers.getLayers().removeAt(index);
        });

        $rootScope.$on('geolocationReady', function() {
            geolocLayer.setVisible(true);
        });

        $rootScope.$on('geolocationStopped', function() {
            geolocLayer.setVisible(false);
        });

        $rootScope.$on('geolocationChanged', function(event, location) {
            geolocLayer.getSource().clear();
            geolocLayer.getSource().addFeatures(createGeolocFeatureInstances(location.coords));
        });
    })

    .factory('StyleFactory', function() {

        function createPolygonStyle(fillColor, strokeColor, strokeWidth) {
            var fill = new ol.style.Fill({ color: fillColor });
            var stroke = new ol.style.Stroke({ color: strokeColor, width: strokeWidth });
            return new ol.style.Style({ fill: fill, stroke: stroke });
        }

        function createLineStyle(strokeColor, strokeWidth) {
            var stroke = new ol.style.Stroke({ color: strokeColor, width: strokeWidth });
            return new ol.style.Style({ stroke: stroke });
        }

        function createPointStyle(fillColor, strokeColor, strokeWidth, circleRadius) {
            var fill = new ol.style.Fill({ color: fillColor });
            var stroke = new ol.style.Stroke({ color: strokeColor, width: strokeWidth });
            var circle = new ol.style.Circle({ fill: fill, stroke: stroke, radius: circleRadius });
            return new ol.style.Style({ image: circle });
        }

        function createPointStyleFunc(color) {
            return function() {
                var fillColor = this.get('selected') === true ? color : [255, 255, 255, 0.25],
                    strokeColor = this.get('selected') === true ? [255, 255, 255, 1] : color,
                    strokeWidth = 2,
                    pointRadius = 5;
                return [createPointStyle(fillColor, strokeColor, strokeWidth, pointRadius)];
            };
        }

        function createLineStyleFunc(color) {
            return function() {
                var styles = [],
                    strokeColor = color,
                    strokeWidth = 5;
                if (this.get('selected') === true) {
                    styles.push(createLineStyle([255, 255, 255, 1], strokeWidth + 4));
                }
                styles.push(createLineStyle(strokeColor, strokeWidth));
                return styles;
            };
        }

        function createPolygonStyleFunc(color) {
            return function() {
                var styles = [],
                    fillColor = [255, 255, 255, 0.25],
                    strokeColor = color,
                    strokeWidth = 4;
                if (this.get('selected') === true) {
                    styles.push(createLineStyle([255, 255, 255, 1], strokeWidth + 4));
                }
                styles.push(createPolygonStyle(fillColor, strokeColor, strokeWidth));
                return styles;
            };
        }


        return function(color, type) {
            switch (type) {
                case 'Polygon':
                case 'MultiPolygon':
                    return createPolygonStyleFunc(color);
                case 'LineString':
                case 'MultiLineString':
                    return createLineStyleFunc(color);
                case 'Point':
                case 'MultiPoint':
                    return createPointStyleFunc(color);
            }
            return null;
        };
    });