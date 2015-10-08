angular.module('module_app.controllers.menus.babord.help', [])

    .controller('HelpController', function BackLayerController(sContext) {

        var self = this;


        self.backToMenu = function() {
            sContext.setBabordView({ target: 'babord', file: 'menu' });
        };
    });


