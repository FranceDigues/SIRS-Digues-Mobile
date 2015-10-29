angular.module('module_app.controllers.main', ['module_app.services.context'])

    .controller('MainController', function MainController($location, $ionicSideMenuDelegate, AuthService, sContext, SidePanelService) {

        var self = this;


        self.logout = function() {
            AuthService.logout();
            $location.path('/login');
        };

        self.sContext = sContext;

        self.setBabordView = SidePanelService.setBabordView;

        self.getBabordView = SidePanelService.getBabordView;

        self.menuDelegate = $ionicSideMenuDelegate;

        self.createNewObject = function() {
            $ionicSideMenuDelegate.toggleRight();
            self.sContext.tribordView.active = "objectManagement";
        };
    });