angular.module('app.controllers.help', [])

    .controller('HelpController', function HelpController(SidePanelService) {

        var self = this;


        self.backToMenu = function() {
            SidePanelService.setBabordView('menu');
        };
    });


