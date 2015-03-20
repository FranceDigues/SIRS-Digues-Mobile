var mm= new Array();


angular.module('controllers', ['ngCordova'])

.controller('MapCtrl', [ '$scope', '$ionicPlatform','$cordovaFile','$cordovaFileTransfer','$timeout','dbService','$log','olData', function($scope,$ionicPlatform,$cordovaFile,$cordovaFileTransfer,$timeout ,dbService, $log, olData) {



        $scope.tt=tt;
        $scope.cacheBoxPath = "[[[0,0],[1,1]]]";
        $log.debug($scope.cacheBoxPath)
        $scope.pititPath = pititPath;


        $scope.mCa =true; //mode Cache

        olData.getMap().then(function(map){

                var dragBox = new ol.interaction.DragBox({
                    condition: ol.events.condition.always,
                    style: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: [0, 0, 255, 1]
                        })
                    })
                });

                map.addInteraction(dragBox);

                $log.debug(map);
                $log.debug(map.getLayers().getArray());
                $log.debug(map.getLayers().getArray()[1].getSource());




                polygone = new ol.geom.Polygon([[[-120.313,33.118],[-109.766,20.281],[-87.617,32.823],[-101.504,51.385],[-121.895,51.385],[-129.453,46.784],[-120.313,33.118]]]);

                //var ring = [[-120.313,33.118],[-109.766,20.281],[-87.617,32.823],[-101.504,51.385],[-121.895,51.385],[-129.453,46.784],[-120.313,33.118]];
                //var polygon = new ol.geom.Polygon([ring]);
                polygone.transform('EPSG:4326', 'EPSG:3857');
                var feature = new ol.Feature(polygone);


                map.getLayers().getArray()[1].getSource().addFeature(
                    new ol.Feature({
                        geometry:polygone
                    })
                );
//brutforce
                //layer non angular
                vsPoly = new ol.source.Vector({
                    //create empty vector
                });
                vsPoly.addFeature(feature);

                //creation du calque
                lPoly = new ol.layer.Vector({
                    source: vsPoly,
                    style: new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: 'rgba(255, 255, 255, 0.6)'
                        }),
                        stroke: new ol.style.Stroke({
                            color: '#ffcc33',
                            width: 2
                        })
                    })
                });


                map.addLayer(lPoly);

                //vsPoly.addFeature(
                //    new ol.Feature({
                //        geometry:polygone
                //    })
                //);

                $log.debug(map.getLayers().getArray());


//instance ok
      /*          var wmsSource = new ol.source.ImageWMS({
                    url: 'http://demo.boundlessgeo.com/geoserver/wms',
                    params: {'LAYERS': 'ne:ne'},
                    serverType: 'geoserver',
                    crossOrigin: '',
                    opacity: 0.5,
                });

                var wmsLayer = new ol.layer.Image({
                    source: wmsSource
                });

                map.addLayer(wmsLayer);*/



            }


        );








/*        $log.debug(olData.getMap().resolve());

        $timeout(function(){
            var mapOl3 = olData.getMap();

            var dragBox = new ol.interaction.DragBox({
                condition: $scope.mCa,
                style: new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: [0, 0, 255, 1]
                    })
                })
            });

            mapOl3.addInteraction(dragBox);

        } , 5000);*/















        dbService.dbEssai.info().then(function (info) {
            console.log(info);
        })


        dbService.dbEssai.get("prems",function (error, doc) {
            if (error) {
                $log.debug(error);
            } else {
                $log.debug(doc);
            }
        })



        $scope.imageLoadingProgress =0;
        $scope.nbTile =0;
        $scope.imageTmp = null;
        $scope.HL = false; //Mode Hors Ligne
        $scope.zMin=0;
        $scope.zMax=0;


        $ionicPlatform.ready()
        //ionic.Platform.ready()
            .then(function() {
                //return $cordovaFile.createDir(directory, false);
                $log.debug("test");
                $cordovaFile.getFreeDiskSpace()
                    .then(function (success) {
                        $log.debug("free Space : " + success/1024)
                    }, function (error) {
                        $log.debug(error);
                    });

            });

        var interactions = ol.interaction.defaults({altShiftDragRotate:false, pinchRotate:false});

    angular.extend($scope,
        {

        centreCarte: {
            lat: 37.7,
            lon: -96.67,
            zoom: 3
        },
        layers: [
            {
                isCache:false,
                name: 'OSM',
                active: true,
                opacity: 0.3,
                source: {
                    type: 'OSM',
                    url:"http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                }},
            {
                isCache:true,
                name: 'OSM-Cache',
                active: false,
                opacity: 1,
                source: {
                    type: 'OSM',
                    url:"file:///data/data/com.ionic.map01/cache/"+"{z}/{x}/{y}.png" //TODO chemin selon plateforme
                }},
            {
                isCache:false,
                 name:"wms",
                 active: false,
                 opacity: 0.5,
                 source: {
                    type: 'ImageWMS',
                        url:'http://demo.opengeo.org/geoserver/wms',
                        params: {
                        LAYERS: 'topp:states'
                }}}],
                defaults:{
                events: {
                    map: [ 'singleclick', 'pointermove' ]
                }},

            controls: [
                { name: 'zoom', active: false },
                { name: 'rotate', active: false },
                { name: 'attribution', active: false }
            ],


            mouseposition: {},
            mouseclickposition: {},
            projection: 'EPSG:4326',
            markers:mm,  //FIXME zoom impossible si marker sur la carte

            switchMode: function() {

                $log.debug("layers before");
                $log.debug($scope.layers)

                $scope.layers.forEach(function(layer) {
                    if(layer.isCache){
                        layer.active  = $scope.HL;
                    }else{
                        layer.active  =! $scope.HL;
                    }
                })

                $log.debug("layers next");
                $log.debug($scope.layers);

            }

    });




        $scope.refreshCB = function(poly){

            $log.debug(poly);

            var gjsonPoly = gjsonCbStart;

            poly.forEach(function(p){

                gjsonPoly = gjsonPoly+'['+ p.lon+','+ p.lat+'],';
            })

            gjsonPoly= gjsonPoly+'['+ poly[0].lon+','+ poly[0].lat+']';


            gjsonPoly= gjsonPoly+gjsonCbEnd;

            $log.debug(gjsonPoly);
            $log.debug(JSON.parse(gjsonPoly));

           return {
                source: {
                    type: 'GeoJSON',
                        geojson: {
                        object: JSON.parse(gjsonPoly),
                            projection: 'EPSG:3857'
                    }
                },
                style: {
                    fill: {
                        color: 'rgba(255, 0, 0, 0.6)'
                    },
                    stroke: {
                        color: 'white',
                            width: 3
                    }
                }};
        };


        $scope.cacheBox = JSON.parse(gjsonCbStart+gjsonCbEnd);




        $scope.$on('openlayers.map.pointermove', function(event, coord) {
            $scope.$apply(function() {
                if ($scope.projection === coord.projection) {
                    $scope.mouseposition = coord;
                } else {
                    var p = ol.proj.transform([ coord.lon, coord.lat ], coord.projection, $scope.projection);
                    $scope.mouseposition = {
                        lat: p[1],
                        lon: p[0],
                        projection: $scope.projection
                    }
                }
            });
        });

        $scope.$on('openlayers.map.singleclick', function(e, coord) {
            $scope.$apply(function() {
                if ($scope.projection === coord.projection) {
                    $scope.mouseclickposition = coord;
                } else {
                    var p = ol.proj.transform([coord.lon, coord.lat], coord.projection, $scope.projection);
                    $scope.mouseclickposition = {
                        lat: Math.round(p[1]*1000)/1000,
                        lon: Math.round(p[0]*1000)/1000,
                        projection: $scope.projection
                    }
                }


                $scope.markers.push({
                    name: "t1",
                    lat: $scope.mouseclickposition.lat,
                    lon: $scope.mouseclickposition.lon
                })


                $scope.imageLoadingProgress = 0;

                ////TODO UI de selection
                //    dl tuile
       /*         if ($scope.markers[1]) { //TODO retangle de selection

                    $ionicPlatform.ready()
                        //ionic.Platform.ready()
                        .then(function () {

                            for(var i = $scope.zMin; i <= $scope.zMax ; i++){
                                $scope.getAllTilesFromRectZoomStatic($scope.markers[0], $scope.markers[1], i); //TODO gestion multi lvl
                            }
                        });
                };*/

                //cachebox layer angular
              //  $scope.cacheBox = $scope.refreshCB($scope.markers);


                //layer non angular
               vsPoly.clear();
                var cbox =  new ol.geom.Polygon(asPolygon($scope.markers));
                cbox.transform('EPSG:4326', 'EPSG:3857');


                vsPoly.addFeature(
                    new ol.Feature({
                        geometry: cbox
                    })
                );

                $log.debug( JSON.stringify(asPolygon($scope.markers)));
                $scope.cacheBoxPath =  cbox ;

            });
        });


        $scope.downloadTile = function(tile){


            var url = "http://a.tile.openstreetmap.org/"+tile.z+"/"+tile.x+"/"+tile.y+".png";
            var targetPath = cordova.file.cacheDirectory + tile.z + "/" + tile.x + "/" + tile.y +".png"; //TODO gestion des dossier pour z et x

            $log.debug("FilePath : " + targetPath);
            $log.debug("URL : " + url);

            $cordovaFileTransfer.download(url, targetPath)
                .then(function (result) {
                    // Success!
                    $log.debug('Dl done : ');
                    $log.debug(result);
                    $scope.imageLoadingProgress++; //declaration de la fin du Dl de la tuile
                }, function (err) {
                    // Error
                    $log.debug('Dl fail :');
                    $log.debug(err);
                }, function (progress) {
                    $timeout(function () {
                        $scope.imageTmp = targetPath;
                        $log.debug($scope.imageTmp);
                    })
                });

        }


        $scope.getAllTilesFromRectZoomStatic = function(p1, p2, zoom) {

            outBoxMin = getTileURL(p1.lat, p1.lon, zoom);
            outBoxMax = getTileURL(p2.lat, p2.lon, zoom);

            $log.debug("max")
            $log.debug(outBoxMax)
            $log.debug("min")
            $log.debug(outBoxMin)

            if(outBoxMin.x > outBoxMax.x) { //TODO replace avec un Min-Max
                outTmp1 = outBoxMin.x;
                outBoxMin.x = outBoxMax.x;
                outBoxMax.x = outTmp1;
            }
            if(outBoxMin.y > outBoxMax.y) {
                outTmp1 = outBoxMin.y;
                outBoxMin.y = outBoxMax.y;
                outBoxMax.y = outTmp1;
            }


            $scope.nbTile = ( outBoxMax.x - outBoxMin.x ) * ( outBoxMax.y - outBoxMin.y );

            $log.debug("x : " + ( outBoxMax.x - outBoxMin.x ));
            $log.debug("y : " + ( outBoxMax.y - outBoxMin.y ));
            $log.debug("nb dl attendu : "+$scope.nbTile);


            yi = 0;
            while(outBoxMin.x <= outBoxMax.x) { //parcour des tuile x -> y
                while(outBoxMin.y + yi <= outBoxMax.y) {
                    $log.debug("*** tuile en cours *** " + outBoxMin.x + "/" + outBoxMin.y);
                    //$log.debug("run id : "+ixi);
                    //ixi++;
                    //recup de la tuile
                    $scope.downloadTile(outBoxMin);
                    yi++;
                }
                outBoxMin.x++;
                yi=0;
                //$log.debug(outBoxMin.x );
            }
        }

        //TODO A voir
        //$rootScope.$on('$cordovaNetwork:online', function(event, networkState){ $log.debug("true")})

} ]);


function getTileURL(lat, lon, zoom) {
    //$log.debug("inputGetURl [lat :"+lat+" lon :"+lon+" zoom : "+zoom+" ]");

    var xtile = parseInt(Math.floor( (lon + 180) / 360 * (1<<zoom) ));
    var ytile = parseInt(Math.floor( (1 - Math.log(Math.tan(lat.toRad()) + 1 / Math.cos(lat.toRad())) / Math.PI) / 2 * (1<<zoom) ));


    //$log.debug( "" + zoom + "/" + xtile + "/" + ytile);


    tileUrl = { "z":zoom, "x":xtile, "y":ytile }; //objet pour manipuler les coord de tuile z/x/y
    //TODO faire un vrai objet avec de proto compare
    //TODO etudier les objets  JS
    return tileUrl;
}

/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function() {
        return this * Math.PI / 180;
    }
}



function asPolygon(pArray){

    var coordArray = new Array();

    pArray.forEach(function(p){
        coordArray.push(new Array(p.lon, p.lat));
    });


    coordArray.push( new Array(pArray[0].lon, pArray[0].lat) ); //TODO methode de classe ou abandon du point.

    return new Array(coordArray);
}

















//serveur de fichier fonction :

function onDeviceReady() {
    httpd = ( cordova && cordova.plugins && cordova.plugins.CorHttpd ) ? cordova.plugins.CorHttpd : null;
}
function updateStatus() {
    document.getElementById('location').innerHTML = "document.location.href: " + document.location.href;
    if( httpd ) {
        /* use this function to get status of httpd
         * if server is up, it will return http://<server's ip>:port/
         * if server is down, it will return empty string ""
         */
        httpd.getURL(function(url){
            if(url.length > 0) {
                document.getElementById('url').innerHTML = "server is up: <a href='" + url + "' target='_blank'>" + url + "</a>";
            } else {
                document.getElementById('url').innerHTML = "server is down.";
            }
        });
        // call this function to retrieve the local path of the www root dir
        httpd.getLocalPath(function(path){
            document.getElementById('localpath').innerHTML = "<br/>localPath: " + path;
        });
    } else {
        alert('CorHttpd plugin not available/ready.');
    }
}
function startServer( wwwroot ) {
    if ( httpd ) {
        // before start, check whether its up or not
        httpd.getURL(function(url){
            if(url.length > 0) {
                //document.getElementById('url').innerHTML = "server is up: <a href='" + url + "' target='_blank'>" + url + "</a>";
                $log.debug("server is up:"+ url );
            } else {

                /* wwwroot is the root dir of web server, it can be absolute or relative path
                 * if a relative path is given, it will be relative to cordova assets/www/ in APK.
                 * "", by default, it will point to cordova assets/www/, it's good to use 'htdocs' for 'www/htdocs'
                 * if a absolute path is given, it will access file system.
                 * "/", set the root dir as the www root, it maybe a security issue, but very powerful to browse all dir
                 */

                httpd.startServer({
                    'www_root' : wwwroot,
                    'port' : 8080,
                    'localhost_only' : false
                }, function( url ){
                    // if server is up, it will return the url of http://<server ip>:port/
                    // the ip is the active network connection
                    // if no wifi or no cell, "127.0.0.1" will be returned.
                    $log.debug("server local url:"+ url );

                    //document.getElementById('url').innerHTML = "server is started: <a href='" + url + "' target='_blank'>" + url + "</a>";
                }, function( error ){
                    $log.debug("server fail"+ error );

                    //document.getElementById('url').innerHTML = 'failed to start server: ' + error;
                });
            }
        });
    } else {
        alert('CorHttpd plugin not available/ready.');
    }
}
function stopServer() {
    if ( httpd ) {
        // call this API to stop web server
        httpd.stopServer(function(){
            //document.getElementById('url').innerHTML = 'server is stopped.';
        },function( error ){
            //document.getElementById('url').innerHTML = 'failed to stop server' + error;
        });
    } else {
        alert('CorHttpd plugin not available/ready.');
    }
}