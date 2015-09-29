angular.module('module_app.controllers.new_db', ['module_app.services.context'])

    .controller('NewDatabaseController', function NewDatabaseController($location, DatabaseService) {

        var self = this;


        self.db = {
            name: null,
            url: 'http://',
            username: null,
            password: null
        };

        self.add = function() {
            DatabaseService.add(self.db);
            $location.path('/setup');
        };
    });