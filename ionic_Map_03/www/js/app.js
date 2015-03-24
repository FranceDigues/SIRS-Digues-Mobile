var app = angular.module('cartoMobile', [
    'ionic',
    'ngCordova',
    'rzModule',
    'pouchdb',
    'openlayers-directive',
    'controllers',
    'data.services']);

app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
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
    .config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

        $ionicConfigProvider.tabs.position('bottom'); //other values: top

    $stateProvider
        .state('tabs', {
            url: '/tab',
            controller: 'TabsCtrl',
            templateUrl: 'templates/tabs.html'
        })
        .state('tabs.map', {
            url: '/map',
            views: {
                'home-tab': {
                    templateUrl: 'templates/tab-map.html',
                    controller: 'MapCtrl'
                }
            }
        })
        .state('tabs.settings', {
            url: '/settings',
            views: {
                'settings-tab': {
                    templateUrl: 'templates/settings.html'
                }
            }
        })
        .state('cache', {
            url: '/cache',
            controller: 'CacheCtrl',
            templateUrl: 'templates/cache.html'
        });

    $urlRouterProvider.otherwise('/tab');
});

app.controller('TabsCtrl', function($scope, $ionicSideMenuDelegate,sLayer,$log) {

    $scope.layers = sLayer.list;

    $log.debug(sLayer.json);

    $scope.openMenu = function () {
         $ionicSideMenuDelegate.toggleLeft();

    }

});

app.controller('sideMenu', function($scope, $ionicSideMenuDelegate,sLayer,$log,sEventSuperviseur) { //kifkif un global controler non?

    $scope.layers = sLayer.list;
    $scope.sEventSuperviseur = sEventSuperviseur;

    //$log.debug( $scope.sEventSuperviseur);

    $scope.openMenu = function () {
          $ionicSideMenuDelegate.toggleLeft();
    }

});


app.controller('HomeTabCtrl', function($scope, $ionicSideMenuDelegate) {

});

app.controller('AboutCtrl', function($scope, $ionicSideMenuDelegate) {
    $scope.openMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    }
});