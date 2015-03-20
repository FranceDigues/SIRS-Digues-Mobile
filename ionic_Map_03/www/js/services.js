angular.module('data.services', [])

    .service('sDb', function(pouchDB) {
        this.dbEssai = pouchDB('mobile_hybride');

        PouchDB.sync('mobile_hybride','http://192.168.1.185:5984/mobile_hybride');

        //return mydb;

    })
    .service('sLayer', function() {

        //choper les calque dans un json



        this.list = [

            {
                isCache:false,
                name: 'OSM',
                active: true,
                opacity: 0.6,
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
                    }}}
        ];


    })
    .service('sMap', function() {

        //choper les calque dans un json
        this.mode = {

                cache:false,
                edit:false,
                visu:true

        }
    });
    //.service('dlService', function(pouchDB) {
    //
    //    this.stackDownload = new Array();
    //
    //
    //
    //             if ($scope.markers[1]) { //TODO retangle de selection
    //
    //    $ionicPlatform.ready()
    //        .then(function () {
    //                for(var i = $scope.zMin; i <= $scope.zMax ; i++){
    //                $scope.getAllTilesFromRectZoomStatic($scope.markers[0], $scope.markers[1], i); //TODO gestion multi lvl
    //            }
    //        });
    //    };
    //
    //
    //    this.downloadTile = function( tile ){
    //
    //
    //        var url = "http://a.tile.openstreetmap.org/"+tile.z+"/"+tile.x+"/"+tile.y+".png";
    //        var targetPath = cordova.file.cacheDirectory + tile.z + "/" + tile.x + "/" + tile.y +".png"; //TODO gestion des dossier pour z et x
    //
    //        $log.debug("FilePath : " + targetPath);
    //        $log.debug("URL : " + url);
    //
    //        $cordovaFileTransfer.download(url, targetPath)
    //            .then(function (result) {
    //                // Success!
    //                $log.debug('Dl done : ');
    //                $log.debug(result);
    //                $scope.imageLoadingProgress++; //declaration de la fin du Dl de la tuile
    //            }, function (err) {
    //                // Error
    //                $log.debug('Dl fail :');
    //                $log.debug(err);
    //            }, function (progress) {
    //                $timeout(function () {
    //                    $scope.imageTmp = targetPath;
    //                    $log.debug($scope.imageTmp);
    //                })
    //            });
    //    }
    //
    //
    //    this.getAllTilesFromRectZoomStatic = function(p1, p2, zoom) {
    //
    //        outBoxMin = getTileURL(p1.lat, p1.lon, zoom);
    //        outBoxMax = getTileURL(p2.lat, p2.lon, zoom);
    //
    //        $log.debug("max")
    //        $log.debug(outBoxMax)
    //        $log.debug("min")
    //        $log.debug(outBoxMin)
    //
    //        if(outBoxMin.x > outBoxMax.x) { //TODO replace avec un Min-Max
    //            outTmp1 = outBoxMin.x;
    //            outBoxMin.x = outBoxMax.x;
    //            outBoxMax.x = outTmp1;
    //        }
    //        if(outBoxMin.y > outBoxMax.y) {
    //            outTmp1 = outBoxMin.y;
    //            outBoxMin.y = outBoxMax.y;
    //            outBoxMax.y = outTmp1;
    //        }
    //
    //
    //        $scope.nbTile = ( outBoxMax.x - outBoxMin.x ) * ( outBoxMax.y - outBoxMin.y );
    //
    //        $log.debug("x : " + ( outBoxMax.x - outBoxMin.x ));
    //        $log.debug("y : " + ( outBoxMax.y - outBoxMin.y ));
    //        $log.debug("nb dl attendu : "+$scope.nbTile);
    //
    //
    //        yi = 0;
    //        while(outBoxMin.x <= outBoxMax.x) { //parcour des tuile x -> y
    //            while(outBoxMin.y + yi <= outBoxMax.y) {
    //                $log.debug("*** tuile en cours *** " + outBoxMin.x + "/" + outBoxMin.y);
    //                //$log.debug("run id : "+ixi);
    //                //ixi++;
    //                //recup de la tuile
    //                $scope.downloadTile(outBoxMin);
    //                yi++;
    //            }
    //            outBoxMin.x++;
    //            yi=0;
    //            //$log.debug(outBoxMin.x );
    //        }
    //    }
    //    //return mydb;
    //});