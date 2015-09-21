angular.module('module_app.services.context', ['module_app.services.utils', 'module_app.services.dao'])

    .constant('defaultContext', {
        // View state.
        path: '/',
        search: {},

        // Data sources.
        ds: {
            local: 'sirs_rhone2',
            remotes: [{
                name: 'sirs_rhone2',
                url: 'http://5.196.17.92:5984/sirs_rhone2',
                username: 'geouser',
                password: 'geopw'
            }]
        },

        // Authentication.
        auth: null,

        // Preferences.
        settings: {
            autoSync: true,
            autoGeoloc: false
        },

        // Others.
        geolocEnabled: false,
        editionEnabled: false,
        version: 'v0.2.1 -u10'
    })

    .service('ContextService', function ContextService($rootScope, $location, LocalStorageItem, defaultContext) {

        var self = this;

        var contextStorage = new LocalStorageItem('appContext');

        var value = angular.extend(defaultContext, contextStorage.read());


        self.getValue = function() {
            return value;
        };


        // Listen navigation event to store the current view context.
        $rootScope.$on('$locationChangeSuccess', function() {
            value.path = $location.path();
            value.search = $location.search();
        });

        // Store the new value in the local storage on changes.
        $rootScope.$watch(self.getValue, contextStorage.write, true);
    })

    .service('DsService', function DsService($rootScope, $ionicPopup, ContextService) {

        var self = this;

        var config = ContextService.getValue().ds;


        self.getRemotes = function() {
            return config.remotes;
        };

        self.getActiveRemote = function() {
            var i = config.remotes.length;
            while(i--) {
                var remote = config.remotes[i];
                if (remote.name === config.local) {
                    return remote;
                }
            }
            return null;
        };

        self.setActiveRemote = function(name) {
            var oldValue = config.local;
            config.local = name;
            $rootScope.$broadcast('remoteChanged', name, oldValue);
        };

        self.addRemote = function(remote) {
            config.remotes.push(remote);
            $rootScope.$broadcast('remoteAdded', remote);
        };

        self.removeRemote = function(remote) {
            return $ionicPopup.confirm({
                title: 'Suppression d\'une base de données',
                template: 'Voulez vous vraiment supprimer cette base de données ?'
            }).then(function(confirmed) {
                if (confirmed) {
                    config.remotes.splice(config.remotes.indexOf(remote), 1);
                    $rootScope.$broadcast('remoteRemoved', remote);
                }
                return confirmed;
            });
        };
    })

    .service('AuthService', function AuthService($rootScope, $q, ContextService, PouchDocument, md5) {

        var self = this;

        var context = ContextService.getValue();


        self.getValue = function() {
            return context.auth;
        };

        self.login = function(login, password) {
            self.logout();

            var deferred = $q.defer();

            $rootScope.$broadcast('loginStart', login);

            PouchDocument.queryOne('Utilisateur/byLogin', login).then(
                function onGetUserSuccess(doc) {
                    if (doc.password === md5.createHash(password).toUpperCase()) {
                        context.auth = doc;
                        deferred.resolve(doc);
                        $rootScope.$broadcast('loginSuccess', login, doc);
                    } else {
                        deferred.reject();
                        $rootScope.$broadcast('loginError', login);
                    }
                },
                function onGetUserError() {
                    deferred.reject();
                    $rootScope.$broadcast('loginError', login);
                });

            return deferred.promise;
        };

        self.logout = function() {
            if (angular.isObject(context.auth)) {
                return;
            }

            context.auth = null;
            $rootScope.$broadcast('logoutSuccess');
        };
    });