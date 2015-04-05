/**
 * Created by Roch Dardie on 15/03/15.
 */


angular.module('data.services', [])

        .service('sMap', function() {

        //choper les calque dans un json
        this.mode = {

                cache:false,
                edit:false,
                visu:true

        }
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