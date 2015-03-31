/**
 * Created by Roch Dardie on 15/03/15.
 */


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
    })
    .service('sEventSuperviseur', function($log) {

        //choper les calque dans un json
        this.event = {

            sideMenu:true,
            mapMove:false,
            mapDraw:false

        }


        this.draw = null;
        ;
        this.toggleDraw = function(){
            if(this.draw.getActive()){
                $log.debug("desactivation");
                this.draw.setActive(false);
                this.event.sideMenu = true;
            }
            else if(!this.draw.getActive()){
                $log.debug("activation");
                this.draw.setActive(true);
                this.event.sideMenu = false;
            }
        }

        this.olInteract={
            draw:{
                point:null,
                line:null,
                area:null
            },
            mesur :{
                line:null,
                area:null
            }
            //todo hyperviseur Control ol3

        }

    })
    //.service('sCfg', function($log,$http) {
    //
    //    //$.getJSON( "data/cfg.json", function( data ) {
    //    //   this.cMaskId = data.cMaskId
    //    //    $log.debug(data.cMaskId);
    //    //});
    //
    //
    //    $http.get('data/cfg.json').success(function(response) {
    //        this.cMaskId = response.cMaskId;
    //        $log.debug(response.cMaskId);
    //    });
    //
    //})
    .service('sPouch', function(pouchDB,$log,$ionicPlatform) {


                this.cfg = new pouchDB('moskito_config');
                this.usr = new pouchDB('moskito_user');

                PouchDB.replicate('http://178.32.34.74:5984/moskito_config','moskito_config');
                PouchDB.replicate('http://178.32.34.74:5984/moskito_user','moskito_user');





        this.cfg.allDocs().then(function (result) {
             console.log(result);
        }).catch(function (err) {
            console.log(err);
        });

        this.usr.allDocs().then(function (result) {
                 console.log(result);
            }).catch(function (err) {
                console.log(err);
            });



        var designDoc = {
            _id: '_design/name_index',
            views: {
                'name_index': {
                    map: function(doc) {
                        emit(doc.name, doc.psw);
                    }.toString()
                }
            }
        };


        this.usr.put(designDoc).then(function (info) {
            // design doc created
            $log.debug(info);
        }).catch(function (err) {
            // if err.name === 'conflict', then
            // design doc already exists
            $log.debug(err);
        });



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