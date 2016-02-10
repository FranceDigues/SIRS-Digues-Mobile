angular.module('app.controllers.main', ['app.services.context'])

    .controller('MainController', function MainController($location, $ionicSideMenuDelegate, LocalDocument, AuthService, SidePanelService) {

        var self = this;

        var plugins = [];


        LocalDocument.get('$sirs').then(function(document) {
            plugins = Object.keys(document.moduleDescriptions);
        });


        self.logout = AuthService.logout;

        self.setBabordView = SidePanelService.setBabordView;

        self.getBabordView = SidePanelService.getBabordView;

        self.setTribordView = SidePanelService.setTribordView;

        self.getTribordView = SidePanelService.getTribordView;

        self.menuDelegate = $ionicSideMenuDelegate;

        self.hasBergePlugin = hasPlugin.bind(self, 'plugin-berge');

        self.hasVegetationPlugin = hasPlugin.bind(self, 'plugin-vegetation');


        function hasPlugin(plugin) {
            return plugins.indexOf(plugin) !== -1;
        }
    });