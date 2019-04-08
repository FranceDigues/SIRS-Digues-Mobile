angular.module('app.controllers.appConfig',
    ['app.services.context'])
    .controller('configMenu', configMenuController);

function configMenuController(SidePanelService, GlobalConfig) {
    var self = this;

    self.config = GlobalConfig.config;

    self.updateGlobalConfig = function () {
        localStorage.setItem('global_config', JSON.stringify(self.config));
    };

    self.backToMenu = function () {
        SidePanelService.setBabordView('menu');
    };

}