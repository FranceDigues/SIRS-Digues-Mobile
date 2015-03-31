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
        .state('signin', {
            url: '/sign-in',
            templateUrl: 'templates/sign-in.html',
            controller: 'SignInCtrl'
        })
        .state('forgotpassword', {
            url: '/forgot-password',
            templateUrl: 'templates/forgot-password.html'
        })
        .state('home', {
            url: '/home',
            controller :"HomeCtrl",
            templateUrl: 'templates/home.html'
        })
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
        })
        .state('formGenerator', {
            url: '/formGenerator',
            controller: 'FormListCtrl',
            templateUrl: 'templates/formGenerator.html'
        })
        .state('mask', {
            url: '/mask',
            controller: 'MskCtrl',
            templateUrl: 'templates/mask.html'
        });


    //$urlRouterProvider.otherwise('/tab');
        $urlRouterProvider.otherwise('/sign-in');
});

app.controller('TabsCtrl', function($scope, $ionicSideMenuDelegate,sLayer,$log) {

    $scope.layers = sLayer.list;

    $log.debug(sLayer.json);

    $scope.openMenu = function () {
         $ionicSideMenuDelegate.toggleLeft();

    }

});

app.controller('sideMenu', function($scope,$state, $ionicSideMenuDelegate,sLayer,$log,sEventSuperviseur) { //kifkif un global controler non?

    $scope.layers = sLayer.list;
    $scope.sEventSuperviseur = sEventSuperviseur;

    //$log.debug( $scope.sEventSuperviseur);

    $scope.openMenu = function () {
          $ionicSideMenuDelegate.toggleLeft();
    }

    $scope.newCache = function() {

        sEventSuperviseur.event.sideMenu=false;
        $state.go('cache');
    };

});


app.controller('HomeTabCtrl', function($scope, $ionicSideMenuDelegate) {

});

app.controller('HomeCtrl', function($scope,$state,$cordovaFileOpener2,$log) {

    $scope.visu = function() {
        $state.go('tabs.map');
    };

    $scope.mask = function() {
        $state.go('mask');
    };

    $scope.form = function() {
        $state.go('formGenerator');
    };



    $scope.openPdf = function(){

        $cordovaFileOpener2.open(
            '/sdcard/Download/cv.pdf',
            'application/pdf'
        ).then(function(res) {
                $log.debug(res)
            }, function(err) {
                $log.debug(err)
            });

    }


});

app.controller('SignInCtrl', function($scope, $state, sPouch,$log) {
//app.controller('SignInCtrl', function($scope, $state) {

    //var usr = sPouch.usr.allDocs;

    $scope.signIn = function(user) {
        console.log('Sign-In', user);

        //sPouch.usr.query('name_index', {key: 'mok-sensei'}).then(function(result) {
        sPouch.usr.query('name_index', {key: user.username}).then(function(result) {
            // do something with result
            $log.debug(result);

            $log.debug(result.rows[0].value);
            $log.debug(parseInt( user.password));

            if(result.rows[0].value == parseInt( user.password) )   $state.go('home');

        });
    };


    $scope.logout = function() {
        $state.go('signin');
    };

    $scope.home = function() {
        $state.go('home');
    };

})