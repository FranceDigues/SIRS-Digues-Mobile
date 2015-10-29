angular.module('module_app.controllers.back_layers', ['module_app.services.context'])

    .controller('BackLayersController', function BackLayersController($location, BackLayerService, SidePanelService) {

        var self = this;


        self.sLayer = BackLayerService;


        self.useLayer = function(layer) {
            BackLayerService.setActive(layer.name);
        };

        self.removeLayer = function(layer) {
            var isCurrent = (layer === BackLayerService.getActive());
            BackLayerService.remove(layer).then(function(removed) {
                if (removed && isCurrent) {
                    self.useLayer(self.available[0]);
                }
            });
        };

        self.backToMenu = function() {
            SidePanelService.setBabordView('menu');
        };

        self.goToCache = function(layer) {
            $location.path('/cache/' + layer.name);
        };

        self.goToAddLayer = function() {
            SidePanelService.setBabordView('back_layers_add');
        };
    })

    .controller('BackLayersAddController', function BackLayersAddController(BackLayerService, SidePanelService) {

        var self = this;


        self.serviceTypes = [
            { label: 'WMS', value: 'TileWMS' },
            { label: 'XYZ', value: 'XYZ' }
        ];

        self.name = null;

        self.source = { type: 'TileWMS', url: 'http://', params: { version: '1.3.0' } };

        self.prepareType = function() {
            switch (self.source.type) {
                case 'TileWMS':
                    self.source.params = { version: '1.3.0' };
                    break;
                default:
                    delete self.source.params;
            }
        };

        self.add = function() {
            BackLayerService.add({ type: 'Tile', name: self.name, source: self.source });
            self.backToList();
        };

        self.backToList = function() {
            SidePanelService.setBabordView('back_layers');
        };
    });