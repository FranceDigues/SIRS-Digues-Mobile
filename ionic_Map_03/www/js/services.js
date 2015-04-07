/**
 * Created by Roch Dardie on 15/03/15.
 */


angular.module('data.services', [])

    .service('sMap', function () {

        //choper les calque dans un json
        this.mode = {

            cache: false,
            edit: false,
            visu: true

        }
    })


    .service('sCacheMap', function (pouchDB, $cordovaFileTransfer, $cordovaFile, $log, $timeout, $rootScope, sContext) {

        var me = this;


        me.nbTile = 0;
        me.nbTileDownloaded = 0;


        me.cache = function (url, geom, cacheName, LayerSourceName, zMin, zMax) {


            for (var i = 0; i < geom[0].length; i++) {
                geom[0][i][0] = Math.round(geom[0][i][0] * 1000) / 1000
                geom[0][i][1] = Math.round(geom[0][i][1] * 1000) / 1000
            }

            $log.debug("zmin : " + zMin + " zMax : " + zMax);

            //calcul de l'enveloppe
            mM = miniMaxEV(geom[0]);
            $log.debug("minMaxEv");
            $log.debug(mM);

            //generation de la liste de tuile
            var aTileUrlForDownload = new Array();

            for (var i = zMax; i >= zMin; i--) {
                $log.debug("runTileUrl : " + i);


                aTileUrlForDownload.push(this.getTileUrlArray(mM[0], mM[1], i));

            }

            $log.debug(aTileUrlForDownload);


            //recuperation des tuile
            angular.forEach(aTileUrlForDownload, function (zoomLvl) {
                angular.forEach(zoomLvl, function (tile) {
                    downloadTile(tile, cacheName, LayerSourceName, url)
                    if (tile.z == zMin) {
                        //buildMetaData(aTileUrlForDownload,layerSource,cacheName,LayerSourceName,zMin);
                    }
                })
            })


        };


        function buildMetaData(aTileUrlForDownload, cacheLayerSource, cacheName, LayerSourceName, zMin) {
            //creation de l'envelope des tuile cacheé

            //TODO enmprise reelle
            //lonEmprise = 360/(2*zMin);
            //latEmprise = 170.1022/(2*zMin);
            //
            //var aHlTile = aTileUrlForDownload[(aTileUrlForDownload.length-1)];
            //tileMin =aHlTile[0];
            //tilemax = aHlTile[aHlTile.length-1];
            //
            //pointEveloppeBasGauche = [tileMin.x*lonEmprise,tileMin.y*latEmprise];
            //pointEveloppeHautDroite = [tileMin.x*(lonEmprise+1),tileMin.y*(latEmprise+1)];
            //
            //var ev =[[[pointEveloppeBasGauche[0],pointEveloppeBasGauche[1]],[pointEveloppeBasGauche[0],pointEveloppeHautDroite[1]],[pointEveloppeHautDroite[0],pointEveloppeHautDroite[1]],[pointEveloppeHautDroite[0],pointEveloppeBasGauche[1]],[pointEveloppeBasGauche[0],pointEveloppeBasGauche[1]]  ]];
            //
            //$log.error(tileMin);
            //$log.error(tilemax);
            //$log.error(pointEveloppeBasGauche);
            //$log.error(pointEveloppeHautDroite);
            //$log.error(ev);

            //creation du texte
            //nb de tuile
            //nom
            //emprise zoom
            //


            //affichage de l'emprise
            cacheLayerSource.addFeature(
                new ol.Feature({
                    geometry: new ol.geom.Polygon(ev),
                    nom: cacheName,
                    origine: LayerSourceName

                }));

            $log.debug(cacheLayerSource.getFeatures());


            //eregistrement ds l'objet utilisater
            //TODO user dans le context!
            sContext.auth.user.cacheGeom = atoGeoJson(cacheLayerSource);
            sContext.auth.user.cache.layers.push({nom: cacheName, origine: LayerSourceName});

            $log.debug(sContext.auth.user);
            //TODO event ionic ou acceau context??


        };

        //cacul de l'envelope
        function miniMaxEV(aPoint) {
            //$log.debug("EV s");
            //$log.debug(aPoint);
            //$log.debug(aPoint[0]);
            ////
            //TODO metre au propre
            mM = new Array();
            t1 = new Array();
            t1.push(aPoint[0][0]);
            t1.push(aPoint[0][1]);
            mM.push(t1);

            t2 = new Array();
            t2.push(aPoint[0][0]);
            t2.push(aPoint[0][1]);
            mM.push(t2);
            //[ [aPoint[0][0],aPoint[0][1]] , [aPoint[0][0],aPoint[0][1]] ];
            $log.debug(mM);


            for (var i = 1; i < aPoint.length; i++) {
                mM[0][0] = Math.min(mM[0][0], aPoint[i][0]);
                mM[0][1] = Math.min(mM[0][1], aPoint[i][1]);
                mM[1][0] = Math.max(mM[1][0], aPoint[i][0]);
                mM[1][1] = Math.max(mM[1][1], aPoint[i][1]);
            }
            ;


            //$log.debug(mM);
            //
            //$log.debug("EV e");
            return mM;

        };


        function downloadTile(tile, cacheName, LayerSourceName, baseUrl) {


            var url = baseUrl + "/" + tile.z + "/" + tile.x + "/" + tile.y + ".png";
            var targetPath = cordova.file.cacheDirectory + LayerSourceName + "/" + cacheName + "/" + tile.z + "/" + tile.x + "/" + tile.y + ".png"; //TODO gestion des dossier pour z et x

            //$log.debug("FilePath : " + targetPath);
            //$log.debug("URL : " + url);

            $cordovaFileTransfer.download(url, targetPath)
                .then(function (result) {
                    // Success!
                    //$log.debug('Dl done : ');
                    //$log.debug(result);
                    //TODO implementer un retour
                    me.nbTileDownloaded++; //declaration de la fin du Dl de la tuile
                    //$log.debug( me.nbTileDownloaded)
                }, function (err) {
                    // Error
                    $log.debug('Dl fail :');
                    $log.error(err);
                }, function (progress) {
                    $timeout(function () {
                        //$scope.imageTmp = targetPath;
                        //$log.debug($scope.imageTmp);
                    })
                });
        };


        me.getTileUrlArray = function (p1, p2, zoom) {

            outBoxMin = getTileURL(p1[0], p1[1], zoom);
            outBoxMax = getTileURL(p2[0], p2[1], zoom);

            //$log.debug("max old")
            //$log.debug(outBoxMax)
            //$log.debug("min old")
            //$log.debug(outBoxMin)

            if (outBoxMin.x > outBoxMax.x) { //TODO replace avec un Min-Max
                outTmp1 = outBoxMin.x;
                outBoxMin.x = outBoxMax.x;
                outBoxMax.x = outTmp1;
            }
            if (outBoxMin.y > outBoxMax.y) {
                outTmp1 = outBoxMin.y;
                outBoxMin.y = outBoxMax.y;
                outBoxMax.y = outTmp1;
            }



            aTileUrl = new Array();

            yi = outBoxMin.y;//SAVE INDICE
            while (outBoxMin.x <= outBoxMax.x) { //parcour des tuile x -> y
                while (outBoxMin.y <= outBoxMax.y) {
                    //$log.debug("*** tuile en cours *** " + outBoxMin.x + "/" + outBoxMin.y);
                    aTileUrl.push(outBoxMin);//creation de la liste de tuile
                    outBoxMin.y++;
                }
                outBoxMin.x++;
                outBoxMin.y = yi;//RAZ
            }

            me.nbTile = me.nbTile + aTileUrl.length;
            return aTileUrl;
        }


    });