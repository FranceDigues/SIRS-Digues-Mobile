// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

//http://localhost:8100/

angular.module('hybride_0', [
                            'ionic',
                            'ol',
                            'hybride_0.controllers',
                           // 'hybridService'

                          ])

.run(function($ionicPlatform) {
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

.config(function($stateProvider,olMapProvider
        , $urlRouterProvider
                  //olOptions, //nécésite de definir un objet const?

    ) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  //$stateProvider

        /*//mode debug
        PouchDB.debug.enable('*');

        //essai pouchDB start
        var db = new PouchDB('tileDB');
        //quelle db tourne derriere
        console.log("DATABASE PROVIDER  :"+ db.adapter);

        //info db
        db.info().then(function (info) {
            console.log(info);
        })

        db.put(
            {
                "_id":"test",
                "sujet":"database",
                "desc":"premier essais"
            },function(error,doc){


                db.get("test",function (error, doc) {
                    if (error) {
                        // oh noes! we got an error
                    } else {
                        db.remove(doc);
                    }
                })

            }
        );*/



        //essai pouchDB end

      var wmsSource = new ol.source.TileWMS({
        url: 'http://demo.boundlessgeo.com/geoserver/wms',
        params: {'LAYERS': 'topp:states','TILED': true},
        serverType: 'geoserver',
        crossOrigin: ''
      });

      var wmsLayer = new ol.layer.Tile({
        source: wmsSource,
        opacity:0.6
      });


      OsmLayer =  new ol.layer.Tile({ source: new ol.source.OSM()});

      // Main map configuration.
     olMapProvider.provideOptions('mapView',{

              //layers: [ })],
              layers: [ OsmLayer,wmsLayer],
              view: new ol.View({ center: ol.proj.transform( [-102,36],'EPSG:4326', 'EPSG:3857'), zoom: 5 })
     });  //pas sans option

    //console.log(wmsLayer.getTileUrlFunction());



       /* getAllTiles(
                    transform( [-102,36],'EPSG:4326', 'EPSG:3857'),
                    transform( [-101,37],'EPSG:4326', 'EPSG:3857'));*/


});


/*
function getAllTiles(coord1, coord2) {
    out1 = getTileURL(coord1, 10);
    out2 = getTileURL(coord2, 10);

    $("#output").html("zoom ------ " + out1[0] + "<br>from " + out1[1] + " to " + out2[1] + "<br>from " + out1[2] + " to " + out2[2]);

}*/
