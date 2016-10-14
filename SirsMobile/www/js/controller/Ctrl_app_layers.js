angular.module('app.controllers.app_layers', ['app.services.context','app.services.colors'])

    .controller('AppLayersController', function AppLayersController($scope,
                                                                    $location, AppLayersService,
                                                                    SidePanelService, MapManager,
                                                                    $ionicModal, $ionicSideMenuDelegate,
                                                                    $rootScope, $timeout,colorsFactory,$filter) {

        var self = this;

        self.layers = $filter('orderBy')(AppLayersService.getFavorites(),'title');

        self.layerColor = function(layer) {
            return 'rgb(' + layer.color[0] + ',' + layer.color[1] + ',' + layer.color[2] + ')';
        };

        self.move = function(from, to) {
            if (from !== to) {
                self.layers.splice(to, 0, self.layers.splice(from, 1)[0]);
                MapManager.moveAppLayer(from, to);
            }
        };

        self.toggleVisibility = function(layer) {
            layer.visible = !layer.visible;
            MapManager.syncAppLayer(layer);
        };

        self.togglePosition = function(layer) {
            layer.realPosition = !layer.realPosition;
            MapManager.syncAppLayer(layer);
        };

        self.backToMenu = function() {
            SidePanelService.setBabordView('menu');
        };

        self.goToLayerList = function() {
            SidePanelService.setBabordView('app_layers_select');
        };

        // @hb
        self.colors = colorsFactory.colors;


        self.selectedLayer;

        self.selectedColor;

        self.selectedElement;

        // @hb
        self.featureLabels = function(layer){
            $rootScope.flag = true;

            $timeout(function(){
                MapManager.addLabelFeatureLayer(layer);
            },1000);
        };

        // @hb
        $ionicModal.fromTemplateUrl('color-modal.html', {
            scope: $scope,
            animation: 'slide-in-up',
            backdropClickToClose: false
        }).then(function(modal) {
            self.colorModal = modal;
        });

        // @hb
        self.openColorModal = function(layer) {
            $rootScope.flag= true;
            // $ionicSideMenuDelegate.toggleLeft();
            colorsFactory.selectedLayer = layer;
            self.colorModal.show();
        };
        // @hb
        self.closeColorModal = function() {
            clearColorChoose();
            self.colorModal.hide();
            $rootScope.flag = false;
        };
        // @hb
        self.calculateBackGroundColor = function (color) {
            return color.hex;
        };

        // @hb
        var changeColor = function(colArr){
            colorsFactory.selectedLayer.color[0] = colArr[0];
            colorsFactory.selectedLayer.color[1] = colArr[1];
            colorsFactory.selectedLayer.color[2] = colArr[2];
        };

        var clearColorChoose = function() {
            colorsFactory.selectedColor = undefined;
            if(colorsFactory.selectedElement) {
                colorsFactory.selectedElement.removeClass('active');
            }
            colorsFactory.selectedElement = undefined;
        };

        //@hb
        self.chooseColor = function (){
            if(colorsFactory.selectedColor){
                // Change the color of the selected layer
                changeColor(colorsFactory.selectedColor);
                // Update the change to the view
                    MapManager.reloadLayer(colorsFactory.selectedLayer);
                //Close the Modal after the change
                self.colorModal.hide();
                clearColorChoose();
            }

        };

        self.selectColor = function (color,e) {
            clearColorChoose();
            colorsFactory.selectedColor = color;
            colorsFactory.selectedElement = angular.element(e.target);
            colorsFactory.selectedElement.addClass('active');
        };





    })

    .controller('AppLayersSelectController', function AppLayersSelectController(AppLayersService, SidePanelService, $filter) {

        var self = this;


        self.available = [];

        self.isActive = function(layer) {
            return AppLayersService.getFavorites().map(function(item) {
                return item.title;
            }).indexOf(layer.title) !== -1;
        };

        self.toggleLayer = function(layer) {
            if (self.isActive(layer)) {
                AppLayersService.removeFavorite(layer);
            } else {
                AppLayersService.addFavorite(layer);
            }
        };

        self.backToList = function() {
            SidePanelService.setBabordView('app_layers');
        };


        AppLayersService.getAvailable().then(function(layers) {
            self.available = $filter('orderBy')(layers,'title');
        });
    });