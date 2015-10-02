angular.module('module_app.services.map', ['module_app.services.context'])

    .constant('defaultView', {
        zoom: 8,
        center: ol.proj.transform([3.5, 43.5], 'CRS:84', 'EPSG:3857')
    })
    
    .factory('currentView', function(defaultView) {
        return new ol.View(defaultView);
    })

    .service('MapService', function MapService($rootScope, olMap, BackLayerService, AppLayersService, currentView) {

        var self = this;

        var selectInteraction = new ol.interaction.LongClickSelect({
            circleStyle: new ol.style.Style({
                fill: new ol.style.Fill({ color: [255, 165, 0, 0.25] }),
                stroke: new ol.style.Stroke({ color: [255, 165, 0, 1], width: 2 })
            })
        });


        self.buildConfig = function() {
            var layers = [];

            // Background layer.
            layers.push(createBackLayer(BackLayerService.getActive()));

            // Application layers.
            angular.forEach(AppLayersService.getFavorites(), function(layerModel) {
                layers.push(createAppLayer(layerModel));
            });

            return {
                view: currentView,
                layers: layers,
                controls: [],
                interactions: ol.interaction.defaults({
                    altShiftDragRotate: false,
                    shiftDragZoom: false
                }).extend([selectInteraction])
            };
        };

        self.setBackLayer = function(newLayer) {
            var map = olMap.get('main');
            var layers = map.getLayers();

            // Remove current background layer.
            map.removeLayer(layers.item(0));

            // Add new background layer.
            layers.insertAt(0, createBackLayer(newLayer));

            // Save modification in context.
            BackLayerService.setActive(newLayer.name);
        };


        function createBackLayer(layerModel) {
            var options = angular.copy(layerModel);
            options.source = new ol.source[layerModel.source.type](layerModel.source);
            return new ol.layer[layerModel.type](options);
        }

        function createAppLayer(layerModel) {
            return new ol.layer.Vector({
                name: layerModel.title,
                model: layerModel,
                source: new ol.source.Vector({ useSpatialIndex: false })
            });
        }


        $rootScope.$on('appLayerAdded', function(event, layerModel) {
            var map = olMap.get('main');
            if (map instanceof ol.Map) {
                map.getLayers().push(createAppLayer(layerModel));
            }
        });

        $rootScope.$on('appLayerRemoved', function(event, layerModel, index) {
            var map = olMap.get('main');
            if (map instanceof ol.Map) {
                map.getLayers().removeAt(index + 1); // +1 for background layer
            }
        });
    });