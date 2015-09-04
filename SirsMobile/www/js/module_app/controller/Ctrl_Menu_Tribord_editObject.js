angular.module('module_app.controllers.menus.tribord.editObject', [])

    .controller('EditObjectController', function cForm($filter, $state, $ionicScrollDelegate, sAppLayer) {

        var self = this;

        self.activeTab = 'layers';

        self.allLayers = sAppLayer.leaves;

        self.selectedLayer = undefined;

        self.setActiveTab = function(name) {
            if (name !== self.activeTab) {
                self.activeTab = name;
                $ionicScrollDelegate.$getByHandle('editScroll').scrollTop(false);
            }
        };

        self.newObject = function() {
            if (angular.isDefined(self.selectedLayer)) {
                $state.go('objectForm', { type: self.selectedLayer.type });
            }
        };
    });