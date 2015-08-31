angular.module('module_app.controllers.menus.babord.menu', [])

    .controller('cBabordMenu', function cBabordMenu($rootScope, $scope, $state, sContext, sConf) {

        var self = this;

        self.sConf = sConf;

        self.sContext = sContext;

        self.setView = function(menu) {
            switch (menu.target) {

                // Display the view in a new page.
                case 'main':
                    $state.go(menu.file);
                    break;

                // Display the view in the babord menu.
                case 'babord':
                    sContext.setBabordView(menu);
                    break;
            }
        };
    });
