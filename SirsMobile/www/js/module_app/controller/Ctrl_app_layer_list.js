angular.module('module_app.controllers.appLayerList', [])

    .controller('AppLayerListController', function AddBackLayerController(AppLayersService, sContext) {

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


