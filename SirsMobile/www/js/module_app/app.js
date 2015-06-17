/**
 * Created by Roch Dardie on 15/03/15.
 */

var app = angular.module('SirsMobile', [
    'ionic',
    'ngCordova',
    'angular-md5',
    'rzModule',
    'pouchdb',
    'openlayers-directive',


    'module_app.controllers',
    'module_app.services.device',
    'module_app.data.services.applayer',

    'module_rde.data.services',
    'module_rde.geoCache',
    'module_rde.note',



    'filter.custom'




     ]);

app.run(function ($ionicPlatform) {
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
    });
})
    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $ionicConfigProvider.tabs.position('bottom'); //other values: top

        $stateProvider
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
                controller: 'cLoader'
            })
            .state('forgotpassword', {
                url: '/forgot-password',
                templateUrl: 'templates/forgot-password.html'
            })
            //.state('home.tabs', {
            //    url: '/tab',
            //    views: {
            //        'menuContent': {
            //            controller: 'cTabs',
            //            templateUrl: 'templates/tabs.html'
            //        }
            //    }
            //})
            //.state('home.tabs.map', {
            //    url: '/map',
            //    views: {
            //        'map': {
            //            templateUrl: 'templates/tab-map.html',
            //            controller: 'cMap'
            //        }
            //    }
            //})
            //.state('home.map', {
            //    url: '/map',
            //    views: {
            //                'map': {
            //                    templateUrl: 'templates/tab-map.html',
            //                    controller: 'cMap'
            //                }
            //            }
            //})
            .state('home.map', {
                url: '/map',
                views: {
                    'home-panel': {
                        templateUrl: 'templates/map.html',
                        controller: 'cMap'
                    }
                }
            })

            .state('home.tAddDesordre', {
                url: '/tAddDesordre',
                views: {
                    'tribord-panel': {
                        templateUrl: 'templates/sideMenu/tribord/addDesordre.html'
                        //controller: 'cMap'
                    }
                }
            })



            .state('home.tabs.settings', {
                url: '/settings',
                views: {
                    'settings-tab': {
                        templateUrl: 'templates/settings.html',
                        controller: 'SettingsCtrl'
                    }
                }
            })
            .state('cache', {
                url: '/cache',
                controller: 'cGeoCache as c',
                //controllerAs:'c',
                templateUrl: 'module_rde/geoCache/geoCache.html'
            });


        //$urlRouterProvider.otherwise('/tab');
        $urlRouterProvider.otherwise('/init');
    });

