angular.module('module_app.services.context', ['module_app.services.utils', 'module_app.services.dao'])

    .constant('defaultContext', {
        // Location state.
        path: '/',
        search: {},

        // Database.
        database: {
            active: 'test',
            list: [
                {
                    name: 'test',
                    url: 'http://5.196.17.92:5984/sirs_symadrem',
                    username: 'geouser',
                    password: 'geopw',
                    replicated: false
                },
                {
                    name: 'azerty',
                    url: 'http://localhost:5984/azerty',
                    username: 'username',
                    password: 'password',
                    replicated: false
                },
                {
                    name: 'qwerty',
                    url: 'http://localhost:5984/qwerty',
                    username: 'username',
                    password: 'password',
                    replicated: false
                }
            ]
        },

        // Authentication.
        authUser: null,

        // Preferences.
        settings: {
            autoSync: true,
            autoGeoloc: false
        },

        // Background layer.
        backLayer: {
            active: 'Bing Aerial',
            list: [
                {
                    name: 'Bing Aerial',
                    type: 'Tile',
                    source: {
                        type: 'BingMaps',
                        key: 'Aj6XtE1Q1rIvehmjn2Rh1LR2qvMGZ-8vPS9Hn3jCeUiToM77JFnf-kFRzyMELDol',
                        imagerySet: 'Aerial'
                    }
                },
                {
                    name: 'OpenStreetMap',
                    type: 'Tile',
                    source: {
                        type: 'OSM',
                        url: 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    }
                },
                {
                    name: 'Landscape',
                    type: 'Tile',
                    source: {
                        type: 'OSM',
                        url: 'http://{a-c}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png'
                    }
                }
            ]
        },

        // Others.
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

    .service('DatabaseService', function DatabaseService($rootScope, $ionicPopup, ContextService) {

        var self = this;

        var dbContext = ContextService.getValue().database;


        self.list = function() {
            return dbContext.list;
        };

        self.add = function(db) {
            dbContext.list.push(db);
            $rootScope.$broadcast('databaseAdded', db);
        };

        self.remove = function(db) {
            return $ionicPopup.confirm({
                title: 'Suppression d\'une base de données',
                template: 'Voulez vous vraiment supprimer cette base de données ?'
            }).then(function(confirmed) {
                if (confirmed) {
                    // Destroy the local database (if exists).
                    new PouchDB(db.name).destroy();
                    // Unregister the remove database.
                    dbContext.list.splice(dbContext.list.indexOf(db), 1);
                    // Broadcast application event.
                    $rootScope.$broadcast('databaseRemoved', db);
                }
                return confirmed;
            });
        };

        self.getActive = function() {
            var i = dbContext.list.length;
            while(i--) {
                var db = dbContext.list[i];
                if (db.name === dbContext.active) {
                    return db;
                }
            }
            return null;
        };

        self.setActive = function(name) {
            var oldValue = dbContext.active;
            dbContext.active = name;
            $rootScope.$broadcast('databaseChanged', self.getActive(), oldValue);
        };
    })

    .service('BackLayerService', function BackLayerService($rootScope, $ionicPopup, ContextService) {

        var self = this;

        var layerContext = ContextService.getValue().backLayer;


        self.list = function() {
            return layerContext.list;
        };

        self.add = function(layer) {
            layerContext.list.push(layer);
            $rootScope.$broadcast('backLayerAdded', layer);
        };

        self.remove = function(layer) {
            return $ionicPopup.confirm({
                title: 'Suppression d\'une couche',
                template: 'Voulez vous vraiment supprimer cette couche ?'
            }).then(function(confirmed) {
                if (confirmed) {
                    // Unregister the remove database.
                    layerContext.list.splice(layerContext.list.indexOf(layer), 1);
                    // Broadcast application event.
                    $rootScope.$broadcast('backLayerRemoved', layer);
                }
                return confirmed;
            });
        };

        self.getActive = function() {
            var i = layerContext.list.length;
            while(i--) {
                var layer = layerContext.list[i];
                if (layer.name === layerContext.active) {
                    return layer;
                }
            }
            return null;
        };

        self.setActive = function(name) {
            var oldValue = layerContext.active;
            layerContext.active = name;
            $rootScope.$broadcast('backLayerChanged', self.getActive(), oldValue);
        };
    })

    .service('AuthService', function AuthService($rootScope, $q, ContextService, PouchDocument, md5) {

        var self = this;

        var context = ContextService.getValue();


        self.isNull = function() {
            return !context.authUser;
        };

        self.getValue = function() {
            return context.authUser;
        };

        self.login = function(login, password) {
            self.logout();

            var deferred = $q.defer();

            $rootScope.$broadcast('loginStart', login);

            PouchDocument.queryOne('Utilisateur/byLogin', login).then(
                function onGetUserSuccess(doc) {
                    if (doc.password === md5.createHash(password).toUpperCase()) {
                        context.authUser = doc;
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
            if (angular.isObject(context.authUser)) {
                return;
            }

            context.authUser = null;
            $rootScope.$broadcast('logoutSuccess');
        };
    });