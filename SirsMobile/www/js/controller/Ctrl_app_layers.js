angular.module('app.controllers.app_layers', ['app.services.context'])

    .controller('AppLayersController', function AppLayersController($scope,
                                                                    $location, AppLayersService,
                                                                    SidePanelService, MapManager,
                                                                    $ionicModal, $ionicSideMenuDelegate,olMap) {

        var self = this;

        self.layers = AppLayersService.getFavorites();

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
        self.featureLabels = function(layer){
            MapManager.addLabelFeatureLayer(layer);

            console.log(olMap);


        };

        // @hb
        $ionicModal.fromTemplateUrl('color-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            self.colorModal = modal;
        });

        // @hb
        self.colors = [
            {
                "hex": "#EFDECD",
                "name": "Almond",
                "rgb": [239, 222, 205]
            },
            {
                "hex": "#CD9575",
                "name": "Antique Brass",
                "rgb": [205, 149, 117]
            },
            {
                "hex": "#FDD9B5",
                "name": "Apricot",
                "rgb": [253, 217, 181]
            },
            {
                "hex": "#78DBE2",
                "name": "Aquamarine",
                "rgb": [120, 219, 226]
            },
            {
                "hex": "#87A96B",
                "name": "Asparagus",
                "rgb": [135, 169, 107]
            },
            {
                "hex": "#FFA474",
                "name": "Atomic",
                "rgb": [255, 164, 116]
            },
            {
                "hex": "#FAE7B5",
                "name": "Banana Mania",
                "rgb": [250, 231, 181]
            },
            {
                "hex": "#9F8170",
                "name": "Beaver",
                "rgb": [159, 129, 112]
            },
            {
                "hex": "#FD7C6E",
                "name": "Bittersweet",
                "rgb": [253, 124, 110]
            },
            {
                "hex": "#000000",
                "name": "Black",
                "rgb": [0,0,0]
            },
            {
                "hex": "#ACE5EE",
                "name": "Blizzard Blue",
                "rgb": [172, 229, 238]
            },
            {
                "hex": "#1F75FE",
                "name": "Blue",
                "rgb": [31, 117, 254]
            },
            {
                "hex": "#A2A2D0",
                "name": "Blue Bell",
                "rgb": [162, 162, 208]
            },
            {
                "hex": "#6699CC",
                "name": "Blue Gray",
                "rgb": [102, 153, 204]
            },
            {
                "hex": "#0D98BA",
                "name": "Blue Green",
                "rgb": [13, 152, 186]
            },
            {
                "hex": "#7366BD",
                "name": "Blue Violet",
                "rgb": [115, 102, 189]
            },
            {
                "hex": "#DE5D83",
                "name": "Blush",
                "rgb": [222, 93, 131]
            },
            {
                "hex": "#CB4154",
                "name": "Brick Red",
                "rgb": [203, 65, 84]
            },
            {
                "hex": "#B4674D",
                "name": "Brown",
                "rgb": [180, 103, 77]
            },
            {
                "hex": "#FF7F49",
                "name": "Burnt Orange",
                "rgb": [255, 127, 73]
            },
            {
                "hex": "#EA7E5D",
                "name": "Burnt Sienna",
                "rgb": [234, 126, 93]
            },
            {
                "hex": "#B0B7C6",
                "name": "Cadet Blue",
                "rgb": [176, 183, 198]
            },
            {
                "hex": "#FFFF99",
                "name": "Canary",
                "rgb": [255, 255, 153]
            },
            {
                "hex": "#1CD3A2",
                "name": "Caribbean Green",
                "rgb": [28, 211, 162]
            },
            {
                "hex": "#FFAACC",
                "name": "Carnation Pink",
                "rgb": [255, 170, 204]
            },
            {
                "hex": "#DD4492",
                "name": "Cerise",
                "rgb": [221, 68, 146]
            },
            {
                "hex": "#1DACD6",
                "name": "Cerulean",
                "rgb": [29, 172, 214]
            },
            {
                "hex": "#BC5D58",
                "name": "Chestnut",
                "rgb": [188, 93, 88]
            },
            {
                "hex": "#DD9475",
                "name": "Copper",
                "rgb": [221, 148, 117]
            },
            {
                "hex": "#9ACEEB",
                "name": "Cornflower",
                "rgb": [154, 206, 235]
            },
            {
                "hex": "#FFBCD9",
                "name": "Cotton Candy",
                "rgb": [255, 188, 217]
            },
            {
                "hex": "#FDDB6D",
                "name": "Dandelion",
                "rgb": [253, 219, 109]
            },
            {
                "hex": "#2B6CC4",
                "name": "Denim",
                "rgb": [43, 108, 196]
            },
            {
                "hex": "#EFCDB8",
                "name": "Desert Sand",
                "rgb": [239, 205, 184]
            },
            {
                "hex": "#6E5160",
                "name": "Eggplant",
                "rgb": [110, 81, 96]
            },
            {
                "hex": "#CEFF1D",
                "name": "Electric Lime",
                "rgb": [206, 255, 29]
            },
            {
                "hex": "#71BC78",
                "name": "Fern",
                "rgb": [113, 188, 120]
            },
            {
                "hex": "#6DAE81",
                "name": "Forest Green",
                "rgb": [109, 174, 129]
            },
            {
                "hex": "#C364C5",
                "name": "Fuchsia",
                "rgb": [195, 100, 197]
            },
            {
                "hex": "#CC6666",
                "name": "Fuzzy Wuzzy",
                "rgb": [204, 102, 102]
            },
            {
                "hex": "#E7C697",
                "name": "Gold",
                "rgb": [231, 198, 151]
            },
            {
                "hex": "#FCD975",
                "name": "Goldenrod",
                "rgb": [252, 217, 117]
            },
            {
                "hex": "#A8E4A0",
                "name": "Granny Apple",
                "rgb": [168, 228, 160]
            },
            {
                "hex": "#95918C",
                "name": "Gray",
                "rgb": [149, 145, 140]
            },
            {
                "hex": "#1CAC78",
                "name": "Green",
                "rgb": [28, 172, 120]
            },
            {
                "hex": "#1164B4",
                "name": "Green Blue",
                "rgb": [17, 100, 180]
            },
            {
                "hex": "#F0E891",
                "name": "Green Yellow",
                "rgb": [240, 232, 145]
            },
            {
                "hex": "#FF1DCE",
                "name": "Hot Magenta",
                "rgb": [255, 29, 206]
            },
            {
                "hex": "#B2EC5D",
                "name": "Inchworm",
                "rgb": [178, 236, 93]
            },
            {
                "hex": "#5D76CB",
                "name": "Indigo",
                "rgb": [93, 118, 203]
            },
            {
                "hex": "#CA3767",
                "name": "Jazzberry Jam",
                "rgb": [202, 55, 103]
            },
            {
                "hex": "#3BB08F",
                "name": "Jungle Green",
                "rgb": [59, 176, 143]
            },
            {
                "hex": "#FEFE22",
                "name": "Laser Lemon",
                "rgb": [254, 254, 34]
            }
        ];

        self.selectedLayer;

        self.selectedColor;

        self.selectedElement;


        // @hb
        self.openColorModal = function(layer) {
            // $ionicSideMenuDelegate.toggleLeft();
            self.selectedLayer = layer;
            self.colorModal.show();
        };
        // @hb
        self.closeColorModal = function() {
            clearColorChoose();
            self.colorModal.hide();
        };
        // @hb
        self.calculateBackGroundColor = function (color) {
            return color.hex;
        };

        // @hb
        var changeColor = function(colArr){
            self.selectedLayer.color[0] = colArr[0];
            self.selectedLayer.color[1] = colArr[1];
            self.selectedLayer.color[2] = colArr[2];
        };

        var clearColorChoose = function() {
            self.selectedColor = undefined;
            if(self.selectedElement) {
                self.selectedElement.removeClass('active');
            }
            self.selectedElement = undefined;
        };

        //@hb
        self.chooseColor = function (){

            if(self.selectedColor){
                // Change the color of the selected layer
                changeColor(self.selectedColor);
                // Update the change to the view
                    MapManager.reloadLayer(self.selectedLayer);
                //Close the Modal after the change
                self.colorModal.hide();
                clearColorChoose();
            }

        };

        self.selectColor = function (color,e) {
            clearColorChoose();
            self.selectedColor = color;
            self.selectedElement = angular.element(e.target);
            self.selectedElement.addClass('active');
        };





    })

    .controller('AppLayersSelectController', function AppLayersSelectController(AppLayersService, SidePanelService) {

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
            self.available = layers;
        });
    });