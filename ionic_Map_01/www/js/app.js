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
                            'pouchdb',
                            'openlayers-directive',
                            'controllers',
                            'hybridService'
                          ])

.run(function($ionicPlatform,$cordovaFile,$log,$http) {
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

      var db = new PouchDB('test');
      var remoteCouch = 'http://10.0.2.2:5984/mobile_hybride/'
*/



/*
      $http.get(remoteCouch).
          success(function(data, status, headers, config) {
              // this callback will be called asynchronously
              // when the response is available
              $log.debug(data);
          }).
          error(function(data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
              $log.debug(data);
          });*/


     //var rep = db.replicate.from(remoteCouch);

      //var rep = PouchDB.sync(db, remoteCouch).on('complete', function (info) {
      //        // handle complete
      //        $log.debug(info);
      //    }).on('error', function (err) {
      //        // handle error
      //        $log.debug(err);
      //    });

          //$log.debug(rep);

      //db.info().then(function (info) {
      //    console.log(info);
      //})



      //var rep = PouchDB.replicate('test', remoteCouch, {
      //    live: true,
      //    retry: true
      //}).on('change', function (info) {
      //    // handle change
      //    $log.debug(info);
      //
      //}).on('paused', function () {
      //    // replication paused (e.g. user went offline)
      //}).on('active', function () {
      //    // replicate resumed (e.g. user went back online)
      //}).on('denied', function (info) {
      //    // a document failed to replicate, e.g. due to permissions
      //    $log.debug(info);
      //
      //}).on('complete', function (info) {
      //    // handle complete
      //    $log.debug(info);
      //}).on('error', function (err) {
      //    // handle error
      //    $log.debug(err);
      //});





  });

})

.config(function($stateProvider, $urlRouterProvider) {

        $stateProvider

            //setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })
            .state('tab.map', {
                url: '/map',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/tab-map.html',
                        controller: 'MapCtrl'
                        /*
                                resolve:{
                                map:function(olData){
                                return olData.getMap();
                            }
                        }*/
                    }
                }
            })



});








