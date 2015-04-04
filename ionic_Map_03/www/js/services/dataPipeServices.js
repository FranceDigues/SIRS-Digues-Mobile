/**
 * Created by roch Dardie on 03/04/15.
 *
 *
 */
angular.module('data.services.pipe', [])

    .service('sContext', function(pouchDB) {
        this.param = {action:null,mskIdf:null}
    })
    .service('sLayer', function(sPouch,$log,$rootScope) {
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
        me.update = function(){
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
        rscp.$on("moskito_layer_change",  function(){
            $log.debug("event recus");
            me.update();
        });
        //rscp.$on("esyChanged", function(event, args){ $log.debug("event recus")});





        //initialisation
        me.update();


//pour test sync:
//        {
//            "isCache": false,
//            "name": "OSM_syncTest",
//            "active": true,
//            "opacity": 0.6,
//            "source": {
//            "type": "OSM",
//                "url": "http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//        }
//        },




    })