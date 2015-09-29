angular.module('module_app.services.map', ['module_app.services.context'])
    
    .constant('defaultView', { 
        zoom: 8, 
        center: ol.proj.transform([3.5, 43.5], 'CRS:84', 'EPSG:3857') 
    })

    .value('selectInteraction', new ol.interaction.LongClickSelect({
        circleStyle: new ol.style.Style({
            fill: new ol.style.Fill({
                color: [255, 165, 0, 0.25]
            }),
            stroke: new ol.style.Stroke({
                color: [255, 165, 0, 1],
                width: 2
            })
        }),
        maxRadius: 100
    }))
    
    .factory('currentView', function(defaultView) {
        return new ol.View(defaultView);
    })

    .service('MapService', function MapService(BackLayerService, olMap, currentView, selectInteraction) {

        var self = this;


        self.buildConfig = function() {
            var layers = [];
            layers.push(createLayerInstance(BackLayerService.getActive()));

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
            layers.insertAt(0, createLayerInstance(newLayer));

            // Save modification in context.
            BackLayerService.setActive(newLayer.name);
        };


        function createLayerInstance(layerModel) {
            var options = angular.copy(layerModel);
            options.source = new ol.source[layerModel.source.type](layerModel.source);
            return new ol.layer[layerModel.type](options);
        }
    });