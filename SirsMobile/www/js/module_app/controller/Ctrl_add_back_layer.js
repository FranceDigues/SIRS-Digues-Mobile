angular.module('module_app.controllers.addBackLayer', [])

    .controller('AddBackLayerController', function AddBackLayerController(BackLayerService, sContext) {

        var self = this;


        self.serviceTypes = [
            { label: 'WMS', value: 'TileWMS' },
            { label: 'XYZ', value: 'XYZ' }
        ];

        self.name = null;

        self.source = { type: 'TileWMS', url: 'http://', params: { version: '1.3.0' } };

        self.prepareType = function() {
            switch (self.source.type) {
                case 'TileWMS':
                    self.source.params = { version: '1.3.0' };
                    break;
                default:
                    delete self.source.params;
            }
        };

        self.add = function() {
            BackLayerService.add({ type: 'Tile', name: self.name, source: self.source });
            self.backToList();
        };

        self.backToList = function() {
            sContext.setBabordView({ target: 'babord', file: 'backLayerMgmt' });
        };
    });


