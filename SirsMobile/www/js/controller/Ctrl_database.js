angular.module('app.controllers.database', ['app.services.context'])
    .factory('dataBaseEditionFactory', function dataBaseEditionFactory() {
        return {
            oldDb: null,
            updated: false
        };
    })
    .controller('DatabaseController', function DatabaseController($location, DatabaseService, AuthService, dataBaseEditionFactory) {

        var self = this;

        self.available = DatabaseService.list();

        self.selected = DatabaseService.getActive() || self.available[0];

        self.remove = function () {
            if (!self.selected) {
                return;
            }

            DatabaseService.remove(self.selected).then(function (removed) {
                if (removed) {
                    self.selected = self.available[0];
                    dataBaseEditionFactory.updated = false;
                }
            });
        };

        self.replicate = function () {
            if (!self.selected) {
                return;
            }

            DatabaseService.setActive(self.selected.name, dataBaseEditionFactory.updated);

            if (!self.selected.replicated) {
                $location.path('/replicate');
            } else if (AuthService.isNull()) {
                $location.path('/login');
            } else {
                $location.path('/main');
            }
        };

        self.edition = function () {
            if (self.selected) {
                dataBaseEditionFactory.oldDb = self.selected;
                dataBaseEditionFactory.updated = false;
                $location.path('/database_edition');
            }
        };

        self.selectDB = function (db) {
            dataBaseEditionFactory.updated = false;
            self.selected = db;
        };
    })

    .controller('DatabaseAddController', function DatabaseAddController($location, DatabaseService, dataBaseEditionFactory) {

        var self = this;

        self.db = {
            name: null,
            url: 'http://',
            username: null,
            password: null,
            replicated: false,
            favorites: []
        };

        self.add = function () {
            DatabaseService.add(self.db);
            dataBaseEditionFactory.updated = false;
            $location.path('/setup');
        };
    })
    .controller('DatabaseEditionController', function DatabaseAddController($location, DatabaseService, dataBaseEditionFactory) {

        var self = this;

        self.db = dataBaseEditionFactory.oldDb;

        self.update = function () {
            dataBaseEditionFactory.updated = true;
            $location.path('/setup');
        };
    });

