var mm= new Array();


angular.module('controllers', [
    'ngCordova'])

.controller('MapCtrl', [ '$scope', '$ionicPlatform','$cordovaFile','$cordovaFileTransfer','$timeout', function($scope,$ionicPlatform,$cordovaFile,$cordovaFileTransfer,$timeout) {
        //,$cordovaFile
// , $cordovaFileTransfer, $cordovaFile

        $scope.imageLoadingProgress =0;
        $scope.imageTmp = null;
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
                name: 'OSM',
                active: true,
                opacity: 0.5,
                source: {
                    type: 'OSM',
                    url:"http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                }},
            {
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
                    var p = ol.proj.transform([ coord.lon, coord.lat ], coord.projection, $scope.projection);
                    $scope.mouseclickposition = {
                        lat: p[1],
                        lon: p[0],
                        projection: $scope.projection
                    }
                }


                $scope.markers.push({
                    name:"t1",
                    lat:$scope.mouseclickposition.lat,
                    lon:$scope.mouseclickposition.lon
                })


                url = getTileURL($scope.mouseclickposition.lat, $scope.mouseclickposition.lon, $scope.centreCarte.zoom)
                console.log(url);



/*                http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png
                    download(url, filePath, options, trustHosts)*/
                $scope.imageLoadingProgress =0;
















                $ionicPlatform.ready()
                    //ionic.Platform.ready()
                    .then(function() {

                        //test chargementUneImage
                        //var url = " http://{a-c}.tile.openstreetmap.org/"+url+".png";
                        var url = "https://xmms2.org/wiki/images/5/51/Logo-black-2-400.png";
                        var targetPath = cordova.file.cacheDirectory + "testImage.png";

                        var trustHosts = true
                        var options = {};
                        console.log("FilePath : " + targetPath);
                        console.log($cordovaFile);
                        console.log("docDirectory : " + cordova.file.dataDirectory);
                        console.log("appDirectory : " + cordova.file.cacheDirectory);
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


                    });












            });
        });

        //TODO A voir
        //$rootScope.$on('$cordovaNetwork:online', function(event, networkState){ console.log("true")})

} ]);


function getTileURL(lat, lon, zoom) {
    var xtile = parseInt(Math.floor( (lon + 180) / 360 * (1<<zoom) ));
    var ytile = parseInt(Math.floor( (1 - Math.log(Math.tan(lat.toRad()) + 1 / Math.cos(lat.toRad())) / Math.PI) / 2 * (1<<zoom) ));
    return "" + zoom + "/" + xtile + "/" + ytile;
}

/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function() {
        return this * Math.PI / 180;
    }
}

function  downloadTile(){

}
