/**
 * Created by roch Dardie on 03/04/15.
 *
 *
 */
angular.module('module_rde.data.services.pipe', [])

    .service('sContext',  function sContext (sPouch, pouchDB, $rootScope, $log) {
        var rscptt = $rootScope.$new();


        this.param = {action: null, mskUUID: null}
        this.auth = {user: null}


        this.saveUser = function () {
            $log.debug("reception event UptateUser")
            sPouch.usr.put(this.auth.user)
                .then(function (response) {
                    //propagation pour remise a jour de l'user
                    $rootScope.$broadcast("userChange"); //TODO faire des type d'event specifique pour les notification de contexte

                }).catch(function (err) {
                    $log.debug(err);
                });
        }


        ////mise a jour de l'utilisateur via un event.'
        //rscptt.$on("updateUser",  function() {
        //    $log.debug("reception event UptateUser")
        //    sPouch.usr.put(this.auth.user)
        //        .then(function (response) {
        //            //propagation pour remise a jour de l'user
        //            $rootScope.$broadcast("userChange"); //TODO faire des type d'event specifique pour les notification de contexte
        //
        //        }).catch(function (err) {
        //            $log.debug(err);
        //        });
        //
        //});
    })
    .service('sLayer', function sLayer ($ionicPlatform,sPouch, $log, $rootScope,$timeout) {
        //carcan


        var me = this;

        //attribut
        me.list = null;
        me._listLayer = null;
        me._listCacheLayer = null;
        var rscp = $rootScope.$new(); //FIXME le $on est focement dans un scope? pk route scope de la catch pas?


        /**
         *  FIXME les calque sorte direct de la db, du coup les variable de contexte ne doivent plus etre porter par ces objet
         *  TODO créer un json UUID - Layer Context Value
         *
         */


        me.updateLayer = function(layers){
            layers.forEach(function(lay){
                //typage de l'objet
                lay = new oLayer(lay);

                //on verifie si il existe dans la liste de reference locale
                if(me.list !== null) {
                    for (var j = 0; j < me._listLayer.length; j++) {

                        //si oui on affecte la valeur.
                        if (me.list[j].idf === lay.idf) {
                            tmpLayer.active = me._listLayer[j].active;
                        }
                    }
                }
            });
            me._listLayer = layers;

            me._fusionLayerList();
        };


        me._fusionLayerList = function(){

            //TODO faire mieux

            if(me._listCacheLayer == null) {
                me.list =me._listLayer;
            }   else if( me._listLayer == null && me._listCacheLayer ==null){
                me.list=null;
            }else{
                me.list =me._listLayer.concat( me._listCacheLayer);
            }

            $log.error("fuisoneur");
            $log.error(me.list);
            $log.error(me._listLayer);
            $log.error(me._listCacheLayer);


            //mise a jour terminer
            $rootScope.$broadcast("layersListUpdated");
        }


        //methode de mise a jour de l'objet layers
        me.update = function () {
            $log.debug("update")
            sPouch.layer.get(cLayerBase).then(function (doc) {
                $log.debug(doc);

                me.updateLayer( doc.layers);
                $log.debug(me.list);

            }).catch(function (err) {
                $log.debug(err);
            });

        }

        //recepteur d'evenement
        //
        rscp.$on("moskito_layer_change", function () {
            $log.debug("event recus");
            me.update();
        });


        //$ionicPlatform.ready(function () {
            //window.document.addEventListener
        document.addEventListener("updateListCache", function (e) {
                $log.debug("eventListCache recus IN SERVICE");
                $log.debug(e.aCaDe);
           var  aLayer =[];

            e.aCaDe.forEach(function (item) {
//FIXME optimise

                $log.debug(item);
                    //typage des object
                    var localCaDe = new oCacheDescriptor();//creation de l'objet et patch des valeur
                    localCaDe.patch(item);
                    $log.debug(localCaDe);

                    aLayer.push(localCaDe.getLayer());

                    //convertion en layer et oublie du caDe car on est dans sLayer
                    //item = item.getLayer();
                //$log.debug(item);



                });
            $log.debug("aLayer:");
            $log.debug(aLayer);

                //affectation masterListe
                me._listCacheLayer =aLayer;
            //$log.error(me._listCacheLayer);

                me._fusionLayerList();

            });


        //}


        //initialisation

        me.update();

        CacheMapPlugin.CaDeListReQuest();







    })


    .service('sMask', function sMask (sPouch, $log, $rootScope, sContext) {
        //carcan
        var me = this;

        //attribut
        //me.GeoJson = null;
        me.doc = null;
        me.currentObs = [];
        me.obsUUID = '';
        me.form = null;
        var rscpMsk = $rootScope.$new(); //FIXME le $on est focement dans un scope? pk route scope de la catch pas?


        /**
         *  FIXME les calque sorte direct de la db, du coup les variable de contexte ne doivent plus etre porter par ces objet
         *  TODO créer un json UUID - Layer Context Value
         *
         */



            //methode de mise a jour de l'objet layers
        me.update = function () {
            $log.debug("update")
            $log.debug(sContext.param.mskUUID)
            sPouch.layer.get(sContext.param.mskUUID).then(function (doc) {
                $log.debug("reloadMsk");
                $log.debug(doc);

                //me.GeoJson = doc.GeoJson;
                me.doc = doc;
                me.currentObs = [];
                $log.debug(me.doc);
                $rootScope.$broadcast("maskGeoJsonUpdate");
            }).catch(function (err) {
                $log.debug(err);
            });
        }

        me.getObs = function (featurePos, ObsUUID) {
            sPouch.obs.get(ObsUUID).then(function (doc) {
                me.currentObs.push({
                    'featurePos': featurePos,
                    'doc': doc
                });
            }).catch(function (err) {
                $log.debug(err);

            });
        };


        me.writeObsOnDB = function (obs) {
            $log.debug("=============ECRITURE OBS ==============")
            sPouch.obs.post({
                'obs': obs
            }).then(function (response) {
                $log.debug("=============result ECRITURE OBS ==============")
                me.obsUUID = response.id;
                $rootScope.$broadcast("ObsCreated");
            }).catch(function (err) {
                $log.debug("============= errorECRITURE OBS ==============")
                $log.error(err);
            });
        };



        me.writeDocOnDb = function () {
            sPouch.layer.put(me.doc)
                .then(function (response) {
                    // handle response
                    //propagation pour remise a jour du layer
                    $rootScope.$broadcast("msk_change"); //TODO faire des type d'event specifique pour les notification de contexte

                }).catch(function (err) {
                    $log.debug(err);
                });

        };


        me.searchFormByLayerUUID = function (layerUUID) {
            $log.debug('searchFormByLayerUUID: _' + layerUUID+"_");


            sPouch.layer.get(""+layerUUID).then(function (layer) {
                var formUUID = layer.formUUID;
                $log.debug('formUUID: '+layer.formUUID)
                sPouch.form.get(""+formUUID).then(function (formDoc) {
                    me.form = formDoc;
                    $log.debug(formDoc);
                    $rootScope.$broadcast("formUpdate");
                }).catch(function (err) {
                    $log.debug(err);
                });
            }).catch(function (err) {
                $log.debug(err);
            });



        };

        //me.searchFormByLayerUUID = function (formUUID) {
        //    $log.debug('FORM UUID: _' + formUUID+"_");
        //
        //    sPouch.form.get(""+formUUID).then(function (formDoc) {
        //        me.form = formDoc;
        //        $rootScope.$broadcast("formUpdate");
        //        $log.debug(formDoc);
        //    }).catch(function (err) {
        //        $log.debug(err);
        //    });
        //
        //};


        //recepteur d'evenement
        rscpMsk.$on("moskito_layer_change", function () {
            $log.debug("event recus");
            me.update();
        });

        //rscpMsk.$on("moskito_layer_change", function () {
        //    $log.debug("event recus");
        //    me.updateObs();
        //});

        rscpMsk.$on("msk_change", function () {
            $log.debug("event recus");
            me.update();
        });


        //initialisation
        //me.update();

    })

