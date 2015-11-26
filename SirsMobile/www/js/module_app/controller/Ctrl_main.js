angular.module('module_app.controllers.main', ['module_app.services.context'])

    .controller('MainController', function MainController($location, $ionicSideMenuDelegate, AuthService, SidePanelService) {

        var self = this;


        self.logout = AuthService.logout;

        self.setBabordView = SidePanelService.setBabordView;

        self.getBabordView = SidePanelService.getBabordView;

        self.setTribordView = SidePanelService.setTribordView;

        self.getTribordView = SidePanelService.getTribordView;

        self.menuDelegate = $ionicSideMenuDelegate;
    });