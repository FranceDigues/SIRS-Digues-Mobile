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
    'module_app.controllers',
    'module_app.services',
    'module_app.directives',
    'module_rde.note'])

    .config(function ($routeProvider, $ionicConfigProvider, olMapProvider, routeResolve) {

        // Configure Ionic.
        $ionicConfigProvider.tabs.position('bottom'); // other values: top

        // Configure OpenLayers maps.
        olMapProvider.provideOptions('main', function(MapManager) {
            return MapManager.buildConfig();
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

        // Define the EPSG:2154 projection. Used to transform geometries from their native
        // projection (EPSG:2154) to the map projection (EPSG:3857, no definition is needed
        // because OpenLayers supports this projection natively).
        proj4.defs('EPSG:2154', '+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
    })

    .run(function ($rootScope, $location, $ionicPlatform, $cordovaFile, sContext) {

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
            }
        },
        observationEdit: {
            objectDoc: function($route, sContext /*, LocalDocument*/) {
                return sContext.selectedObject;
                //return LocalDocument.get($route.current.params.objectId);
            }
        }
    });

