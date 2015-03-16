// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

//http://localhost:8100/

angular.module('hybride_0', [
                            'ionic',
                            'ngCordova',
                            'rzModule',
                            //'ol',
                            'openlayers-directive',
                            'controllers'
                           // 'hybridService'
                          ])

.run(function($ionicPlatform,$cordovaFile) {
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





/*
      $cordovaFile.getFreeDiskSpace()
          .then(function (success) {
              console.log(sussess/1024)
          }, function (error) {
              // error
          });

*/



  });





/*        $ionicPlatform.ready(function() {})
            .then(function() {
                //return $cordovaFile.createDir(directory, false);




            });*/

})

.config(function($stateProvider
        , $urlRouterProvider
                  //olOptions, //nécésite de definir un objet const?

    ) {




});








