angular.module('module_app.controllers.menus.tribord.objectManagement', [])

    .service('PouchObject', function PouchUser(sPouch, PouchHelper) {

        var self = this;

        self.get = function(id) {
            return sPouch.localDb.get(id);
        };

        self.save = function(doc) {
            return sPouch.localDb.put(doc);
        };

        self.create = function(doc) {
            return PouchHelper.create(doc);
        };

        self.remove = function(doc) {
            return sPouch.localDb.remove(doc);
        };
    })

    .controller('ObjectManagementController', function ObjectManagementController($filter, $location, $ionicScrollDelegate, sAppLayer) {

        var self = this;

        self.tab = 'layers';

        self.allLayers = sAppLayer.leaves;

        self.selectedLayer = undefined;

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
    });