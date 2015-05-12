/**
 * Created by Roch Dardie on 15/03/15.
 */

var app = angular.module('cartoMobile', [
    'ionic',
    'ngCordova',
    'rzModule',
    'pouchdb',
    'openlayers-directive',
    'controllers',
    'controllers.map',
    //'controllers.mapCache',
    'module_rde.geoCache',
    'module_rde.data.services.pipe',
    'module_rde.data.services.source',
    'controllers.menus',
    'filter.custom',
    //'data.services.pipe',
    //'data.services.source',
    'device.services',
    'data.services']);

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
            .state('signin', {
                url: '/sign-in',
                templateUrl: 'templates/sign-in.html',
                controller: 'SignInCtrl'
            })
            .state('menu', {
                url: '/menu',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'sideMenu'
            })
            .state('loading', {
                url: '/loading',
                templateUrl: 'templates/loading.html',
                controller: 'loader'
                //resolve:
                //controllerAs:'c'
            })
            .state('forgotpassword', {
                url: '/forgot-password',
                templateUrl: 'templates/forgot-password.html'
            })
            .state('menu.home', {
                url: '/home',
                views: {
                    'menuContent': {
                        controller: "HomeCtrl",
                        templateUrl: 'templates/home.html'
                    }
                }
            })
            .state('menu.doc', {
                url: '/doc',
                views: {
                    'menuContent': {
                        controller: "DocCtrl",
                        templateUrl: 'templates/doc.html'
                    }
                }
            })
            .state('menu.tabs', {
                url: '/tab',
                views: {
                    'menuContent': {
                        controller: 'TabsCtrl',
                        templateUrl: 'templates/tabs.html'
                    }
                }
            })
            .state('menu.tabs.map', {
                url: '/map',
                views: {
                    'home-tab': {
                        templateUrl: 'templates/tab-map.html',
                        controller: 'MapCtrl'
                    }
                }
            })
            .state('menu.tabs.settings', {
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
            })
            .state('formGenerator', {
                url: '/formGenerator',
                controller: 'FormListCtrl',
                templateUrl: 'templates/formGenerator.html'
            })
            .state('menu.mask', {
                url: '/mask',
                views: {
                    'menuContent': {
                        controller: 'MskCtrl',
                        templateUrl: 'templates/mask.html'
                    }
                }
            });


        //$urlRouterProvider.otherwise('/tab');
        $urlRouterProvider.otherwise('/sign-in');
    });

