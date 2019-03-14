angular.module('app.controllers.cache', [])

    .service('CacheMapManager', function CacheMapManager($routeParams, BackLayerService, currentView) {

        var self = this;

        var targetLayer = new ol.layer.Tile({
            name: 'Target'
        });

        var previousAreaLayer = new ol.layer.Vector({
            name: 'Previous Area',
            source: new ol.source.Vector(),
            style: [
                new ol.style.Style({
                    fill: new ol.style.Fill({color: [255, 0, 0, 0.1]}),
                    stroke: new ol.style.Stroke({color: [255, 0, 0, 1], width: 2})
                }),
                new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 5,
                        fill: new ol.style.Fill({color: [255, 0, 0, 1]})
                    }),
                    geometry: function (feature) {
                        // return the coordinates of the first ring of the polygon
                        var coordinates = feature.getGeometry().getCoordinates()[0];
                        return new ol.geom.MultiPoint(coordinates);
                    }
                })
            ]
        });

        var currentAreaLayer = new ol.layer.Vector({
            name: 'Current Area',
            source: new ol.source.Vector(),
            style: [
                new ol.style.Style({
                    fill: new ol.style.Fill({color: [0, 0, 255, 0.1]}),
                    stroke: new ol.style.Stroke({color: [0, 0, 255, 1], width: 2})
                }),
                new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 5,
                        fill: new ol.style.Fill({color: [0, 0, 255, 1]})
                    }),
                    geometry: function (feature) {
                        // return the coordinates of the first ring of the polygon
                        var coordinates = feature.getGeometry().getCoordinates()[0];
                        return new ol.geom.MultiPoint(coordinates);
                    }
                })
            ]
        });


        function createFeatureInstance(extent) {
            return new ol.Feature({geometry: ol.geom.Polygon.fromExtent(extent)});
        }


        self.buildConfig = function () {
            return {
                view: currentView,
                layers: [targetLayer, previousAreaLayer, currentAreaLayer],
                controls: [
                    new ol.control.ScaleLine({
                        minWidth: 100
                    })
                ],
                interactions: ol.interaction.defaults({
                    altShiftDragRotate: false,
                    shiftDragZoom: false
                })
            };
        };

        self.setTargetLayer = function (layerModel) {
            targetLayer.setSource(new ol.source[layerModel.source.type](layerModel.source));

            if (angular.isObject(layerModel.cache)) {
                previousAreaLayer.getSource().addFeature(createFeatureInstance(layerModel.cache.extent));
            }
        };

        self.clearTargetLayer = function () {
            targetLayer.setSource(null);
            previousAreaLayer.getSource().clear();
            currentAreaLayer.getSource().clear();
        };

        self.setCurrentArea = function (extent) {
            currentAreaLayer.getSource().clear();
            if (angular.isArray(extent)) {
                currentAreaLayer.getSource().addFeature(createFeatureInstance(extent));
            }
        };

        self.getCurrentArea = function () {
            var feature = currentAreaLayer.getSource().getFeatures()[0];
            if (feature instanceof ol.Feature) {
                return feature.getGeometry().getExtent();
            }
            return null;
        };

        self.countTiles = function (minZoom, maxZoom) {

            var tileGrid;

            tileGrid = targetLayer.getSource().getTileGrid();

            var extent = self.getCurrentArea(), tileCount = 0;

            // In the case the tileGrid not exist use the default tileGrid
            if (!tileGrid) {
                var projExtent = ol.proj.get('EPSG:3857').getExtent();
                var startResolution = ol.extent.getWidth(projExtent) / 256;
                var resolutions = new Array(22);
                for (var i = 0, ii = resolutions.length; i < ii; ++i) {
                    resolutions[i] = startResolution / Math.pow(2, i);
                }
                tileGrid = new ol.tilegrid.TileGrid({
                    origin: [0, 0],
                    resolutions: resolutions
                });
            }

            for (var z = minZoom; z <= maxZoom; z++) {
                var tileRange = tileGrid.getTileRangeForExtentAndZ(extent, z);
                tileCount += (tileRange.getWidth() * tileRange.getHeight())
            }

            return tileCount;
        };
    })

    .controller('CacheController', function CacheController($scope, $timeout, $routeParams, $location,
                                                            CacheMapManager, MapManager, BackLayerService, olMap, currentView) {

        var self = this;

        var layerModel = BackLayerService.getByName($routeParams.layer);

        var lastZoom = currentView.getZoom();


        function onCenterChanged(event) {
            if (self.selectedCorner) {
                var extent = CacheMapManager.getCurrentArea(),
                    center = event.target.getCenter();
                switch (self.selectedCorner) {
                    case 'tl':
                        extent[0] = center[0];
                        extent[3] = center[1];
                        break;
                    case 'bl':
                        extent[0] = center[0];
                        extent[1] = center[1];
                        break;
                    case 'br':
                        extent[2] = center[0];
                        extent[1] = center[1];
                        break;
                    case 'tr':
                        extent[2] = center[0];
                        extent[3] = center[1];
                        break;
                }
                CacheMapManager.setCurrentArea(extent);
                $timeout(self.updateTileCount);
            }
        }

        function onResolutionChanged() {
            $scope.$digest();
        }


        self.minZoom = angular.isObject(layerModel.cache) ?
            layerModel.cache.minZoom : 7;

        self.maxZoom = angular.isObject(layerModel.cache) ?
            layerModel.cache.maxZoom : 16;

        self.tileCount = 0;

        self.selectedCorner = null;

        self.setDefaultArea = function (map) {
            if (angular.isObject(layerModel.cache)) {
                // Use previous area.
                CacheMapManager.setCurrentArea(layerModel.cache.extent);
                currentView.fit(layerModel.cache.extent, map.getSize());
            } else {
                // Create default area.
                var extent = map.getView().calculateExtent(map.getSize());
                var wDelta = ol.extent.getWidth(extent) / 10;
                var hDelta = ol.extent.getHeight(extent) / 10;
                extent[0] = extent[0] + wDelta;
                extent[1] = extent[1] + hDelta;
                extent[2] = extent[2] - wDelta;
                extent[3] = extent[3] - hDelta;
                CacheMapManager.setCurrentArea(extent);
            }

            // Compute the number of tiles.
            self.updateTileCount();
        };

        self.editCorner = function (corner) {
            if (corner === self.selectedCorner) {
                self.selectedCorner = null;
            } else {
                self.selectedCorner = corner;

                // Center view on target corner.
                var extent = CacheMapManager.getCurrentArea(),
                    center;
                switch (corner) {
                    case 'tl':
                        center = [extent[0], extent[3]];
                        break;
                    case 'bl':
                        center = [extent[0], extent[1]];
                        break;
                    case 'br':
                        center = [extent[2], extent[1]];
                        break;
                    case 'tr':
                        center = [extent[2], extent[3]];
                        break;
                }
                currentView.setCenter(center);
            }
        };

        self.updateTileCount = function () {
            self.tileCount = CacheMapManager.countTiles(self.minZoom, self.maxZoom);
        };

        self.getCurrentZoom = function () {
            var zoom = currentView.getZoom();
            if (angular.isDefined(zoom)) {
                lastZoom = zoom;
            }
            return lastZoom;
        };

        self.validate = function () {
            var extent = CacheMapManager.getCurrentArea();

            // Update layer model and force update.
            layerModel.cache = {
                minZoom: self.minZoom,
                maxZoom: self.maxZoom,
                extent: extent,
                url: cordova.file.externalDataDirectory + 'tiles/' + layerModel.name + '/{z}/{x}/{y}.png'
            };
            MapManager.syncBackLayer();

            // Run cache plugin task.
            extent = ol.proj.transformExtent(extent, 'EPSG:3857', 'EPSG:4326');

            CacheMapPlugin.updateCache([{
                name: layerModel.name,
                layerSource: null,
                typeSource: layerModel.source.type,
                zMin: self.minZoom,
                zMax: self.maxZoom,
                urlSource: layerModel.source.url,
                bbox: [[extent[1], extent[0]], [extent[3], extent[2]]]
            }]);

            $location.path('/main');
        };


        CacheMapManager.setTargetLayer(layerModel);

        currentView.on('change:center', onCenterChanged);

        currentView.on('change:resolution', onResolutionChanged);

        $scope.$on('$destroy', function () {
            CacheMapManager.clearTargetLayer();
            currentView.un('change:center', onCenterChanged);
            currentView.un('change:resolution', onResolutionChanged);
        });
    });