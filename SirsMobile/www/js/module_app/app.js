/**
 * Created by Roch Dardie on 15/03/15.
 */

var app = angular.module('SirsMobile', [
    'ionic',
    'ngCordova',
    'rzModule',
    'pouchdb',
    'openlayers-directive',
    'controllers.map',
    'module_rde.geoCache',
    'module_rde.data.services.pipe',
    'module_rde.data.services.source',
    'controllers.menus',
    'filter.custom',
    'module_app.services.device',

    'ctrl.menus.signIn',
    'ctrl.menus.init'


     ]);

app.run(function ($ionicPlatform) {
    //sLayer
    $ionicPlatform.ready(function () {



        //sLayer.list;
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
                controller: 'InitCtrl as c'
            })
            .state('signin', {
                url: '/sign-in',
                templateUrl: 'templates/sign-in.html',
                controller: 'SignInCtrl'
            })
            .state('home', {
                url: '/home',
                abstract: true,
                templateUrl: 'templates/home.html',
                controller: 'sidemenu'
            })
            .state('loading', {
                url: '/loading',
                templateUrl: 'templates/loading.html',
                controller: 'loader'
            })
            .state('forgotpassword', {
                url: '/forgot-password',
                templateUrl: 'templates/forgot-password.html'
            })
            .state('home.tabs', {
                url: '/tab',
                views: {
                    'menuContent': {
                        controller: 'TabsCtrl',
                        templateUrl: 'templates/tabs.html'
                    }
                }
            })
            .state('home.tabs.map', {
                url: '/map',
                views: {
                    'home-tab': {
                        templateUrl: 'templates/tab-map.html',
                        controller: 'MapCtrl'
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
        $urlRouterProvider.otherwise('/sign-in');
    });

