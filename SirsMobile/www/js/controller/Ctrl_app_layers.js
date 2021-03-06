angular.module('app.controllers.app_layers', ['app.services.context', 'app.services.colors'])

    .controller('AppLayersController', function AppLayersController($scope,
                                                                    $location, AppLayersService,
                                                                    SidePanelService, MapManager, featureCache,
                                                                    $ionicModal, $ionicSideMenuDelegate,
                                                                    $rootScope, $timeout, colorsFactory) {

        var self = this;

        var layersTemp = Object.assign([], AppLayersService.getFavorites());

        self.layers = layersTemp.reverse();

        self.layerColor = function (layer) {
            return 'rgb(' + layer.color[0] + ',' + layer.color[1] + ',' + layer.color[2] + ')';
        };

        self.move = function (from, to) {
            var aux = self.layers[from];
            self.layers[from] = self.layers[to];
            self.layers[to] = aux;
            MapManager.moveAppLayer((self.layers.length - (from + 1)), (self.layers.length - (to + 1)));
            self.clearAll();
            var tempLayersAfterSort = Object.assign([], self.layers);
            AppLayersService.setFavorites(tempLayersAfterSort.reverse());
        };

        self.toggleVisibility = function (layer) {
            layer.visible = !layer.visible;
            MapManager.syncAppLayer(layer);
        };

        self.togglePosition = function (layer) {
            layer.realPosition = !layer.realPosition;
            MapManager.syncAppLayer(layer);
        };

        self.backToMenu = function () {
            SidePanelService.setBabordView('menu');
        };

        self.goToLayerList = function () {
            SidePanelService.setBabordView('app_layers_select');
        };

        self.colors = colorsFactory.colors;

        self.featureLabels = function (layer) {
            $rootScope.loadingflag = true;
            $timeout(function () {
                MapManager.addLabelFeatureLayer(layer);
            }, 1000);
        };

        $ionicModal.fromTemplateUrl('color-modal.html', {
            scope: $scope,
            animation: 'slide-in-up',
            backdropClickToClose: false
        }).then(function (modal) {
            self.colorModal = modal;
        });

        self.openColorModal = function (layer) {
            colorsFactory.selectedLayer = layer;
            self.colorModal.show();
        };

        self.closeColorModal = function () {
            clearColorChoose();
            self.colorModal.hide();
        };

        self.calculateBackGroundColor = function (color) {
            return color.hex;
        };

        var changeColor = function (colArr) {
            colorsFactory.selectedLayer.color[0] = colArr[0];
            colorsFactory.selectedLayer.color[1] = colArr[1];
            colorsFactory.selectedLayer.color[2] = colArr[2];
        };

        var clearColorChoose = function () {
            colorsFactory.selectedColor = undefined;
            if (colorsFactory.selectedElement) {
                colorsFactory.selectedElement.removeClass('active');
            }
            colorsFactory.selectedElement = undefined;
        };

        self.chooseColor = function () {
            if (colorsFactory.selectedColor) {
                // Change the color of the selected layer
                changeColor(colorsFactory.selectedColor);
                // Update the change to the view
                $rootScope.loadingflag = true;
                $timeout(function () {
                    MapManager.reloadLayer(colorsFactory.selectedLayer);
                }, 1000);
                //Close the Modal after the change
                self.colorModal.hide();
                clearColorChoose();
            }

        };

        self.selectColor = function (color, e) {
            clearColorChoose();
            colorsFactory.selectedColor = color;
            colorsFactory.selectedElement = angular.element(e.target);
            colorsFactory.selectedElement.addClass('active');
        };

        self.forceRefresh = MapManager.forceRefresh;

        self.clearAll = MapManager.clearAll;

    })

    .controller('AppLayersSelectController', function AppLayersSelectController(AppLayersService, SidePanelService, $filter) {

        var self = this;

        self.available = [];

        self.isActive = function (layer) {
            return AppLayersService.getFavorites().map(function (item) {
                return item.title;
            }).indexOf(layer.title) !== -1;
        };

        self.toggleLayer = function (layer) {
            if (self.isActive(layer)) {
                AppLayersService.removeFavorite(layer);
            } else {
                AppLayersService.addFavorite(layer);
            }
        };

        self.backToList = function () {
            SidePanelService.setBabordView('app_layers');
        };


        AppLayersService.getAvailable().then(function (layers) {
            self.available = $filter('orderBy')(layers, 'title');
        });
    });
