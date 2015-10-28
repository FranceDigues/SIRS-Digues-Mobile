angular.module('module_app.controllers.babord_menu', [])

    .controller('BabordMenuController', function cBabordMenu($location, sContext, ContextService, GeolocationService, EditionService) {

        var self = this;

        self.settings = ContextService.getValue().settings;

        self.sContext = sContext;

        (self.updateGeolocation = function() {
            if (self.settings.geolocation) {
                GeolocationService.start();
            } else {
                GeolocationService.stop();
            }
        })();

        self.sEdition = EditionService;

        self.setView = function(menu) {
            switch (menu.target) {

                // Display the view in a new page.
                case 'main':
                    $location.path('/' + menu.file);
                    break;

                // Display the view in the babord menu.
                case 'babord':
                    sContext.setBabordView(menu);
                    break;
            }
        };
    });
