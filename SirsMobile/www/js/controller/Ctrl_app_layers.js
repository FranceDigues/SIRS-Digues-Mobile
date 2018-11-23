angular.module('app.controllers.app_layers', ['app.services.context', 'app.services.colors'])

    .controller('AppLayersController', function AppLayersController($scope,
                                                                    $location, AppLayersService,
                                                                    SidePanelService, MapManager, featureCache,
                                                                    $ionicModal, $ionicSideMenuDelegate,
                                                                    $rootScope, $timeout, colorsFactory) {

        var self = this;

        self.layers = AppLayersService.getFavorites();

        self.layerColor = function (layer) {
            return 'rgb(' + layer.color[0] + ',' + layer.color[1] + ',' + layer.color[2] + ')';
        };

        self.move = function (from, to) {
            if (from < to) {
                var aux = from;
                from = to;
                to = aux;
            }
            if (from !== to) {
                self.layers.splice(to, 0, self.layers.splice(from, 1)[0]);
                MapManager.moveAppLayer(from, to);
                self.clearAll();
            }
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

        // @hb
        self.colors = colorsFactory.colors;

        self.selectedLayer;

        self.selectedColor;

        self.selectedElement;

        // @hb
        self.featureLabels = function (layer) {
            $rootScope.loadingflag = true;
            $timeout(function () {
                MapManager.addLabelFeatureLayer(layer);
            }, 1000);
        };

        // @hb
        $ionicModal.fromTemplateUrl('color-modal.html', {
            scope: $scope,
            animation: 'slide-in-up',
            backdropClickToClose: false
        }).then(function (modal) {
            self.colorModal = modal;
        });

        // @hb
        self.openColorModal = function (layer) {
            colorsFactory.selectedLayer = layer;
            self.colorModal.show();
        };
        // @hb
        self.closeColorModal = function () {
            clearColorChoose();
            self.colorModal.hide();
        };
        // @hb
        self.calculateBackGroundColor = function (color) {
            return color.hex;
        };

        // @hb
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

        //@hb
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

        //@hb Refresh handler for the layer
        self.forceRefresh = function (layer) {
            var cache = featureCache.get(layer.title);
            if (angular.isDefined(cache)) {
                featureCache.remove(layer.title);
                if (layer.visible) {
                    MapManager.syncAppLayer(layer);
                }
            }
        };

        self.clearAll = function () {
            angular.forEach(self.layers, function (layer) {
                self.forceRefresh(layer);
            });

        };


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