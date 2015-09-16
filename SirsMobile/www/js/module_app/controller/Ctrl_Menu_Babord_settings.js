angular.module('module_app.controllers.menus.babord.settings', [])

    .constant('defaultPreferences', {
        autoSync: true,
        autoGeoloc: false
    })

    .controller('SettingsController', function SettingsController(PouchDocument, AuthStorage, AuthService, sContext, defaultPreferences) {

        var self = this;

        var userDoc = angular.extend({ prefs: defaultPreferences }, AuthService.getUser());

        self.sContext = sContext;

        self.prefs = userDoc.prefs;

        self.save = function() {
            // Update user in database. TODO → should be automated ?
            PouchDocument.save(userDoc).then(function() {
                // We've modified the authenticated user, so we need to update its properties
                // in the local storage.
                AuthStorage.set(userDoc);
            });
        };
    });