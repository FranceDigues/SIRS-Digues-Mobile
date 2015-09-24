angular.module('module_app.controllers.setup', ['module_app.services.context'])

    .controller('SetupController', function SetupController($location, DsService, AuthService) {

        var self = this;


        self.remotes = DsService.getRemotes();

        self.selected = DsService.getActiveRemote() || self.remotes[0];

        self.remove = function() {
            if (!self.selected) {
                return;
            }

            DsService.removeRemote(self.selected).then(function(removed) {
                if (removed) {
                    self.selected = self.remotes[0];
                }
            });
        };

        self.replicate = function() {
            if (!self.selected) {
                return;
            }

            DsService.setActiveRemote(self.selected.name);

            if (!self.selected.replicated) {
                $location.path('/replicate');
            } else if (AuthService.isNull()) {
                $location.path('/login');
            } else {
                $location.path('/home');
            }
        };
    });