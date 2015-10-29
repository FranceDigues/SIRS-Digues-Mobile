angular.module('module_app.controllers.menu', [])

    .controller('MenuController', function BabordMenuController(ContextService, GeolocationService, EditionService, SidePanelService) {

        var self = this;

        self.settings = ContextService.getValue().settings;

        (self.updateGeolocation = function() {
            if (self.settings.geolocation) {
                GeolocationService.start();
            } else {
                GeolocationService.stop();
            }
        })();

        self.sEdition = EditionService;

        self.setBabordView = SidePanelService.setBabordView;
    });
