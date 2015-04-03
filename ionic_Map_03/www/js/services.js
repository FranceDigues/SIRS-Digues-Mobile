/**
 * Created by Roch Dardie on 15/03/15.
 */


angular.module('data.services', [])

    .service('sDb', function(pouchDB) {
        this.dbEssai = pouchDB('mobile_hybride');

        PouchDB.sync('mobile_hybride','http://192.168.1.185:5984/mobile_hybride');

        //return mydb;

    })
    .service('sLayer', function(sPouch,$log) {

        var me = this;
        me.list = null;
        //choper les calque dans un json


        sPouch.layer.get(cLayerBase).then(function (doc) {
            $log.debug("slayer init")
            $log.debug(doc)

            me.list = doc.layers;
            $log.debug(me.list)
            $log.debug("slayer end")
        }).catch(function (err) {
            $log.debug(err);
        });


        // = [
        //
        //    {
        //        isCache:false,
        //        name: 'OSM',
        //        active: true,
        //        opacity: 0.6,
        //        source: {
        //            type: 'OSM',
        //            url:"http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        //        }},
        //    {
        //        isCache:true,
        //        name: 'OSM-Cache',
        //        active: false,
        //        opacity: 1,
        //        source: {
        //            type: 'OSM',
        //            //url:"file:///data/data/com.ionic.map01/cache/"+"{z}/{x}/{y}.png" //TODO chemin selon plateforme
        //            url:"file:///data/data/com.ionic.map01/cache/OSM/essai/"+"{z}/{x}/{y}.png" //TODO chemin selon plateforme
        //
        //
        //        }},
        //    {
        //        isCache:false,
        //        name:"wms",
        //        active: false,
        //        opacity: 0.5,
        //        source: {
        //            type: 'ImageWMS',
        //            url:'http://demo.opengeo.org/geoserver/wms',
        //            params: {
        //                LAYERS: 'topp:states'
        //            }}}
        //];


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

        var me = this;

        //choper les calque dans un json
        me.event = {

            sideMenu:true,
            mapMove:false,
            mapDraw:false

        }


        me.draw = null;
        ;
        me.toggleDraw = function(){
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

        me.olInteract={
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

        var me = this;

                me.cfg = new pouchDB('moskito_config');
                me.usr = new pouchDB('moskito_user');
                me.layer = new pouchDB('moskito_layer');

                PouchDB.replicate('http://178.32.34.74:5984/moskito_config','moskito_config');
                PouchDB.replicate('http://178.32.34.74:5984/moskito_user','moskito_user');
                PouchDB.replicate('http://178.32.34.74:5984/moskito_layer','moskito_layer');





        me.cfg.allDocs().then(function (result) {
             console.log(result);
        }).catch(function (err) {
            console.log(err);
        });

        me.usr.allDocs().then(function (result) {
                 console.log(result);
            }).catch(function (err) {
                console.log(err);
            });

        me.layer.allDocs().then(function (result) {
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


        me.usr.put(designDoc).then(function (info) {
            // design doc created
            $log.debug(info);
        }).catch(function (err) {
            // if err.name === 'conflict', then
            // design doc already exists
            $log.debug(err);
        });



    })

    .service('sCacheMap', function(pouchDB,$cordovaFileTransfer,$cordovaFile,$log,$timeout) {

        var me = this;

        //this.stackDownload = new Array();
        //
        //
        //
        //         if ($scope.markers[1]) { //TODO retangle de selection
        //
        //$ionicPlatform.ready()
        //    .then(function () {
        //
        //    });
        //};



        me.nbTile = 0;
        me.nbTileDownloaded = 0;


    me.cache=function(url,geom,cacheName,LayerSourceName,zMin ,zMax){


        for(var i = 0; i< geom[0].length;i++){
            geom[0][i][0]= Math.round( geom[0][i][0]*1000)/1000
            geom[0][i][1]= Math.round( geom[0][i][1]*1000)/1000
        }

        $log.debug("zmin : "+zMin+" zMax : "+zMax);

        //calcul de l'enveloppe
        mM = miniMaxEV(geom[0]);
        $log.debug("minMaxEv");
        $log.debug(mM);

        //generation de la liste de tuile
        aTileUrlForDownload = new Array();

        for(var i=zMax;i>=zMin;i--){
            $log.debug("runTileUrl : "+i);


            aTileUrlForDownload.push(this.getTileUrlArray(mM[0],mM[1],i));

        }

        $log.debug(aTileUrlForDownload);


        //recuperation des tuile
        angular.forEach( aTileUrlForDownload,function(zoomLvl){
            angular.forEach( zoomLvl, function(tile){
                downloadTile(tile,cacheName,LayerSourceName,url)
            })
        })

    };

        //cacul de l'envelope
        function miniMaxEV(aPoint){
            //$log.debug("EV s");
            //$log.debug(aPoint);
            //$log.debug(aPoint[0]);
            ////
            //TODO metre au propre
            mM =new Array();
            t1 =new Array();
            t1.push(aPoint[0][0]);
            t1.push(aPoint[0][1]);
            mM.push(t1);

            t2 =new Array();
            t2.push(aPoint[0][0]);
            t2.push(aPoint[0][1]);
            mM.push(t2);
                //[ [aPoint[0][0],aPoint[0][1]] , [aPoint[0][0],aPoint[0][1]] ];
            $log.debug(mM);


            for(var i = 1 ; i<aPoint.length;i++) {
                mM[0][0] = Math.min(mM[0][0], aPoint[i][0]);
                mM[0][1] = Math.min(mM[0][1], aPoint[i][1]);
                mM[1][0] = Math.max(mM[1][0], aPoint[i][0]);
                mM[1][1] = Math.max(mM[1][1], aPoint[i][1]);
            };


            //$log.debug(mM);
            //
            //$log.debug("EV e");
            return mM;

        };


        function downloadTile( tile ,cacheName,LayerSourceName,baseUrl){


            var url = baseUrl+"/"+tile.z+"/"+tile.x+"/"+tile.y+".png";
            var targetPath = cordova.file.cacheDirectory +LayerSourceName+"/"+cacheName+"/"+ tile.z + "/" + tile.x + "/" + tile.y +".png"; //TODO gestion des dossier pour z et x

            $log.debug("FilePath : " + targetPath);
            $log.debug("URL : " + url);

            $cordovaFileTransfer.download(url, targetPath)
                .then(function (result) {
                    // Success!
                    $log.debug('Dl done : ');
                    $log.debug(result);
                    //TODO implementer un retour
                    me.nbTileDownloaded++; //declaration de la fin du Dl de la tuile
                    $log.debug( me.nbTileDownloaded)
                }, function (err) {
                    // Error
                    $log.debug('Dl fail :');
                    $log.debug(err);
                }, function (progress) {
                    $timeout(function () {
                        //$scope.imageTmp = targetPath;
                        //$log.debug($scope.imageTmp);
                    })
                });
        };


        me.getTileUrlArray = function(p1,p2, zoom) {

            outBoxMin = getTileURL(p1[0], p1[1], zoom);
            outBoxMax = getTileURL(p2[0], p2[1], zoom);

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


            //$scope.nbTile = ( outBoxMax.x - outBoxMin.x ) * ( outBoxMax.y - outBoxMin.y );

            //$log.debug("x : " + ( outBoxMax.x - outBoxMin.x ));
            //$log.debug("y : " + ( outBoxMax.y - outBoxMin.y ));
            //$log.debug("nb dl attendu : "+$scope.nbTile);


            aTileUrl = new Array();

            yi = 0;
            while(outBoxMin.x <= outBoxMax.x) { //parcour des tuile x -> y
                while(outBoxMin.y + yi <= outBoxMax.y) {
                    //$log.debug("*** tuile en cours *** " + outBoxMin.x + "/" + outBoxMin.y);

                    aTileUrl.push(outBoxMin)
                    yi++;
                }
                outBoxMin.x++;
                yi=0;
            }

            me.nbTile=  me.nbTile + aTileUrl.length;
            return aTileUrl;
        }


    });