var mm= new Array();
var httpd = null;


angular.module('controllers', [
    'ngCordova'])

.controller('MapCtrl', [ '$scope', '$ionicPlatform','$cordovaFile','$cordovaFileTransfer','$timeout','$log', function($scope,$ionicPlatform,$cordovaFile,$cordovaFileTransfer,$timeout,$log) {
        //,$cordovaFile
// , $cordovaFileTransfer, $cordovaFile

        $scope.imageLoadingProgress =0;
        $scope.nbTile =0;
        $scope.imageTmp = null;

        $scope.HL = false; //Mode Hors Ligne

        $ionicPlatform.ready()
        //ionic.Platform.ready()
            .then(function() {
                //return $cordovaFile.createDir(directory, false);
                console.log("test");
                $cordovaFile.getFreeDiskSpace()
                    .then(function (success) {
                        console.log("free Space : " + success/1024)
                    }, function (error) {
                        console.log(error);
                    });



                onDeviceReady();
                //demarage du serveur de fichier
                startServer( "file:///data/data/com.ionic.map01/cache/" );





            });



        $ionicPlatform.ready()
            //ionic.Platform.ready()
            .then(function () {

                $log.debug("cordovaFile"+ cordova.file.cacheDirectory);



                angular.extend($scope,
                    {

                        centreCarte: {
                            lat: 37.7,
                            lon: -96.67,
                            zoom: 3
                        },
                        layers: [
                            {
                                isCache: false,
                                name: 'OSM',
                                active: true,
                                opacity: 0.5,
                                source: {
                                    type: 'OSM',
                                    url: "http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                }
                            },
                            {
                                isCache: true,
                                name: 'OSM-Cache',
                                active: false,
                                opacity: 0.5,
                                source: {
                                    type: 'OSM',
                                    url: cordova.file.cacheDirectory + "{z}/{x}/{y}.png"
                                }
                            },
                            {
                                isCache: false,
                                name: "wms",
                                active: false,
                                opacity: 0.5,
                                source: {
                                    type: 'ImageWMS',
                                    url: 'http://demo.opengeo.org/geoserver/wms',
                                    params: {
                                        LAYERS: 'topp:states'
                                    }
                                }
                            }],
                        defaults: {
                            events: {
                                map: ['singleclick', 'pointermove']
                            }
                        },

                        mouseposition: {},
                        mouseclickposition: {},
                        projection: 'EPSG:4326',
                        markers: mm,  //FIXME zoom impossible si marker sur la carte

                        switchMode: function () {

                             $log.debug("layers before");
                             $log.debug($scope.layers)

                            $scope.layers.forEach(function (layer) {
                                if (layer.isCache) {
                                    layer.active = $scope.HL;
                                } else {
                                    layer.active = !$scope.HL;
                                }
                            })

                             $log.debug("layers next");
                             $log.debug($scope.layers)


                            $scope.layers.map(function(l) {
                             //l.active = (l === layer);
                             });
                        }

                    });
            });



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
                        lat: p[1],
                        lon: p[0],
                        projection: $scope.projection
                    }
                };


                $scope.markers.push({
                    name: "t1",
                    lat: $scope.mouseclickposition.lat,
                    lon: $scope.mouseclickposition.lon
                });

                 $log.debug($scope.markers);

                /*
                urlEnd = getTileURL($scope.mouseclickposition.lat, $scope.mouseclickposition.lon, $scope.centreCarte.zoom)
                 $log.debug(urlEnd);
*/

                /* http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png
                 download(url, filePath, options, trustHosts)*/


                $scope.imageLoadingProgress = 0;

                //TODO UI de selection
                //zMin = $scope.centreCarte.zoom;
                //zMax = $scope.centreCarte.zoom+2;

                if ($scope.markers[1]) { //TODO retangle de selection


                    $ionicPlatform.ready()
                        //ionic.Platform.ready()
                        .then(function () {

                            for(var i = $scope.zMin; i <= $scope.zMax ; i++){
                                $scope.getAllTilesFromRectZoomStatic($scope.markers[0], $scope.markers[1], i); //TODO gestion multi lvl

                            }

                        });
                };











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
                    // $log.debug("run id : "+ixi);
                    //ixi++;
                    //recup de la tuile
                    $scope.downloadTile(outBoxMin);
                    yi++;
                }
                outBoxMin.x++;
                yi=0;
                // $log.debug(outBoxMin.x );
            }
        }








        //TODO A voir
        //$rootScope.$on('$cordovaNetwork:online', function(event, networkState){  $log.debug("true")})

} ]);


function getTileURL(lat, lon, zoom) {
     $log.debug("inputGetURl [lat :"+lat+" lon :"+lon+" zoom : "+zoom+" ]");

    var xtile = parseInt(Math.floor( (lon + 180) / 360 * (1<<zoom) ));
    var ytile = parseInt(Math.floor( (1 - Math.log(Math.tan(lat.toRad()) + 1 / Math.cos(lat.toRad())) / Math.PI) / 2 * (1<<zoom) ));


     $log.debug( "" + zoom + "/" + xtile + "/" + ytile);


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