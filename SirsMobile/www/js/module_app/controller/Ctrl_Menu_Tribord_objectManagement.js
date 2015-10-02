angular.module('module_app.controllers.menus.tribord.objectManagement', [])

    .controller('ObjectManagementController', function ObjectManagementController($filter, $location, $ionicScrollDelegate, LocalDocument, AuthService, GeolocationService, EditionService, sAppLayer) {

        var self = this;

        self.tab = 'layers';

        self.allLayers = sAppLayer.leaves;

        self.closable = [];

        self.selectedLayer = undefined;

        self.selectedClosable = undefined;

        self.setTab = function(name) {
            if (name !== self.tab) {
                self.tab = name;
                $ionicScrollDelegate.$getByHandle('editScroll').scrollTop(false);
            }
        };

        self.newObject = function() {
            if (angular.isDefined(self.selectedLayer)) {
                var type = self.selectedLayer.filterValue.substring(
                    self.selectedLayer.filterValue.lastIndexOf('.') + 1); // TODO → improve type detection
                $location.path('/edition/' + encodeURIComponent(type));
            }
        };

        self.closeObject = function() {
            if (angular.isDefined(self.selectedClosable)) {
                var type = self.selectedClosable['@class'].substring(
                    self.selectedClosable['@class'].lastIndexOf('.') + 1); // TODO → improve type detection
                $location.path('/edition/' + encodeURIComponent(type) + '/' + self.selectedClosable._id);
            }
        };


        EditionService.getClosableObjects().then(function(result) {
            self.closable = result;
        });
    });