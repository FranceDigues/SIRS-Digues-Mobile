angular.module('module_app.controllers.appLayers', ['module_app.services.context'])

    .controller('AppLayersController', function AppLayersController($location, AppLayersService, MapManager, sContext, sStyleFactory) {

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
    });