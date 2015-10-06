angular.module('module_app.services.map', ['module_app.services.context'])

    .constant('defaultView', {
        zoom: 8,
        center: ol.proj.transform([3.5, 43.5], 'CRS:84', 'EPSG:3857')
    })
    
    .factory('currentView', function(defaultView) {
        return new ol.View(defaultView);
    })

    .service('MapManager', function MapManager($rootScope, $q, $cacheFactory, olMap, BackLayerService, AppLayersService, LocalDocument, StyleFactory, currentView) {

        var self = this;

        var wktReader = new ol.format.WKT();

        var featureCache = $cacheFactory('featureCache');

        var selectInteraction = new ol.interaction.LongClickSelect({
            circleStyle: new ol.style.Style({
                fill: new ol.style.Fill({ color: [255, 165, 0, 0.25] }),
                stroke: new ol.style.Stroke({ color: [255, 165, 0, 1], width: 2 })
            })
        });

        var lastSelection = [];


        self.buildConfig = function() {
            var olLayers = [];

            // Background layer.
            olLayers.push(createBackLayerInstance(BackLayerService.getActive()));

            // Application layers.
            angular.forEach(AppLayersService.getFavorites(), function(layerModel, index) {
                olLayers.push(createAppLayerInstance(layerModel));
                if (layerModel.visible === true) {
                    setAppLayerFeatures(olLayers[index + 1]);
                }
            });

            return {
                view: currentView,
                layers: olLayers,
                controls: [],
                interactions: ol.interaction.defaults({
                    altShiftDragRotate: false,
                    shiftDragZoom: false
                }).extend([selectInteraction])
            };
        };

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
                olLayer.getSource().clear();
            }
        };


        function createBackLayerInstance(layerModel) {
            var options = angular.copy(layerModel);
            options.source = new ol.source[layerModel.source.type](layerModel.source);
            return new ol.layer[layerModel.type](options);
        }

        function createAppLayerInstance(layerModel) {
            var olLayer = new ol.layer.Image({
                name: layerModel.title,
                visible: layerModel.visible,
                source: new ol.source.ImageVector({
                    source: new ol.source.Vector({ useSpatialIndex: false })
                })
            });
            olLayer.set('model', layerModel);
            return olLayer;
        }

        function getAppLayerInstance(layerModel) {
            var map = olMap.get('main');
            if (map instanceof ol.Map) {
                var layers = map.getLayers(),
                    i = layers.getLength();
                while (i--) {
                    if (layers.item(i).get('model') === layerModel) {
                        return layers.item(i);
                    }
                }
            }
            return null;
        }

        function createFeatureModels(rows) {
            var features = [];
            angular.forEach(rows, function(row) {
                if (angular.isString(row.value.geometry)) { // paranoiac check
                    var geometry = wktReader.readGeometry(row.value.geometry);
                    geometry.transform('EPSG:2154', 'EPSG:3857');
                    features.push({
                        geometry: geometry,
                        docId: row.value.id,
                        docRev: row.value.rev,
                        title: row.value.libelle
                    });

                    //var feature = wktReader.readFeature(row.value.geometry);
                    //feature.getGeometry().transform('EPSG:2154', 'EPSG:3857');
                    //feature.set('id', row.value.id);
                    //feature.set('rev', row.value.rev);
                    //feature.set('title', row.value.libelle);
                    //features.push(feature);
                }
            });
            return features;
        }

        function setAppLayerFeatures(olLayer) {
            var layerModel = olLayer.get('model'),
                olSource = olLayer.getSource().getSource();

            var promise = featureCache.get(layerModel.title);
            if (angular.isUndefined(promise)) {
                var deferred = $q.defer();
                LocalDocument.query('Element/byClassAndLinear', {
                    startkey: [layerModel.filterValue],
                    endkey: [layerModel.filterValue, {}]
                }).then(
                    function(results) {
                        deferred.resolve(createFeatureModels(results));
                    },
                    function(error) {
                        deferred.reject(error);
                    });
                promise = deferred.promise;
                featureCache.put(layerModel.title, promise);
            }

            promise.then(
                function onSuccess(featureModels) {
                    olSource.addFeatures(featureModels.map(function(featureModel) {
                        var olFeature = new ol.Feature(featureModel);
                        olFeature.setStyle(StyleFactory(layerModel.color, featureModel.geometry.getType()));
                        return olFeature;
                    }));
                },
                function onError(error) {
                    // TODO → handle error
                });
        }


        selectInteraction.on('select', function(event) {
            angular.forEach(lastSelection, function(feature) {
                feature.set('selected', false);
            });
            lastSelection = event.selected;
            angular.forEach(event.selected, function(feature) {
                feature.set('selected', true);
            });
            $rootScope.$broadcast('objectSelected', event.selected);
        });

        $rootScope.$on('backLayerChanged', function(event, layerModel) {
            var map = olMap.get('main');
            if (map instanceof ol.Map) {
                map.getLayers().setAt(0, createBackLayerInstance(layerModel));
            }
        });

        $rootScope.$on('appLayerAdded', function(event, layerModel) {
            var map = olMap.get('main');
            if (map instanceof ol.Map) {
                map.getLayers().push(createAppLayerInstance(layerModel));
            }
        });

        $rootScope.$on('appLayerRemoved', function(event, layerModel, index) {
            var map = olMap.get('main');
            if (map instanceof ol.Map) {
                map.getLayers().removeAt(index + 1);
            }
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
                    strokeWidth = 4;
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