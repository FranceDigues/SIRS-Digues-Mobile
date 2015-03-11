var mm= new Array();


angular.module('controllers', [
    'ngCordova'])

.controller('MapCtrl', [ '$scope', '$ionicPlatform','$cordovaFile','$cordovaFileTransfer','$timeout', function($scope,$ionicPlatform,$cordovaFile,$cordovaFileTransfer,$timeout) {
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
            });




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
                opacity: 0.5,
                source: {
                    type: 'OSM',
                    url:"http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                }},
            {
                isCache:true,
                name: 'OSM-Cache',
                active: false,
                opacity: 0.5,
                source: {
                    type: 'OSM',
                    url:$cordovaFile.cacheDirectory+"{z}/{x}/{y}.png"
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

            mouseposition: {},
            mouseclickposition: {},
            projection: 'EPSG:4326',
            markers:mm,  //FIXME zoom impossible si marker sur la carte

            switchMode: function() {

                console.log("layers before");
                console.log($scope.layers)

                $scope.layers.forEach(function(layer) {
                    if(layer.isCache){
                        layer.active = $scope.HL;
                    }else{
                        layer.active=!$scope.HL;
                    }
                })

                console.log("layers next");
                console.log($scope.layers)


                /*$scope.layers.map(function(l) {
                    //l.active = (l === layer);



                });*/
            }

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
                }


                $scope.markers.push({
                    name: "t1",
                    lat: $scope.mouseclickposition.lat,
                    lon: $scope.mouseclickposition.lon
                })


                /*
                urlEnd = getTileURL($scope.mouseclickposition.lat, $scope.mouseclickposition.lon, $scope.centreCarte.zoom)
                console.log(urlEnd);
*/

                /* http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png
                 download(url, filePath, options, trustHosts)*/


                $scope.imageLoadingProgress = 0;

                if ($scope.markers[1]) { //TODO retangle de selection


                    $ionicPlatform.ready()
                        //ionic.Platform.ready()
                        .then(function () {


                            $scope.getAllTilesFromRectZoomStatic($scope.markers[0], $scope.markers[1], ($scope.centreCarte.zoom+1)); //TODO gestion multi lvl


                        });
                }






                $scope.downloadTile = function(tile){


                    var url = "http://a.tile.openstreetmap.org/"+tile.z+"/"+tile.x+"/"+tile.y+".png";
                    var targetPath = cordova.file.cacheDirectory + tile.z + "/" + tile.x + "/" + tile.y +".png"; //TODO gestion des dossier pour z et x

                    console.log("FilePath : " + targetPath);
                    console.log("URL : " + url);

                    $cordovaFileTransfer.download(url, targetPath)
                        .then(function (result) {
                            // Success!
                            console.log('Dl done : ');
                            console.log(result);
                            $scope.imageLoadingProgress++; //declaration de la fin du Dl de la tuile
                        }, function (err) {
                            // Error
                            console.log('Dl fail :');
                            console.log(err);
                        }, function (progress) {
                            $timeout(function () {
                                $scope.imageTmp = targetPath;
                                console.log($scope.imageTmp);
                            })
                        });

                }


               $scope.getAllTilesFromRectZoomStatic = function(p1, p2, zoom) {

                    outBoxMin = getTileURL(p1.lat, p1.lon, zoom);
                    outBoxMax = getTileURL(p2.lat, p2.lon, zoom);


                   console.log("max")
                   console.log(outBoxMax)
                   console.log("min")
                   console.log(outBoxMin)

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


                    $scope.nbTile = (outBoxMax.x-outBoxMin.x)*(outBoxMax.y-outBoxMin.y);

                    //ixi = 0;
                    while(outBoxMin.x <= outBoxMax.x) { //parcour des tuile x -> y
                        while(outBoxMin.y <= outBoxMax.y) {
                            console.log("*** tuile en cours *** " + outBoxMin.x + "/" + outBoxMin.y);
                            //console.log("run id : "+ixi);
                            //ixi++;
                            //recup de la tuile
                            $scope.downloadTile(outBoxMin);
                            outBoxMin.y++;
                        }
                        outBoxMin.x++;
                    }
                }





                /*             $ionicPlatform.ready()
                 //ionic.Platform.ready()
                 .then(function() {




                 //test chargementUneImage
                 var url = "http://a.tile.openstreetmap.org/"+urlEnd+".png";
                 //var url = "https://xmms2.org/wiki/images/5/51/Logo-black-2-400.png";
                 var targetPath = cordova.file.cacheDirectory + "testImage.png";

                 var trustHosts = true
                 var options = {};
                 console.log("FilePath : " + targetPath);
                 //console.log($cordovaFile);
                 //console.log("docDirectory : " + cordova.file.dataDirectory);
                 //console.log("appDirectory : " + cordova.file.cacheDirectory);
                 console.log("URL : " + url)
                 //$cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                 $cordovaFileTransfer.download(url, targetPath)
                 .then(function (result) {
                 // Success!
                 console.log('Dl done : ');
                 console.log(result);
                 }, function (err) {
                 // Error
                 console.log('Dl fail :');
                 console.log(err);
                 }, function (progress) {
                 $timeout(function () {
                 $scope.imageLoadingProgress = (progress.loaded / progress.total) * 100;
                 $scope.imageTmp = targetPath;
                 console.log($scope.imageTmp);
                 })
                 });
                 });*/


            });
        });

        //TODO A voir
        //$rootScope.$on('$cordovaNetwork:online', function(event, networkState){ console.log("true")})

} ]);


function getTileURL(lat, lon, zoom) {
    console.log("inputGetURl [lat :"+lat+" lon :"+lon+" zoom : "+zoom+" ]");

    var xtile = parseInt(Math.floor( (lon + 180) / 360 * (1<<zoom) ));
    var ytile = parseInt(Math.floor( (1 - Math.log(Math.tan(lat.toRad()) + 1 / Math.cos(lat.toRad())) / Math.PI) / 2 * (1<<zoom) ));


    console.log( "" + zoom + "/" + xtile + "/" + ytile);


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


