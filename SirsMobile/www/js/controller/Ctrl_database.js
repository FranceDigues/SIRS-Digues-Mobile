angular.module('app.controllers.database', ['app.services.context'])
    .factory('dataBaseEditionFactory',function dataBaseEditionFactory() {
      return {
          oldDb: {}
      }
    })
    .controller('DatabaseController', function DatabaseController($location, DatabaseService, AuthService,dataBaseEditionFactory) {

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
                $location.path('/main');
            }
        };

        //@hb
        self.edition = function(){
            if (self.selected) {
                dataBaseEditionFactory.oldDb = self.selected;
                $location.path('/database_edition');
            }
        };
    })

    .controller('DatabaseAddController', function DatabaseAddController($location, DatabaseService) {

        var self = this;

        self.db = {
            name: null,
            url: 'http://',
            username: null,
            password: null,
            replicated: false,
            favorites: []
        };

        self.add = function() {
            DatabaseService.add(self.db);
            $location.path('/setup');
        };
    })
    .controller('DatabaseEditionController', function DatabaseAddController($location, DatabaseService, dataBaseEditionFactory) {

        var self = this;

        self.db = dataBaseEditionFactory.oldDb;

        self.update = function() {
            DatabaseService.oldEditionRemove(dataBaseEditionFactory.oldDb);
            DatabaseService.add(self.db);
            $location.path('/setup');
        };
    });

