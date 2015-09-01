/**
 * Created by Roch Dardie on 15/03/15.
 */



var app = angular.module('SirsMobile', [
    'ionic',
    'ionic.service.core',
    'ionic.service.deploy',
    'ngCordova',
    
    

    'uuid4',
    'angular-md5',
    'rzModule',
    'pouchdb',
    'openlayers-directive',


    'module_app.controllers',
    'module_app.services',
    'module_app.directives',

    'module_rde.data.services',
    'module_rde.geoCache',
    'module_rde.note',


    'module_rde.profiling',



    'filter.custom'







     ]);

app.run(function ($ionicPlatform,$cordovaFile,$log,sContext,uuid4) {
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

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, sStyleFactoryProvider) {

              //$ionicAccountProvider.identify({
              //      app_id: '1bb2cb28'
              //});

        $ionicConfigProvider.tabs.position('bottom'); //other values: top

        $stateProvider
            .state('geoCache', {
                url: '/geoCache',
                controller: 'cGeoCache as c',
                templateUrl: 'module_rde/geoCache/geoCache.html'
            })
            .state('init', {
                url: '/init',
                templateUrl: 'templates/init.html',
                controller: 'cInit as c'
            })
            .state('signin', {
                url: '/sign-in',
                templateUrl: 'templates/sign-in.html',
                controller: 'cSignIn as c'
            })
            .state('note', {
                url: '/note',
                cache: false,
                templateUrl: 'module_rde/note/note.html',
                controller: 'cNote as c'
            })

            .state('home', {
                url: '/home',
                abstract: true,
                templateUrl: 'templates/home.html',
                controller: 'cHud as c'
            })
            .state('loading', {
                url: '/loading',
                templateUrl: 'templates/loading.html',
                controller: 'cLoader as c'
            })
            .state('forgotpassword', {
                url: '/forgot-password',
                templateUrl: 'templates/forgot-password.html'
            })
            .state('home.map', {
                url: '/map',
                views: {
                    'home-panel': {
                        templateUrl: 'templates/map.html',
                        controller: 'cMap as c'
                    }
                }
            })

            .state('forms', {
                url: '/forms',
                abstract: true,
                templateUrl: 'templates/formApp/forms.html',
                controller: 'cForm as c'
            })
            .state('forms.desordre', {
                url: '/desordre',
                //templateUrl: 'templates/formApp/formDesordre.html'
                views: {
                    'central-panel': {
                        templateUrl: 'templates/formApp/formDesordre.html',
                        //controller: 'cPhoto as c'
                    }
                }
            })
            .state('forms.photo', {
                url: '/photo',
                //cache: false,
                views: {
                    'central-panel': {
                        templateUrl: 'templates/formApp/photo.html',
                        controller: 'cPhoto as c'
                    }
                }
            })
            .state('forms.crete', {
                url: '/crete',
                templateUrl: 'templates/formApp/formCrete.html'
            })

            .state('porteDocument', {
                url: '/documents',
                templateUrl: 'templates/porteDocument.html',
                controller: 'cPorteDocument as c'
            })

            .state('newDesordre', {
                url: '/newDesordre',
                controller: 'cNewDesordre as c',
                templateUrl: 'templates/formApp/newDesordre.html'
            });


        $urlRouterProvider.otherwise('/init');

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

