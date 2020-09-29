angular.module('app.services.context', ['app.services.utils', 'app.services.dao'])

    .constant('defaultContext', {
        // Location state.
        path: '/',
        search: {},

        // Database.
        database: {
            active: 'amanin_db',
            list: []
        },

        // Authentication.
        authUser: null,

        // Background layer.
        backLayer: {
            active: 'OpenStreetMap',
            list: [
                {
                    name: 'OpenStreetMap',
                    source: {
                        type: 'OSM',
                        url: 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    }
                },
                {
                    name: 'Landscape',
                    source: {
                        type: 'OSM',
                        url: 'http://{a-c}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png'
                    }
                }
            ]
        },

        // Settings.
        settings: {
            geolocation: true,
            edition: false
        },

        // Others.
        lastLocation: null,
        version: '0.2.74'
    })

    .service('ContextService', function ContextService($rootScope, $location, LocalStorageItem, defaultContext) {

        var self = this;

        var contextStorage = new LocalStorageItem('appContext');

        var value = angular.extend(defaultContext, contextStorage.read());


        self.getValue = function () {
            return value;
        };


        // Listen navigation event to store the current view context.
        $rootScope.$on('$locationChangeSuccess', function () {
            value.path = $location.path();
            value.search = $location.search();
        });

        // Store the new value in the local storage on changes.
        $rootScope.$watch(self.getValue, contextStorage.write, true);
    })

    .service('DatabaseService', function DatabaseService($rootScope, $ionicPopup, ContextService, $q) {

        var self = this;

        var dbContext = ContextService.getValue().database;


        self.list = function () {
            return dbContext.list;
        };

        self.add = function (db) {
            dbContext.list.push(db);
            $rootScope.$broadcast('databaseAdded', db);
        };

        self.remove = function (db, force) {
            if (force) {
                var deferred = $q.defer();
                // Destroy the local database (if exists).
                new PouchDB(db.name).destroy();
                // Unregister the remove database.
                dbContext.list.splice(dbContext.list.indexOf(db), 1);
                // Broadcast application event.
                $rootScope.$broadcast('databaseRemoved', db);
                deferred.resolve(true);
                return deferred.promise;
            } else {
                return $ionicPopup.confirm({
                    title: 'Suppression d\'une base de données',
                    template: 'Voulez vous vraiment supprimer cette base de données ?'
                }).then(function (confirmed) {
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
            }
        };

        self.getActive = function () {
            var i = dbContext.list.length;
            while (i--) {
                var db = dbContext.list[i];
                if (db.name === dbContext.active) {
                    return db;
                }
            }
            return null;
        };

        self.setActive = function (name, force) {
            var oldValue = dbContext.active;
            dbContext.active = name;
            if (oldValue !== name || force) {
                $rootScope.$broadcast('databaseChanged', self.getActive(), oldValue);
            }
        };
    })

    .service('BackLayerService', function BackLayerService($rootScope, $ionicPopup, ContextService) {

        var self = this;

        var layerContext = ContextService.getValue().backLayer;


        self.list = function () {
            return layerContext.list;
        };

        self.add = function (layer) {
            layerContext.list.push(layer);
        };

        self.remove = function (layer) {
            return $ionicPopup.confirm({
                title: 'Suppression d\'une couche',
                template: 'Voulez vous vraiment supprimer cette couche ?'
            }).then(function (confirmed) {
                if (confirmed) {
                    // Unregister the remove database.
                    layerContext.list.splice(layerContext.list.indexOf(layer), 1);
                    // Broadcast application event.
                    $rootScope.$broadcast('backLayerRemoved', layer);
                }
                return confirmed;
            });
        };

        self.getActive = function () {
            return self.getByName(layerContext.active);
        };

        self.getByName = function (name) {
            var i = layerContext.list.length;
            while (i--) {
                var layer = layerContext.list[i];
                if (layer.name === name) {
                    return layer;
                }
            }
            return null;
        };

        self.setActive = function (name) {
            var oldValue = layerContext.active;
            layerContext.active = name;
            $rootScope.$broadcast('backLayerChanged', self.getActive(), oldValue);
        };
    })

    .service('AppLayersService', function AppLayersService($rootScope, $q, LocalDocument, DatabaseService) {

        var self = this;

        var favorites = DatabaseService.getActive().favorites;

        var cachedDescriptions = null;


        function moduleDescriptions() {
            var deferred = $q.defer();
            if (!cachedDescriptions) {
                LocalDocument.get('$sirs').then(
                    function onSuccess(result) {
                        cachedDescriptions = result.moduleDescriptions;
                        deferred.resolve(cachedDescriptions);
                    },
                    function onError(error) {
                        deferred.reject(error);
                    });
            } else {
                deferred.resolve(cachedDescriptions);
            }
            return deferred.promise;
        }

        function extractLeaves(nodes, parent) {
            var leaves = [];
            angular.forEach(nodes, function (node) {
                node.categories = angular.isObject(parent) ?
                    parent.categories.concat(parent.title) : [];
                if (angular.isArray(node.children)) {
                    leaves = leaves.concat(extractLeaves(node.children, node));
                } else {
                    leaves.push(node);
                }
            });
            return leaves;
        }


        self.getAvailable = function () {
            var deferred = $q.defer();

            moduleDescriptions().then(
                function onSuccess(modules) {
                    var leaves = [];
                    angular.forEach(modules, function (module) {
                        leaves = leaves.concat(extractLeaves(module.layers));
                    });
                    deferred.resolve(leaves);
                },
                function onError(error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        };

        self.getFavorites = function () {
            return favorites;
        };

        self.setFavorites = function (newFavorites) {
            favorites = newFavorites;
            DatabaseService.getActive().favorites = newFavorites;
        };

        self.addFavorite = function (layer) {
            layer.editable = false;
            layer.featLabels = false;
            layer.realPosition = false;
            layer.selectable = false;
            layer.visible = false;
            layer.color = [
                Math.floor(Math.random() * 256),    // red
                Math.floor(Math.random() * 256),    // green
                Math.floor(Math.random() * 256),    // blue
                1                                   // alpha
            ];
            favorites.push(layer);
            $rootScope.$broadcast('appLayerAdded', layer);
        };

        self.removeFavorite = function (layer) {
            var index = favorites.map(function (item) {
                return item.title;
            }).indexOf(layer.title);
            favorites.splice(index, 1);
            $rootScope.$broadcast('appLayerRemoved', layer, index);
        };


        $rootScope.$on('databaseChanged', function () {
            cachedDescriptions = null;
        });
    })

    .service('AuthService', function AuthService($rootScope, $q, ContextService, LocalDocument, md5) {

        var self = this;

        var context = ContextService.getValue();


        self.isNull = function () {
            return !context.authUser;
        };

        self.getValue = function () {
            return context.authUser;
        };

        self.login = function (login, password) {
            self.logout();

            var deferred = $q.defer();

            $rootScope.$broadcast('loginStart', login);

            LocalDocument.queryOne('Utilisateur/byLogin', {key: login, include_docs: true}).then(
                function onGetUserSuccess(result) {
                    if (result.doc.password === md5.createHash(password).toUpperCase()) {
                        context.authUser = result.doc;
                        deferred.resolve(result.doc);
                        $rootScope.$broadcast('loginSuccess', login, result.doc);
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

        self.logout = function () {
            if (!self.isNull()) {
                context.authUser = null;
                $rootScope.$broadcast('logoutSuccess');
            }
        };


        $rootScope.$on('databaseChanged', function () {
            context.authUser = null;
        });
    })

    .service('SidePanelService', function SidePanelService($ionicSideMenuDelegate) {

        var self = this;

        var babordView = 'menu';

        var tribordView = 'object_add';


        self.getBabordView = function () {
            return babordView;
        };

        self.setBabordView = function (view) {
            babordView = view;
            if (!$ionicSideMenuDelegate.isOpenLeft()) {
                $ionicSideMenuDelegate.toggleLeft();
            }
        };

        self.getTribordView = function () {
            return tribordView;
        };

        self.setTribordView = function (view) {
            tribordView = view;
            if (!$ionicSideMenuDelegate.isOpenRight()) {
                $ionicSideMenuDelegate.toggleRight();
            }
        };
    })

    .service('sContext', function sContext() {

        var self = this;


        // Paths
        // ----------

        self.photoDir = null;

        self.notesDir = null;

        self.docDir = null;

        // Selections
        // ----------

        self.selectedFeatures = [];

        self.selectedObject = null;

        self.selectedObservation = null;
    })

    .factory('GlobalConfig', function globalConfig() {

        var self = this;

        if (localStorage.getItem('global_config')) {
            self.config = JSON.parse(localStorage.getItem('global_config'));
        } else {
            self.config = {
                'showText': 'fullName'
            };

            localStorage.setItem('global_config', JSON.stringify(self.config));
        }

        return self;
    });
