angular.module('module_app.services.map', ['module_app.services.context'])

    .value('currentView', new ol.View({
        zoom: 8,
        center: ol.proj.transform([3.5, 43.5], 'EPSG:4326', 'EPSG:3857'),
        enableRotation: false
    }))

    .factory('featureCache', function($cacheFactory) {
        return $cacheFactory('featureCache');
    })

    .service('MapManager', function MapManager($rootScope, $q, $ionicPlatform, $ionicSideMenuDelegate, olMap,
                                               BackLayerService, AppLayersService, EditionService, LocalDocument,
                                               StyleFactory, sContext, GeolocationService, featureCache, currentView) {

        var self = this;


        // OpenLayers objects
        // ----------

        var lastSelection = [];

        var wktFormat = new ol.format.WKT();

        var wgs84Sphere = new ol.Sphere(6378137);

        var selectInteraction = new ol.interaction.LongClickSelect({
            circleStyle: new ol.style.Style({
                fill: new ol.style.Fill({ color: [255, 255, 255, 0.5] })
            }),
            layers: function isSelectable(olLayer) {
                var model = olLayer.get('model');
                if (angular.isObject(model)) {
                    return model.selectable === true && model.visible === true && appLayers.getVisible(); // app layer
                }
                return (olLayer.get('name') === 'Edition' && editionLayer.getVisible()); // edition layer
            }
        });

        var backLayers = new ol.layer.Group({
            name: 'Background',
            layers: [createBackLayerInstance(BackLayerService.getActive())]
        });

        var appLayers = new ol.layer.Group({
            name: 'Business',
            visible: !EditionService.isEnabled(),
            layers: AppLayersService.getFavorites().map(createAppLayerInstance)
        });

        var editionLayer = createEditionLayerInstance();

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
                layers: [backLayers, appLayers, editionLayer, geolocLayer],
                controls: [],
                interactions: ol.interaction.defaults({
                    pinchRotate: false,
                    altShiftDragRotate: false,
                    shiftDragZoom: false
                }).extend([selectInteraction])
            };
        };

        // TODO → find a way to do this through event
        self.syncAppLayer = function(layerModel) {
            var olLayer = getAppLayerInstance(layerModel);

            // Update OL layer.
            olLayer.setVisible(layerModel.visible);

            // Load data if necessary.
            if (layerModel.visible === true) {
                setAppLayerFeatures(olLayer);
            } else {
                olLayer.getSource().getSource().clear();
            }
        };

        // TODO → find a way to do this through event
        self.syncBackLayer = function() {
            var olLayer = createBackLayerInstance(BackLayerService.getActive());
            backLayers.getLayers().setAt(0, olLayer);
        };


        // Private methods
        // ----------

        function createBackLayerInstance(layerModel) {
            var source = angular.copy(layerModel.source),
                extent;

            // Override the source if the layer is available from cache.
            if (angular.isObject(layerModel.cache)) {
                extent = layerModel.cache.extent;
                source.type = 'XYZ';
                source.url = layerModel.cache.url;
            }

            return new ol.layer.Tile({
                name: layerModel.title,
                extent: extent,
                model: layerModel,
                source: new ol.source[source.type](source)
            });
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

        function createEditionLayerInstance() {
            var olLayer = new ol.layer.Image({
                name: 'Edition',
                visible: EditionService.isEnabled(),
                source: new ol.source.ImageVector({
                    source: new ol.source.Vector({ useSpatialIndex: false })
                })
            });

            setEditionLayerFeatures(olLayer);
            return olLayer;
        }

        function createEditionFeatureInstance(featureDoc) {
            // Compute geometry.
            var geometry = wktFormat.readGeometry(featureDoc.positionDebut);
            if (featureDoc.positionFin && (featureDoc.positionFin !== featureDoc.positionDebut)) {
                geometry = new ol.geom.LineString([
                    geometry.getFirstCoordinate(),
                    wktFormat.readGeometry(featureDoc.positionFin).getFirstCoordinate()
                ]);
            }
            geometry.transform('EPSG:2154', 'EPSG:3857');

            // Create feature.
            var feature = new ol.Feature({ geometry: geometry });
            feature.setStyle(StyleFactory([255, 0, 0, 1], geometry.getType()));
            feature.set('id', featureDoc._id);
            feature.set('rev', featureDoc._rev);
            feature.set('title', featureDoc.libelle);
            return feature;
        }

        function createEditionFeatureInstances(featureDocs) {
            var features = [];
            angular.forEach(featureDocs, function(featureDoc) {
                features.push(createEditionFeatureInstance(featureDoc.value));
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

        function setEditionLayerFeatures(olLayer) {
            var olSource = olLayer.getSource().getSource();

            EditionService.getClosedObjects().then(
                function onSuccess(results) {
                    olSource.clear();
                    olSource.addFeatures(createEditionFeatureInstances(results));
                },
                function onError(error) {
                    // TODO → handle error
                });
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
            backLayers.getLayers().setAt(0, createBackLayerInstance(layerModel));

            var map = olMap.get('main');
            if (angular.isObject(layerModel.cache) && map) {
                currentView.fit(layerModel.cache.extent, map.getSize());
            }
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

        $rootScope.$on('editionModeChanged', function(event, isEnabled) {
            appLayers.setVisible(!isEnabled);
            editionLayer.setVisible(isEnabled);
        });

        $rootScope.$on('editionObjectSaved', function(event, objectDoc) {
            if (objectDoc.positionDebut && objectDoc.positionFin) {
                var source = editionLayer.getSource().getSource(),
                    features = source.getFeatures(), i = features.length;
                while (i--) {
                    if (features[i].get('id') === objectDoc._id) return;
                }
                source.addFeature(createEditionFeatureInstance(objectDoc));
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
                var fillColor = this.get('selected') === true ? color : [255, 255, 255, 0.5],
                    strokeColor = this.get('selected') === true ? [255, 255, 255, 1] : color,
                    strokeWidth = 2,
                    pointRadius = 6;
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