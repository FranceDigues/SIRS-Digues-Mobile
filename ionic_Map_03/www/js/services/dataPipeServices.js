/**
 * Created by roch Dardie on 03/04/15.
 *
 *
 */
angular.module('data.services.pipe', [])

    .service('sContext', function (sPouch, pouchDB, $rootScope, $log) {
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
    .service('sLayer', function (sPouch, $log, $rootScope) {
        //carcan
        var me = this;

        //attribut
        me.list = null;
        var rscp = $rootScope.$new(); //FIXME le $on est focement dans un scope? pk route scope de la catch pas?


        /**
         *  FIXME les calque sorte direct de la db, du coup les variable de contexte ne doivent plus etre porter par ces objet
         *  TODO créer un json UUID - Layer Context Value
         *
         */



            //methode de mise a jour de l'objet layers
        me.update = function () {
            $log.debug("update")
            sPouch.layer.get(cLayerBase).then(function (doc) {
                $log.debug("slayer init");
                $log.debug(doc);

                me.list = doc.layers;
                $log.debug(me.list);
                $log.debug("slayer end");
                $rootScope.$broadcast("layersListUpdated");
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
        //rscp.$on("esyChanged", function(event, args){ $log.debug("event recus")});


        //initialisation
        me.update();



    })


    .service('sMask', function (sPouch, $log, $rootScope, sContext) {
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
            sPouch.obs.post({
                    'obs': obs
                }).then(function (response) {
                    me.obsUUID = response.id;
                    $rootScope.$broadcast("ObsCreated");
                }).catch(function (err) {
                    console.error(err);
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

        rscpMsk.$on("msk_change", function () {
            $log.debug("event recus");
            me.update();
        });


        //initialisation
        //me.update();

    })

