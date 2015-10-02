angular.module('module_app.controllers.appLayers', ['module_app.services.context'])

    .controller('AppLayersController', function AppLayersController($location, AppLayersService, sContext, sStyleFactory) {

        var self = this;


        self.layers = AppLayersService.getFavorites();

        self.getLayerColor = function(index) {
            var rgba = sStyleFactory.getColorAtIndex(index);
            return 'rgb(' + rgba[0] + ',' + rgba[1] + ',' + rgba[2] + ')';
        };

        self.backToMenu = function() {
            sContext.setBabordView({ target: 'babord', file: 'menu' });
        };

        self.goToLayerList = function() {
            sContext.setBabordView({ target: 'babord', file: 'appLayerList' });
        };
    });