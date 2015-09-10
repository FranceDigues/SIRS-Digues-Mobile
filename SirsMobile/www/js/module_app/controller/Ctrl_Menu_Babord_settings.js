angular.module('module_app.controllers.menus.babord.settings', [])

    .constant('defaultPreferences', {
        autoSync: true,
        autoGeoloc: false
    })

    .controller('SettingsController', function SettingsCtrl(PouchUser, AuthStorage, AuthService, sContext, defaultPreferences) {

        var self = this;

        var userDoc = angular.extend({ prefs: defaultPreferences }, AuthService.getAuthenticatedUser());

        self.sContext = sContext;

        self.prefs = userDoc.prefs;

        self.save = function() {
            // Update user in database. TODO → should be automated ?
            PouchUser.save(userDoc).then(function authUserHook(response) {
                // We've modified the authenticated user, so we need to update its properties
                // in the local storage.
                userDoc._rev = response.rev;
                AuthStorage.set(userDoc);
            });
        };
    });