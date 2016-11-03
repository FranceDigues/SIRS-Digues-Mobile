angular.module('app.controllers.object_add', ['app.services.dao'])

    .controller('ObjectAddController', function ObjectAddController($filter, $location, $ionicScrollDelegate,
                                                                    LocalDocument, AuthService, GeolocationService,
                                                                    EditionService, AppLayersService,$scope, $rootScope) {

        var self = this;


        self.tab = 'layers';

        self.allLayers = AppLayersService.getFavorites();

        self.closable = [];

        self.selectedLayer = undefined;

        self.selectedClosable = undefined;

        // Get the closable objects
        var getClosable = function() {
            return EditionService.getClosableObjects().then(function(results) {
                self.closable = results.map(function(row) {
                    return row.doc;
                });
            });

        };


        self.setTab = function(name) {
            if (name !== self.tab) {
                self.tab = name;
                $ionicScrollDelegate.$getByHandle('editScroll').scrollTop(false);
            }
        };

        // Add the new object
        self.newObject = function() {
            if (angular.isDefined(self.selectedLayer)) {
                $rootScope.loadingflag = true;
                var type = self.selectedLayer.filterValue.substring(
                    self.selectedLayer.filterValue.lastIndexOf('.') + 1); // TODO → improve type detection
                $location.path('/object/' + encodeURIComponent(type));
            }
        };

        self.closeObject = function() {
            if (angular.isDefined(self.selectedClosable)) {
                var type = self.selectedClosable['@class'].substring(
                    self.selectedClosable['@class'].lastIndexOf('.') + 1); // TODO → improve type detection
                $location.path('/object/' + encodeURIComponent(type) + '/' + self.selectedClosable._id);
            }
        };
        // The methode for delete the object created
        self.deleteObject = function(){
            // console.log(self.selectedClosable);
            if (angular.isDefined(self.selectedClosable)) {
                LocalDocument.remove(self.selectedClosable);
                getClosable();
            }
        };
        // Get the closable object for the first time
        getClosable();
    });