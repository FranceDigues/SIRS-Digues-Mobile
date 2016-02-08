angular.module('app.controllers.menu', [])

    .controller('MenuController', function BabordMenuController(ContextService, GeolocationService, EditionService, SidePanelService, currentView) {

        var self = this;

        self.settings = ContextService.getValue().settings;

        (self.updateGeolocation = function(centerOn) {
            if (self.settings.geolocation) {
                var promise = GeolocationService.start();
                if (centerOn !== false) {
                    promise.then(centerOnLocation);
                }
            } else {
                GeolocationService.stop();
            }
        })(false);

        self.sEdition = EditionService;

        self.setBabordView = SidePanelService.setBabordView;


        function centerOnLocation(location) {
            var coors = location.coords,
                center = ol.proj.transform([coors.longitude, coors.latitude], 'EPSG:4326', 'EPSG:3857');
            currentView.setCenter(center);
            currentView.setZoom(16);
        }
    });
