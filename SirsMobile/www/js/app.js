angular.module('SirsMobile', [
    // Lib modules.
    'ionic',
    'ngCordova',
    'ngRoute',
    'ol',
    'uuid4',
    'angular-md5',
    'rzModule',
    'pouchdb',
    // App modules.
    'app.controllers',
    'app.services',
    'app.directives'])

    .config(function ($routeProvider, $ionicConfigProvider, olMapProvider, routeResolve) {

        // Configure Ionic.
        $ionicConfigProvider.tabs.position('bottom'); // other values: top

        // Configure OpenLayers maps.
        olMapProvider.provideOptions('main', function(element, MapManager) {
            return MapManager.buildConfig(element);
        });
        olMapProvider.provideOptions('cache', function(CacheMapManager) {
            return CacheMapManager.buildConfig();
        });
        olMapProvider.provideOptions('position', function(PositionMapManager) {
            return PositionMapManager.buildConfig();
        });

        // Configure routes.
        $routeProvider
            .when('/database', {
                templateUrl: 'templates/database.html',
                controller: 'DatabaseController as c',
                resolve: routeResolve['database']
            })
            .when('/database_add', {
                templateUrl: 'templates/database_add.html',
                controller: 'DatabaseAddController as c',
                resolve: routeResolve['databaseAdd']
            })
            .when('/database_edition', {
                templateUrl: 'templates/database_edition.html',
                controller: 'DatabaseEditionController as c',
                resolve: routeResolve['databaseEdition']
            })
            .when('/replicate', {
                templateUrl: 'templates/replicate.html',
                controller: 'ReplicateController as c',
                resolve: routeResolve['replicate']
            })
            .when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'LoginController as c',
                resolve: routeResolve['login']
            })
            .when('/sync', {
                templateUrl: 'templates/sync.html',
                controller: 'SyncController as c',
                resolve: routeResolve['sync']
            })
            .when('/first_sync', {
                templateUrl: 'templates/firstSync.html',
                controller: 'FirstSyncController as c',
                resolve: routeResolve['sync']
            })
            .when('/forgot_password', {
                templateUrl: 'templates/forgot_password.html',
                resolve: routeResolve['forgotPassword']
            })
            .when('/cache/:layer', {
                templateUrl: 'templates/cache.html',
                controller: 'CacheController as c',
                resolve: routeResolve['cache']
            })
            .when('/main', {
                templateUrl: 'templates/main.html',
                controller: 'MainController as mc',
                resolve: routeResolve['main']
            })
            .when('/object/:type/:id?', {
                templateUrl: 'templates/object_edit.html',
                controller: 'ObjectEditController as c',
                resolve: routeResolve['objectEdit']
            })
            .when('/observation/:objectId/:obsId?', {
                templateUrl: 'templates/observation_edit.html',
                controller: 'ObservationEditController as c',
                resolve: routeResolve['observationEdit']
            })
            .when('/documents', {
                templateUrl: 'templates/documents.html',
                controller: 'DocumentController as c',
                resolve: routeResolve['documents']
            })
            .otherwise('/database');
    })

    .run(function ($rootScope, $location, $ionicPlatform, $cordovaFile, sContext,$window, $cordovaToast, $cordovaGeolocation) {

        // Wait for "deviceready" event.
        $ionicPlatform.ready(function () {

            // Hide the accessory bar above the keyboard for inputs.
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            }

            // Medias directory.
            sContext.mediaDir = cordova.file.externalDataDirectory + "medias/";
            $cordovaFile.checkDir(cordova.file.externalDataDirectory , "medias").then(
                angular.noop,
                function createDirectory() {
                    $cordovaFile.createDir(cordova.file.externalDataDirectory , "medias");
                    $cordovaFile.createFile(cordova.file.externalDataDirectory + "medias/", "_keepMtpOpen");
                });

            // Documents directory.
            sContext.docDir = cordova.file.externalDataDirectory + "documents/";
            $cordovaFile.checkDir(cordova.file.externalDataDirectory , "documents").then(
                angular.noop,
                function createDirectory() {
                    $cordovaFile.createDir(cordova.file.externalDataDirectory , "documents");
                    $cordovaFile.createFile(cordova.file.externalDataDirectory + "documents/", "_keepMtpOpen");
                });
        });
        // Listen some $rootScope events.
        $rootScope.$on('logoutSuccess', function() {
            $location.path('/login');
        });
    })

    .constant('routeResolve', {
        main: {
            sirsDoc: function(SirsDoc) {
                return SirsDoc.getOrLoad();
            }
        },
        objectEdit: {
            objectDoc: function($route, LocalDocument, EditionService) {
                var params = $route.current.params;
                if (params.id && params.id !== '') {
                    return LocalDocument.get(params.id);
                } else {
                    return LocalDocument.create(EditionService.newObject(params.type));
                }
            },
            refTypes: function(EditionService) {
                return EditionService.getReferenceTypes();
            },
            orientationsList : function (LocalDocument) {
                //@hb
                return LocalDocument.query('Element/byClassAndLinear', {
                    // startkey: ['fr.sirs.core.model.RefOrientationPhoto'],
                    // endkey: ['fr.sirs.core.model.RefOrientationPhoto',{}]
                }).then(function(results) {
                        console.log(results);
                        var matches = [];
                        results.forEach(function(elt) {
                            if (elt.key.indexOf('fr.sirs.core.model.RefOrientationPhoto') !== -1) {
                                matches.push(elt);
                            }
                        });
                        return matches;
                    });

            },
            cotesList: function (LocalDocument) {
                //@hb
                return LocalDocument.query('Element/byClassAndLinear', {
                    // startkey: ['fr.sirs.core.model.RefCote'],
                    // endkey: ['fr.sirs.core.model.RefCote',{}]
                }).then(function(results) {
                    console.log(results);
                    var matches = [];
                    results.forEach(function(elt) {
                        if (elt.key.indexOf('fr.sirs.core.model.RefCote') !== -1) {
                            matches.push(elt);
                        }
                    });
                    return matches;
                });
            },
            listTroncons: function (LocalDocument) {
                //@hb
                return LocalDocument.query('TronconDigue/streamLight');
            }
        },
        observationEdit: {
            objectDoc: function($route, sContext /*, LocalDocument*/) {
                return sContext.selectedObject;
                //return LocalDocument.get($route.current.params.objectId);
            }
        }
    });

