angular.module('module_app.controllers.app_layers', ['module_app.services.context'])

    .controller('AppLayersController', function AppLayersController($location, AppLayersService, MapManager, sContext) {

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
            sContext.setBabordView({ target: 'babord', file: 'menu' });
        };

        self.goToLayerList = function() {
            sContext.setBabordView({ target: 'babord', file: 'appLayerList' });
        };
    })

    .controller('AppLayerListController', function AppLayerListController(AppLayersService, sContext) {

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
            sContext.setBabordView({ target: 'babord', file: 'appLayerMgmt' });
        };


        AppLayersService.getAvailable().then(function(layers) {
            self.available = layers;
        });
    });