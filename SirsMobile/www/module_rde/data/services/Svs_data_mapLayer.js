/**
 * Created by roch dardie on 12/06/15.
 */

angular.module('module_rde.data.services.maplayer', [])
.service('sMapLayer', function sMapLayer ($ionicPlatform,sPouch, $log, $rootScope,$timeout) {



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
                        $log.debug('tmpLayer');
                        $log.debug(tmpLayer);
                    }
                }
            }
        });
        $log.debug('LayerList');
        $log.debug(layers);
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
        sPouch.confDb.get('layersList').then(function (doc) {
            $log.debug(doc);

            me.updateLayer( doc.layers);

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

            //convertion en layer et oublie du caDe car on est dans sMapLayer
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

