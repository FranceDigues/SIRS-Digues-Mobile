angular.module('module_app.controllers.setup', ['module_app.services.context'])

    .controller('SetupController', function SetupController($location, DsService) {

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
            if (self.selected) {
                return;
            }

            DsService.setActiveRemote(self.selected.name);
            $location.path('/replication');
        };
    });