angular.module('module_app.controllers.menus.babord.settings', [])

    .controller('SettingsController', function SettingsCtrl($state, PouchUser, AuthStorage, AuthService, sContext) {

        var self = this;

        self.sContext = sContext;

        self.user = angular.extend({
            // Default user preferences.
            prefs: {
                autoSync: true,
                geolocation: false
            }
        }, AuthService.getAuthenticatedUser());

        self.save = function() {
            // Update user in database.
            PouchUser.put(self.user).then(function authUserHook(result) {
                // We've modified the authenticated user, we need to update its
                // properties in the local storage.
                self.user._rev = result.rev;
                AuthStorage.set(self.user);
            });
        };

        self.restart = function() {
            $state.go('init');
        };
    });