angular.module('app.controllers.back_layers', ['app.services.context'])

    .controller('BackLayersController', function BackLayersController($location, BackLayerService, SidePanelService) {

        var self = this;


        self.sLayer = BackLayerService;

        self.useLayer = function (layer) {
            BackLayerService.setActive(layer.name);
        };

        self.removeLayer = function (layer) {
            var isCurrent = (layer === BackLayerService.getActive());
            BackLayerService.remove(layer).then(function (removed) {
                if (removed && isCurrent) {
                    self.useLayer(BackLayerService.list()[0]);
                }
            });
        };

        self.backToMenu = function () {
            SidePanelService.setBabordView('menu');
        };

        self.goToCache = function (layer) {
            $location.path('/cache/' + layer.name);
        };

        self.goToAddLayer = function () {
            SidePanelService.setBabordView('back_layers_add');
        };

        self.toggleOnlineMode = function (layer) {
            if (layer.cache) {
                // Remove the cache object
                delete layer.cache;
                // Update the view
                BackLayerService.setActive(layer.name);
            }
        }
    })

    .controller('BackLayersAddController', function BackLayersAddController($scope, BackLayerService, SidePanelService) {

        var self = this;


        self.serviceTypes = [
            {label: 'WMS', value: 'TileWMS'},
            {label: 'XYZ', value: 'XYZ'}
        ];

        self.name = null;

        self.authorization = {
            login: '',
            pw: ''
        };
        self.source = {type: 'TileWMS', url: 'http://', params: {version: '1.3.0'}};

        self.prepareType = function () {
            switch (self.source.type) {
                case 'TileWMS':
                    self.source.params = {version: '1.3.0'};
                    break;
                default:
                    delete self.source.params;
            }
        };

        self.add = function () {

            if (self.authorization.login !== "" && self.authorization.pw !== "") {
                self.source.tileLoadFunction = function (imageTile, src) {
                    var oReq = new XMLHttpRequest();
                    oReq.open("GET", src, true);
                    oReq.setRequestHeader("Authorization", 'Basic ' + btoa(self.authorization.login + ":" + self.authorization.pw));
                    oReq.responseType = "blob";
                    oReq.onload = function (oEvent) {
                        var blob = oReq.response;
                        var reader = new FileReader();
                        reader.onload = function (event) {
                            imageTile.getImage().src = event.target.result; //event.target.results contains the base64 code to create the image.
                        };
                        reader.readAsDataURL(blob);//Convert the blob from clipboard to base64
                    };

                    oReq.send();
                };
            }


            BackLayerService.add({type: 'Tile', name: self.name, source: self.source});
            self.backToList();
        };

        self.backToList = function () {
            SidePanelService.setBabordView('back_layers');
        };
    });