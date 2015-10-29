/**
 * Created by Roch Dardie on 15/03/15.
 */



var app = angular.module('SirsMobile', [
    'ionic',
    'ionic.service.core',
    'ionic.service.deploy',
    'ngCordova',
    'ngRoute',
    'ol',

    'uuid4',
    'angular-md5',
    'rzModule',
    'pouchdb',

    'module_app.controllers',
    'module_app.services',
    'module_app.directives',

    'module_rde.data.services',
    'module_rde.note',
    'module_rde.profiling']);

app.run(function ($ionicPlatform, $cordovaFile, $log, sContext, uuid4) {
    //sMapLayer
    $ionicPlatform.ready(function () {



        //sMapLayer.list;
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }



        //init File Directory on SD card
        //todo add support for multi storage capabilities (sd/internal)
        $log.debug("CORDOVA FILE INIT")
        //repertoire des photo nouvellement aqcise et non encore syncronisé.
        $cordovaFile.checkDir(cordova.file.externalDataDirectory , "nouvellesPhotos").then(function (success) {
            // success
        }, function (error) {
            // error
            $cordovaFile.createDir(cordova.file.externalDataDirectory , "nouvellesPhotos");
            $cordovaFile.createFile(  cordova.file.externalDataDirectory + "nouvellesPhotos/" ,"_keepMtpOpen");
        });

        sContext.photoDir = cordova.file.externalDataDirectory + "nouvellesPhotos/";

//repertoire de notes
        $cordovaFile.checkDir(cordova.file.externalDataDirectory , "notes").then(function (success) {
            // success
        }, function (error) {
            // error
            $cordovaFile.createDir(cordova.file.externalDataDirectory , "notes");
            $cordovaFile.createFile(  cordova.file.externalDataDirectory + "notes/" ,"_keepMtpOpen");
        });

        sContext.notesDir = cordova.file.externalDataDirectory + "notes/";

        //repertoire de notes
        $cordovaFile.checkDir(cordova.file.externalDataDirectory , "documents").then(function (success) {
            // success
        }, function (error) {
            // error
            $cordovaFile.createDir(cordova.file.externalDataDirectory , "documents");
            $cordovaFile.createFile(  cordova.file.externalDataDirectory + "documents/" ,"_keepMtpOpen");
        });

        sContext.docDir = cordova.file.externalDataDirectory + "documents/";


        //TODO à gerber :
        window.uuid4 = uuid4;
    });
})

    .config(function ($routeProvider, $ionicConfigProvider, olMapProvider, sStyleFactoryProvider) {

              //$ionicAccountProvider.identify({
              //      app_id: '1bb2cb28'
              //});

        $ionicConfigProvider.tabs.position('bottom'); // other values: top

        olMapProvider.provideOptions('main', function(MapManager) {
            return MapManager.buildConfig();
        });

        olMapProvider.provideOptions('cache', function(CacheMapManager) {
            return CacheMapManager.buildConfig();
        });

        $routeProvider
            .when('/database', {
                templateUrl: 'templates/database.html',
                controller: 'DatabaseController as c'
            })
            .when('/database_add', {
                templateUrl: 'templates/database_add.html',
                controller: 'DatabaseAddController as c'
            })
            .when('/replicate', {
                templateUrl: 'templates/replicate.html',
                controller: 'ReplicateController as c'
            })
            .when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'LoginController as c'
            })
            .when('/sync', {
                templateUrl: 'templates/sync.html',
                controller: 'SyncController as c'
            })
            .when('/forgot_password', {
                templateUrl: 'templates/forgot_password.html'
            })
            .when('/cache/:layer', {
                templateUrl: 'templates/cache.html',
                controller: 'CacheController as c'
            })
            .when('/note', {
                cache: false,
                templateUrl: 'module_rde/note/note.html',
                controller: 'cNote as c'
            })
            .when('/main', {
                templateUrl: 'templates/main.html',
                controller: 'MainController as mc'
            })
            .when('/edition/:type/:id?', {
                templateUrl: 'templates/objectEdition.html',
                controller: 'ObjectEditionController as c',
                reloadOnSearch : false,
                resolve: {
                    objectDoc: function($log, $route, LocalDocument, EditionService) {
                        var params = $route.current.params;
                        if (params.id && params.id !== '') {
                            return LocalDocument.get(params.id);
                        } else {
                            return LocalDocument.create(EditionService.newObject(params.type));
                        }
                    }
                }
            })
            .when('/documents', {
                templateUrl: 'templates/documents.html',
                controller: 'DocumentController as c'
            })
            .otherwise('/database');

        // Setup layer colors.
        var colors = [];
        for (var i = 0; i < 100; i++) {
            colors.push([
                Math.floor(Math.random() * 256),
                Math.floor(Math.random() * 256),
                Math.floor(Math.random() * 256),
                1
            ]);
        }
        sStyleFactoryProvider.setColors(colors);

        // Define the EPSG:2154 projection. Used to transform geometries from their native
        // projection (EPSG:2154) to the map projection (EPSG:3857, no definition is needed
        // because OpenLayers supports this projection natively).
        proj4.defs('EPSG:2154', '+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
    });

