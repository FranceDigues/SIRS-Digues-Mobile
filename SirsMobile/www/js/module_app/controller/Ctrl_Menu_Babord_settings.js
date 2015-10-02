angular.module('module_app.controllers.menus.babord.settings', [])

    .controller('SettingsController', function SettingsController(LocalDocument, ContextService, sContext) {

        var self = this;

        var context = ContextService.getValue();


        self.sContext = sContext;

        self.version = context.version;

        self.settings = context.settings;
    });