angular.module('module_app.controllers.new_db', ['module_app.services.context'])

    .controller('NewDatabaseController', function NewDatabaseController($location, DsService) {

        var self = this;


        self.db = {
            name: null,
            url: 'http://',
            username: null,
            password: null
        };

        self.add = function() {
            DsService.addRemote(self.db);
            $location.path('/setup');
        };
    });