angular.module('module_app.services.context', ['module_app.services.utils', 'module_app.services.dao'])

    .constant('defaultContext', {
        // View state.
        path: '/',
        search: {},

        // Data sources.
        ds: {
            active: 'test',
            remotes: [{
                name: 'test',
                url: 'http://5.196.17.92:5984/sirs_symadrem',
                username: 'geouser',
                password: 'geopw',
                replicated: false
            },{
                name: 'azerty',
                url: 'http://localhost:5984/azerty',
                username: 'username',
                password: 'password',
                replicated: false
            },{
                name: 'qwerty',
                url: 'http://localhost:5984/qwerty',
                username: 'username',
                password: 'password',
                replicated: false
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
                    // Destroy the local database (if exists).
                    new PouchDB(remote.name).destroy();
                    // Unregister the remove database.
                    config.remotes.splice(config.remotes.indexOf(remote), 1);
                    // Broadcast application event.
                    $rootScope.$broadcast('remoteRemoved', remote);
                }
                return confirmed;
            });
        };

        self.getActiveRemote = function() {
            var i = config.remotes.length;
            while(i--) {
                var remote = config.remotes[i];
                if (remote.name === config.active) {
                    return remote;
                }
            }
            return null;
        };

        self.setActiveRemote = function(name) {
            var oldValue = config.active;
            config.active = name;
            $rootScope.$broadcast('remoteChanged', self.getActiveRemote(), oldValue);
        };
    })

    .service('AuthService', function AuthService($rootScope, $q, ContextService, PouchDocument, md5) {

        var self = this;

        var context = ContextService.getValue();


        self.isNull = function() {
            return !context.auth;
        };

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

            PouchDocument.query('Utilisateur/all').then(function(result) {
                console.log(result);
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