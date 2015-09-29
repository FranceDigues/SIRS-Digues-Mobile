angular.module('module_app.controllers.setup', ['module_app.services.context'])

    .controller('SetupController', function SetupController($location, DatabaseService, AuthService) {

        var self = this;


        self.available = DatabaseService.list();

        self.selected = DatabaseService.getActive() || self.available[0];

        self.remove = function() {
            if (!self.selected) {
                return;
            }

            DatabaseService.remove(self.selected).then(function(removed) {
                if (removed) {
                    self.selected = self.available[0];
                }
            });
        };

        self.replicate = function() {
            if (!self.selected) {
                return;
            }

            DatabaseService.setActive(self.selected.name);

            if (!self.selected.replicated) {
                $location.path('/replicate');
            } else if (AuthService.isNull()) {
                $location.path('/login');
            } else {
                $location.path('/home');
            }
        };
    });