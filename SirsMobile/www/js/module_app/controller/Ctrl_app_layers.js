angular.module('module_app.controllers.app_layers', ['module_app.services.context'])

    .controller('AppLayersController', function AppLayersController($location, AppLayersService, SidePanelService, MapManager) {

        var self = this;


        self.layers = AppLayersService.getFavorites();

        self.layerColor = function(layer) {
            return 'rgb(' + layer.color[0] + ',' + layer.color[1] + ',' + layer.color[2] + ')';
        };

        self.toggleVisibility = function(layer) {
            layer.visible = !layer.visible;
            MapManager.syncAppLayer(layer);
        };

        self.backToMenu = function() {
            SidePanelService.setBabordView('menu');
        };

        self.goToLayerList = function() {
            SidePanelService.setBabordView('app_layers_select');
        };
    })

    .controller('AppLayersSelectController', function AppLayersSelectController(AppLayersService, SidePanelService) {

        var self = this;


        self.available = [];

        self.isActive = function(layer) {
            return AppLayersService.getFavorites().map(function(item) {
                    return item.title;
                }).indexOf(layer.title) !== -1;
        };

        self.toggleLayer = function(layer) {
            if (self.isActive(layer)) {
                AppLayersService.removeFavorite(layer);
            } else {
                AppLayersService.addFavorite(layer);
            }
        };

        self.backToList = function() {
            SidePanelService.setBabordView('app_layers');
        };


        AppLayersService.getAvailable().then(function(layers) {
            self.available = layers;
        });
    });