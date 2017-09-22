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
        version: '0.2.25'
    })

    .service('ContextService', function ContextService($rootScope, $location, LocalStorageItem, defaultContext) {

        var self = this;

        var contextStorage = new LocalStorageItem('appContext');

        var value = angular.extend(defaultContext, contextStorage.read());


        this.getValue = function() {
            return value;
        };


        // Listen navigation event to store the current view context.
        $rootScope.$on('$locationChangeSuccess', function() {
            value.path = $location.path();
            value.search = $location.search();
        });

        // Store the new value in the local storage on changes.
        $rootScope.$watch(this.getValue, contextStorage.write, true);
    })

    .service('DatabaseService', function DatabaseService($rootScope, $ionicPopup, ContextService) {

        var self = this;

        var dbContext = ContextService.getValue().database;


        this.list = function() {
            return dbContext.list;
        };

        this.add = function(db) {
            dbContext.list.push(db);
            $rootScope.$broadcast('databaseAdded', db);
        };

        this.remove = function(db) {
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

        this.oldEditionRemove = function(db) {
                    // Destroy the local database (if exists).
                    new PouchDB(db.name).destroy();
                    // Unregister the remove database.
                    dbContext.list.splice(dbContext.list.indexOf(db), 1);
                    // Broadcast application event.
                    $rootScope.$broadcast('databaseRemoved', db);
        };

        this.getActive = function() {
            var i = dbContext.list.length;
            while(i--) {
                var db = dbContext.list[i];
                if (db.name === dbContext.active) {
                    return db;
                }
            }
            return null;
        };

        this.setActive = function(name) {
            var oldValue = dbContext.active;
            dbContext.active = name;
            if (oldValue !== name) {
                $rootScope.$broadcast('databaseChanged', this.getActive(), oldValue);
            }
        };
    })

    .service('BackLayerService', function BackLayerService($rootScope, $ionicPopup, ContextService) {

        var self = this;

        var layerContext = ContextService.getValue().backLayer;


        this.list = function() {
            return layerContext.list;
        };

        this.add = function(layer) {
            layerContext.list.push(layer);
        };

        this.remove = function(layer) {
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

        this.getActive = function() {
            return this.getByName(layerContext.active);
        };

        this.getByName = function(name) {
            var i = layerContext.list.length;
            while(i--) {
                var layer = layerContext.list[i];
                if (layer.name === name) {
                    return layer;
                }
            }
            return null;
        };

        this.setActive = function(name) {
            var oldValue = layerContext.active;
            layerContext.active = name;
            $rootScope.$broadcast('backLayerChanged', this.getActive(), oldValue);
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
            angular.forEach(nodes, function(node) {
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


        this.getAvailable = function() {
            var deferred = $q.defer();

            moduleDescriptions().then(
                function onSuccess(modules) {
                    var leaves = [];
                    angular.forEach(modules, function(module) {
                        leaves = leaves.concat(extractLeaves(module.layers));
                    });
                    deferred.resolve(leaves);
                },
                function onError(error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        };

        this.getFavorites = function() {
            return favorites;
        };

        this.addFavorite = function(layer) {
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

        this.removeFavorite = function(layer) {
            var index = favorites.map(function(item) {
                return item.title;
            }).indexOf(layer.title);
            favorites.splice(index, 1);
            $rootScope.$broadcast('appLayerRemoved', layer, index);
        };


        $rootScope.$on('databaseChanged', function() {
            cachedDescriptions = null;
        });
    })

    .service('AuthService', function AuthService($rootScope, $q, ContextService, LocalDocument, md5) {

        var self = this;

        var context = ContextService.getValue();


        this.isNull = function() {
            return !context.authUser;
        };

        this.getValue = function() {
            return context.authUser;
        };

        this.login = function(login, password) {
            this.logout();

            var deferred = $q.defer();

            $rootScope.$broadcast('loginStart', login);

            LocalDocument.queryOne('Utilisateur/byLogin', { key: login, include_docs: true }).then(
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

        this.logout = function() {
            if (!this.isNull()) {
                context.authUser = null;
                $rootScope.$broadcast('logoutSuccess');
            }
        };


        $rootScope.$on('databaseChanged', function() {
            context.authUser = null;
        });
    })

    .service('SidePanelService', function SidePanelService($ionicSideMenuDelegate) {

        var self = this;

        var babordView = 'menu';

        var tribordView = 'object_add';


        this.getBabordView = function() {
            return babordView;
        };

        this.setBabordView = function(view) {
            babordView = view;
            if (!$ionicSideMenuDelegate.isOpenLeft()) {
                $ionicSideMenuDelegate.toggleLeft();
            }
        };

        this.getTribordView = function() {
            return tribordView;
        };

        this.setTribordView = function(view) {
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

        this.photoDir=null;

        this.notesDir=null;

        this.docDir=null;

        // Selections
        // ----------

        this.selectedFeatures = [];

        this.selectedObject = null;

        this.selectedObservation = null;
    });