angular.module('app.services.map', ['app.services.context'])

    .value('currentView', new ol.View({
        zoom: 6,
        center: ol.proj.transform([2.7246, 47.0874], 'EPSG:4326', 'EPSG:3857'),
        enableRotation: false
    }))

    .value('selection', { list: [], active: null })

    .factory('featureCache', function($cacheFactory) {
        return $cacheFactory('featureCache');
    })

    .service('MapManager', function MapManager($rootScope, $q, $ionicPlatform, $ionicSideMenuDelegate, olMap,
                                               BackLayerService, AppLayersService,
                                               EditionService, LocalDocument,
                                               DefaultStyle, RealPositionStyle,
                                               sContext, GeolocationService,
                                               SidePanelService, featureCache,
                                               currentView, selection, SirsDoc, $window, localStorageService) {

        var self = this;

        // OpenLayers objects
        // ----------

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
            name: 'Objects',
            // visible: !EditionService.isEnabled(),
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

        self.buildConfig = function(element) {
            if (!currentView.get('touched')) {
                // Center on module extent.
                LocalDocument.get('$sirs').then(function(result) {
                    if (result.envelope) {
                        var geometry = new ol.format.WKT().readGeometry(result.envelope, {
                            dataProjection: SirsDoc.get().epsgCode,
                            featureProjection: 'EPSG:3857'
                        });
                        currentView.fit(geometry, [element.width(), element.height()]);
                        currentView.set('touched', true);
                    }
                });
            }

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
        //@hb
        self.getEditionLayer = function () {
            return editionLayer;
        };

        // TODO → find a way to do this through event
        self.syncAppLayer = function(layerModel) {
            var olLayer = getAppLayerInstance(layerModel);

            // Update OL layer.
            olLayer.setVisible(layerModel.visible);

            // Load data if necessary.
            if(layerModel.filterValue === "fr.sirs.core.model.BorneDigue"){
                olLayer.getSource().getSource().getSource().clear();
            }
            else {
                olLayer.getSource().getSource().clear();
            }

            if (layerModel.visible === true) {
                    $rootScope.loadingflag = true;
                $window.setTimeout(function(){
                    setAppLayerFeatures(olLayer);
                },1000);
            }

        };

        //@hb
        self.syncAllAppLayer = function() {
            var layers = appLayers.getLayers();
            angular.forEach(layers,function (layer) {
                var layerModel = layer.get('model');
                var olLayer = getAppLayerInstance(layerModel);
                // Update OL layer.
                olLayer.setVisible(layerModel.visible);

                // Load data if necessary.
                olLayer.getSource().getSource().clear();
                if (layerModel.visible === true) {
                    $rootScope.loadingflag = true;
                    $window.setTimeout(function(){
                        setAppLayerFeatures(olLayer);
                    },1000);
                }
                
            });
        };

        // @hb Add label to the layer features
        self.addLabelFeatureLayer = function(layerModel) {
            var olLayer = getAppLayerInstance(layerModel);
            // Update OL layer.
            olLayer.get('model').featLabels = !olLayer.get('model').featLabels ;

            // Load data if necessary.
            olLayer.getSource().getSource().clear();
            setAppLayerFeatures(olLayer);
        };

        // @hb relod the ol map after make same change
        self.reloadLayer = function(layerModel) {
            var olLayer = getAppLayerInstance(layerModel);
            // Load data if necessary.
            olLayer.getSource().getSource().clear();
            setAppLayerFeatures(olLayer);
        };

        // TODO → find a way to do this through event
        self.moveAppLayer = function(from, to) {
            var collection = appLayers.getLayers();
            collection.insertAt(to - 1, collection.removeAt(from));
        };

        // TODO → find a way to do this through event
        self.syncBackLayer = function() {
            var olLayer = createBackLayerInstance(BackLayerService.getActive());
            backLayers.getLayers().setAt(0, olLayer);
        };

        self.redrawEditionModeLayer = function (layer) {
            // Clear the layer source from the features
            layer.getSource().getSource().clear();
            editionLayer = layer;
            setEditionLayerFeatures(editionLayer);
        };

        // Private methods
        // ----------

        function createBackLayerInstance(layerModel) {

            console.debug('layer model in the create back layer instance',layerModel);

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

        //@hb create the layer of "couches métiers"
        function createAppLayerInstance(layerModel) {

            if(layerModel.filterValue === "fr.sirs.core.model.BorneDigue"){
                //@hb Change the layer Source to Cluster source
                var olLayer = new ol.layer.Image({
                    name: layerModel.title,
                    visible: layerModel.visible,
                    model: layerModel,
                    source: new ol.source.ImageVector({
                        style: function(feature, resolution) {
                            var features = feature.get("features");
                            var styles = [];

                            if (angular.isArray(features) && features.length > 0) {
                                angular.forEach(features, function (_feature) {
                                    var style = _feature.getStyle();
                                    if (typeof style === "function") {
                                        style = style.call(_feature, _feature, resolution);
                                    } else if (style instanceof ol.style.Style) {
                                        style = [].concat(style);
                                    }

                                    if (angular.isArray(style)) {
                                        angular.forEach(style, function (_style) {
                                            _style.setGeometry(_feature.getGeometry());
                                            if (_style.getText() !== undefined && _style.getText() !== null) {
                                                _style.getText().setText(undefined);
                                            }
                                            styles.push(_style);
                                        });
                                    }
                                });

                                var style = features[0].getStyle();
                                if (typeof style === "function") {
                                    style = style.call(feature, feature, resolution);
                                } else if (style instanceof ol.style.Style) {
                                    style = [].concat(style);
                                }


                                if (angular.isArray(style)) {
                                    angular.forEach(style, function (_style) {
                                        styles.push(new ol.style.Style({
                                            zIndex: _style.getZIndex(),
                                            text: _style.getText()
                                        }));
                                    });
                                }
                            }
                            return styles;
                        },
                        source: new ol.source.Cluster({
                            distance: 24,
                            source: new ol.source.Vector({useSpatialIndex: true})
                        })
                    })
                });

            }
            else {
                var olLayer = new ol.layer.Image({
                    name: layerModel.title,
                    visible: layerModel.visible,
                    model: layerModel,
                    source: new ol.source.ImageVector({
                        source: new ol.source.Vector({ useSpatialIndex: false })
                    })
                });
            }

            if (layerModel.visible === true) {
                setAppLayerFeatures(olLayer);
            }
            return olLayer;
        }

        function createAppFeatureModel(featureDoc) {
            // featureDoc = featureDoc.value || featureDoc;
            featureDoc = featureDoc.doc || featureDoc.value; // depending on "include_docs" option when querying docs

                var dataProjection = SirsDoc.get().epsgCode,
                    projGeometry = featureDoc.geometry ? wktFormat.readGeometry(featureDoc.geometry).transform(dataProjection, 'EPSG:3857') : undefined;

                if (projGeometry instanceof ol.geom.LineString && projGeometry.getCoordinates().length === 2 &&
                    projGeometry.getCoordinates()[0][0] === projGeometry.getCoordinates()[1][0] &&
                    projGeometry.getCoordinates()[0][1] === projGeometry.getCoordinates()[1][1]) {
                    projGeometry = new ol.geom.Point(projGeometry.getCoordinates()[0]);
                }

                var realGeometry = featureDoc.positionDebut ?
                    wktFormat.readGeometry(featureDoc.positionDebut).transform(dataProjection, 'EPSG:3857') : undefined;

                if (realGeometry && featureDoc.positionFin && featureDoc.positionFin !== featureDoc.positionDebut) {
                    realGeometry = new ol.geom.LineString([
                        realGeometry.getFirstCoordinate(),
                        wktFormat.readGeometry(featureDoc.positionFin).transform(dataProjection, 'EPSG:3857').getFirstCoordinate()
                    ]);
                }

                return {
                    id: featureDoc.id || featureDoc._id,
                    rev: featureDoc.rev || featureDoc._rev,
                    designation: featureDoc.designation,
                    title: featureDoc.libelle,
                    projGeometry: projGeometry,
                    realGeometry: realGeometry,
                    archive : featureDoc.date_fin ? true : false
            };

        }

        // @hb the method to create the features of the layer
        function createAppFeatureInstances(featureModels, layerModel) {

            var features = [];
            // get each feature from the featureModel
            angular.forEach(featureModels, function(featureModel) {
                if ((layerModel.realPosition && featureModel.realGeometry) || (!layerModel.realPosition && featureModel.projGeometry)) {
                    if($rootScope.archiveObjectsFlag){
                        // Show all the objects
                        var feature = new ol.Feature();
                        if (layerModel.realPosition) {
                            feature.setGeometry(featureModel.realGeometry);
                            feature.setStyle(RealPositionStyle(layerModel.color, featureModel.realGeometry.getType(),featureModel,layerModel));
                        } else {
                            feature.setGeometry(featureModel.projGeometry);
                            feature.setStyle(DefaultStyle(layerModel.color, featureModel.projGeometry.getType(),featureModel,layerModel));
                        }
                        feature.set('id', featureModel.id);
                        feature.set('categories', layerModel.categories);
                        feature.set('rev', featureModel.rev);
                        feature.set('designation', featureModel.designation);
                        feature.set('title', featureModel.libelle);
                        features.push(feature);
                    } else {
                        //Show only not archived objects
                        if(!featureModel.archive){
                            var feature = new ol.Feature();
                            if (layerModel.realPosition) {
                                feature.setGeometry(featureModel.realGeometry);
                                feature.setStyle(RealPositionStyle(layerModel.color, featureModel.realGeometry.getType(),featureModel,layerModel));
                            } else {
                                feature.setGeometry(featureModel.projGeometry);
                                feature.setStyle(DefaultStyle(layerModel.color, featureModel.projGeometry.getType(),featureModel,layerModel));
                            }
                            feature.set('id', featureModel.id);
                            feature.set('categories', layerModel.categories);
                            feature.set('rev', featureModel.rev);
                            feature.set('designation', featureModel.designation);
                            feature.set('title', featureModel.libelle);
                            features.push(feature);
                        }
                    }
                }
            });
            return features;
        }

        function setAppLayerFeatures(olLayer) {
            var layerModel = olLayer.get('model');

                if(layerModel.filterValue === "fr.sirs.core.model.BorneDigue"){
                    var olSource = olLayer.getSource().getSource().getSource();
                }
                else {
                    var olSource = olLayer.getSource().getSource();
                }

            // Try to get the promise of a previous query.
            var promise = featureCache.get(layerModel.title);

            if (angular.isUndefined(promise)) {

                if(layerModel.filterValue !== "fr.sirs.core.model.BorneDigue" && layerModel.filterValue !== "fr.sirs.core.model.TronconDigue"){
                        //Get all the favorites tronçons ids
                        var favorites = localStorageService.get("AppTronconsFavorities");
                        var keys = [];
                        if(favorites !== null && favorites.length !== 0){
                            angular.forEach(favorites,function (key) {
                                keys.push([layerModel.filterValue,key]);
                            });

                            promise = LocalDocument.query('ElementSpecial',{
                                keys :keys}).then(
                                function(results) {
                                    return results.map(createAppFeatureModel);
                                },
                                function(error) {
                                    // TODO → handle error
                                });
                        }
                        else {
                            var deferred = $q.defer();
                            promise = deferred.promise.then(
                                function() {
                                    return [].map(createAppFeatureModel);
                                });
                            deferred.resolve();
                        }
                    }
                    else if(layerModel.filterValue === "fr.sirs.core.model.TronconDigue"){
                    promise = LocalDocument.query('TronconDigue/streamLight', {
                        keys : localStorageService.get("AppTronconsFavorities") === null ? [] : localStorageService.get("AppTronconsFavorities")
                    }).then(
                        function(results) {
                            return results.map(createAppFeatureModel);
                        },
                        function(error) {
                            console.log(error);
                        });
                    }
                    else {

                    promise = LocalDocument.query('getBornesFromTronconID', {
                        keys : localStorageService.get("AppTronconsFavorities") === null ? [] : localStorageService.get("AppTronconsFavorities")
                    }).then(
                        function(results) {
                            return LocalDocument.query('getBornesIdsHB', {
                                keys : results.map(function (obj) {
                                    return obj.value;
                                })
                            }).then(
                                function(results2) {
                                    return results2.map(createAppFeatureModel);
                                });
                        },
                        function(error) {
                            console.log(error);
                        });
                    }


                // Set and store the promise.
                featureCache.put(layerModel.title, promise);
            }

                // Wait for promise resolution or rejection.
                promise.then(
                    function onSuccess(featureModels) {
                        // @hb get the featureModels from the promise
                        olSource.addFeatures(createAppFeatureInstances(featureModels, layerModel));
                        $rootScope.loadingflag = false;
                    },
                    function onError(error) {
                        // TODO → handle error
                    });


        }
        // Create the edition layer instance that contain the new objects
        function createEditionLayerInstance() {
            var olLayer = new ol.layer.Image({
                name: 'Edition',
                arch_objects : false,
                visible: EditionService.isEnabled(),
                source: new ol.source.ImageVector({
                    source: new ol.source.Vector({ useSpatialIndex: false })
                })
            });

            setEditionLayerFeatures(olLayer);
            return olLayer;
        }
            // Create the feature of the edition layer
        function createEditionFeatureInstance(featureDoc) {
            // Compute geometry.
            var geometry = wktFormat.readGeometry(featureDoc.positionDebut);
            if (geometry && featureDoc.positionFin && (featureDoc.positionFin !== featureDoc.positionDebut)) {
                geometry = new ol.geom.LineString([
                    geometry.getFirstCoordinate(),
                    wktFormat.readGeometry(featureDoc.positionFin).getFirstCoordinate()
                ]);
            }
            geometry.transform(SirsDoc.get().epsgCode, 'EPSG:3857');
            // Create feature.
            var feature = new ol.Feature({ geometry: geometry });
                feature.setStyle(RealPositionStyle([0, 0, 255, 1], geometry.getType()));
                feature.set('id', featureDoc._id);
                feature.set('rev', featureDoc._rev);
                feature.set('author', featureDoc.author);
                feature.set('description', featureDoc.description);
                feature.set('designation', featureDoc.designation);
                feature.set('@class', featureDoc['@class']);

            return feature;
        }
        // Create the features of the edition layer that contain the new objects
        function createEditionFeatureInstances(featureDocs) {
            var features = [];
            angular.forEach(featureDocs, function(featureDoc) {
                features.push(createEditionFeatureInstance(featureDoc.doc));
            });
            return features;
        }

        // Set the layer that contains the new objects of the edition mode
        function setEditionLayerFeatures(olLayer) {
            var olSource = olLayer.getSource().getSource();
                // Display only the closed objects
            EditionService.getClosedObjects().then(
                function onSuccess(results) {
                    olSource.clear();
                    olSource.addFeatures(createEditionFeatureInstances(results));
                },
                function onError(error) {
                    // TODO → handle error
                });
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

        function redrawAppLayers() {
            appLayers.getLayers().forEach(function(layer) {
                layer.getSource().changed();
            });
        }

        // Event listeners
        // ----------

        $rootScope.$watch(function() { return selection.active; }, redrawAppLayers);

        $rootScope.$on('databaseChanged', function() {
            backLayers.getLayers().clear();
            backLayers.getLayers().push(createBackLayerInstance(BackLayerService.getActive()));
            appLayers.getLayers().clear();
            appLayers.getLayers().extend(AppLayersService.getFavorites().map(createAppLayerInstance));
        });

        selectInteraction.on('select', function(event) {
            // Update feature properties.
            angular.forEach(selection.list, function(feature) {
                feature.set('selected', false, true);
                feature.set('visited', false, true);
            });
            angular.forEach(event.selected, function(feature) {
                feature.set('selected', true, true);
                feature.set('visited', false, true);
            });

            // Update selection.
            selection.active = undefined;
            if (event.selected.length) {
                selection.list = event.selected;
                SidePanelService.setTribordView('object_selection');
            } else {
                selection.list = [];
                $ionicSideMenuDelegate.isOpenRight() && $ionicSideMenuDelegate.toggleRight();
            }

            // Redraw layers.
            redrawAppLayers();

            // Trigger event.
            $rootScope.$broadcast('objectSelected', event.selected);

            // Force digest.
            $rootScope.$digest();
        });

        $rootScope.$on('backLayerAdded', function(event, layerModel){
            // backLayers.getLayers().push(createBackLayerInstance(layerModel));
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
            // appLayers.setVisible(!isEnabled);
            editionLayer.setVisible(isEnabled);
        });

        $rootScope.$on('editionObjectSaved', function(event, objectDoc) {
            if (objectDoc.positionDebut && objectDoc.positionFin) {
                var source = editionLayer.getSource().getSource(),
                    features = source.getFeatures(), i = features.length;
                while (i--) {
                    if (features[i].get('id') === objectDoc._id) {
                        features.splice(i,1);
                        break;
                    }
                }
                source.addFeature(createEditionFeatureInstance(objectDoc));
            }
        });
    })

    .factory('DefaultStyle', function(selection) {


        function createPointStyleFunc(color,featureModel,layerModel) {
            return function() {
                var f = this;
                var selectedIds = getAllSelectedFeaturesIds(selection.list);
                color[3] = 1;


                //@hb change the color of the selected feature
                if(selection.active){
                    var highlight = shouldHighlight(f),
                        fillColor = highlight ? [255,0,0,1] : [255, 255, 255, color[3]],
                        strokeColor = highlight ? [0, 0, 255, 1] : color,
                        strokeWidth = 2,
                        pointRadius = 6;
                    return [createPointStyle(fillColor, strokeColor, strokeWidth, pointRadius, computeZIndex(f),featureModel,layerModel)];
                }
                else {
                    var highlightAll = shouldHighlightAll(f,selectedIds),
                        fillColor = highlightAll ? [255,0,0,1] : [255, 255, 255, color[3]],
                        strokeColor = highlightAll ? [0, 0, 255, 1] : color,
                        strokeWidth = 2,
                        pointRadius = 6;
                    return [createPointStyle(fillColor, strokeColor, strokeWidth, pointRadius, computeZIndex(f),featureModel,layerModel)];
                }

            };
        }

        function createPointStyle(fillColor, strokeColor, strokeWidth, circleRadius, zIndex,featureModel,layerModel) {

            var fill = new ol.style.Fill({ color: fillColor });
            var stroke = new ol.style.Stroke({ color: strokeColor, width: strokeWidth });
            var circle = new ol.style.Circle({ fill: fill, stroke: stroke, radius: circleRadius });
            if(layerModel){
                if(layerModel.featLabels){
                    //@hb
                    var text = new ol.style.Text({
                        font: 'bold 12px sans-serif',
                        text: featureModel.title ? featureModel.title : featureModel.designation ,
                        offsetY: -12,
                        fill: new ol.style.Fill({color: 'black'}),
                        stroke: new ol.style.Stroke({color: 'white', width: 0.5})
                    });

                    return new ol.style.Style({ image: circle, zIndex: zIndex,text: text });
                }
            }

            return new ol.style.Style({ image: circle, zIndex: zIndex});
        }

        function createLineStyleFunc(color,featureModel,layerModel) {
            return function() {
                color[3] = computeOpacity(this);

                var styles = [],
                    highlight = shouldHighlight2(this),
                    zIndex = computeZIndex(this),
                    strokeColor = color,
                    strokeWidth = 5;
                if (highlight) {
                    styles.push(createLineStyle([255, 255, 255, color[3]], strokeWidth + 4, zIndex,featureModel,layerModel));
                }
                styles.push(createLineStyle(strokeColor, strokeWidth, zIndex,featureModel,layerModel));
                return styles;
            };
        }

        function createLineStyle(strokeColor, strokeWidth, zIndex, featureModel, layerModel) {
            var stroke = new ol.style.Stroke({ color: strokeColor, width: strokeWidth });
            if(layerModel){
                if(layerModel.featLabels){
                    //@hb
                    var text = new ol.style.Text({
                        font: '12px Verdana',
                        text: featureModel.title ? featureModel.title : featureModel.designation,
                        fill: new ol.style.Fill({color: 'black'}),
                        stroke: new ol.style.Stroke({color: 'white', width: 0.5})
                    });
                    return new ol.style.Style({ stroke: stroke, zIndex: zIndex, text: text });
                }
            }

            return new ol.style.Style({ stroke: stroke, zIndex: zIndex });
        }

        function shouldHighlight(feature) {
            return selection.list.length && (selection.active && selection.active === feature);
        }

        function shouldHighlight2(feature) {
            return selection.list.length && ((!selection.active && feature.get('selected')) || (selection.active && selection.active === feature));
        }
        //@hb the function for know all the selected features
        function shouldHighlightAll(feature,selectedIds) {

            if(feature.get('features')===undefined){
                if(selectedIds.indexOf(feature.get('id')) !== -1){
                    return true;
                }
                else {
                    return false;
                }
            }

        }

        function getAllFeaturesIds(arrs){
            var ids=[];
            angular.forEach(arrs,function (arr) {
                ids.push(arr.get('id'));
            });
            return ids;

        }

        function getAllSelectedFeaturesIds(arrs){
            var ids=[];
            angular.forEach(arrs,function (arr) {
                angular.forEach(arr.get('features'),function (f) {
                    ids.push(f.get('id'));
                });
            });
            return ids;
        };


        function computeOpacity(feature) {
            if (selection.active && feature !== selection.active) {
                return 0.5;
            } else if (selection.list.length && !feature.get('selected')) {
                return 0.5;
            } else {
                return 1;
            }
        }

        function computeZIndex(feature) {
            if (feature === selection.active) {
                return 3;
            } else if (feature.get('selected')) {
                return 2;
            } else {
                return 1;
            }
        }

        return function(color, type,featureModel,layerModel) {
            switch (type) {
                case 'LineString':
                case 'MultiLineString':
                    return createLineStyleFunc(color,featureModel,layerModel);
                case 'Point':
                case 'MultiPoint':
                    return createPointStyleFunc(color,featureModel,layerModel);
            }
            return null;
        };
    })

    .factory('RealPositionStyle', function(selection) {

        function createPointStyle(fillColor, strokeColor, strokeWidth, circleRadius, zIndex,featureModel,layerModel) {
            var fill = new ol.style.Fill({ color: fillColor });
            var stroke = new ol.style.Stroke({ color: strokeColor, width: strokeWidth });
            var circle = new ol.style.Circle({ fill: fill, stroke: stroke, radius: circleRadius });

            if(layerModel){
                if(layerModel.featLabels){
                    //@hb
                    var text = new ol.style.Text({
                        font: 'bold 12px sans-serif',
                        text: featureModel.title ? featureModel.title : featureModel.designation,
                        offsetY: -12,
                        fill: new ol.style.Fill({color: 'black'}),
                        stroke: new ol.style.Stroke({color: 'white', width: 0.5})
                    });

                    return new ol.style.Style({ image: circle, zIndex: zIndex,text: text });
                }
            }


            return new ol.style.Style({ image: circle, zIndex: zIndex});
        }

        function createLineStyle(strokeColor, strokeWidth, lineDash, zIndex,featureModel,layerModel) {
            var stroke = new ol.style.Stroke({ color: strokeColor, width: strokeWidth, lineDash: lineDash });

            if(layerModel){
                if(layerModel.featLabels){
                    //@hb
                    var text = new ol.style.Text({
                        font: 'bold 12px sans-serif',
                        text: featureModel.title ? featureModel.title : featureModel.designation,
                        offsetY: -12,
                        fill: new ol.style.Fill({color: 'black'}),
                        stroke: new ol.style.Stroke({color: 'white', width: 0.5})
                    });

                    return new ol.style.Style({ stroke: stroke, zIndex: zIndex,text: text });
                }
            }

            return new ol.style.Style({ stroke: stroke, zIndex: zIndex });
        }

        function createPointStyleFunc(color,featureModel,layerModel) {
            return function() {
                color[3] = computeOpacity(this);

                var highlight = shouldHighlight(this),
                    fillColor = highlight ? color : [255, 255, 255, color[3]],
                    strokeColor = highlight ? [255, 255, 255, color[3]] : color,
                    strokeWidth = 2,
                    circleRadius = 6;
                return [createPointStyle(fillColor, strokeColor, strokeWidth, circleRadius, computeZIndex(this),featureModel,layerModel)];
            };
        }

        function createLineStyleFunc(color,featureModel,layerModel) {
            return function() {
                color[3] = computeOpacity(this);

                var styles = [],
                    highlight = shouldHighlight(this),
                    zIndex = computeZIndex(this),
                    pointFillColor = highlight ? color : [255, 255, 255, color[3]],
                    pointStrokeColor = highlight ? [255, 255, 255, color[3]] : color,
                    pointStrokeWidth = 2,
                    pointCircleRadius = 6,
                    lineStrokeColor = color,
                    lineStrokeWidth = 3;

                // Line style(s).
                if (highlight) {
                    styles.push(createLineStyle([255, 255, 255, color[3]], lineStrokeWidth + 4, [20, 30], zIndex,featureModel,layerModel));
                }
                styles.push(createLineStyle(lineStrokeColor, lineStrokeWidth, [30, 20], zIndex,featureModel,layerModel));

                // Point style.
                var pointStyle = createPointStyle(pointFillColor, pointStrokeColor, pointStrokeWidth, pointCircleRadius, zIndex,featureModel,layerModel);
                pointStyle.setGeometry(function(feature) {
                    return new ol.geom.MultiPoint(feature.getGeometry().getCoordinates());
                });
                styles.push(pointStyle);

                return styles;
            };
        }

        function shouldHighlight(feature) {
            return selection.list.length && ((!selection.active && feature.get('selected')) || (selection.active && selection.active === feature));
        }

        function computeOpacity(feature) {
            if (selection.active && feature !== selection.active) {
                return 0.5;
            } else if (selection.list.length && !feature.get('selected')) {
                return 0.5;
            } else {
                return 1;
            }
        }

        function computeZIndex(feature) {
            if (feature === selection.active) {
                return 3;
            } else if (feature.get('selected')) {
                return 2;
            } else {
                return 1;
            }
        }


        return function(color, type,featureModel,layerModel) {
            switch (type) {
                case 'LineString':
                    return createLineStyleFunc(color,featureModel,layerModel);
                case 'Point':
                    return createPointStyleFunc(color,featureModel,layerModel);
            }
            return null;
        };
    });