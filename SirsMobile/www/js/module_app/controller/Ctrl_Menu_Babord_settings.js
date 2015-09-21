angular.module('module_app.controllers.menus.babord.settings', [])

    .controller('SettingsController', function SettingsController(PouchDocument, ContextService) {

        var self = this;

        var context = ContextService.getValue();


        self.version = context.version;

        self.settings = context.settings;
    });