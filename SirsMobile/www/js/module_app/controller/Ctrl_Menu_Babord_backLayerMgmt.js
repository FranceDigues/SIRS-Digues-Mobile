angular.module('module_app.controllers.menus.babord.backLayerMgmt', [])

    .controller('BackLayerController', function BackLayerController($location, BackLayerService, sContext) {

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
            sContext.setBabordView({ target: 'babord', file: 'menu' });
        };

        self.goToCache = function() {
            $location.path('/geoCache');
        };

        self.goToAddLayer = function() {
            sContext.setBabordView({ target: 'babord', file: 'addBackLayer' });
        };
    });


