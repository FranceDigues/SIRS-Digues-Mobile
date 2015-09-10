/**
 * Created by roch dardie on 12/06/15.
 */

angular.module('module_rde.data.services.maplayer', [])
.service('sMapLayer', function sMapLayer ($ionicPlatform,sPouch, $log, $rootScope) {



    var me = this;

    //attribut
    me.list = null;
    me._listLayer = null;
    me._listCacheLayer = null;
    var rscp = $rootScope.$new(); //FIXME le $on est focement dans un scope? pk route scope de la catch pas?


    me.updateLayer = function(layers){
        //init tmp array
        var layerWithContext = [];

        //apply context on each layer
        layers.forEach(function(lay){
            //typage de l'objet
            lay = new oLayer(lay);

            //on verifie si il existe dans la liste de reference locale
            if(me.list !== null && me._listLayer !== null ) {
                for (var j = 0; j < me._listLayer.length; j++) {
                    //si oui on affecte la valeur.
                    if (me.list[j].idf === lay.idf) {
                        lay.active = me._listLayer[j].active;

                    }
                }
            }

            layerWithContext.push(lay);
        });

        //erase and update undelist
        me._listLayer = layerWithContext;

        //concat underlist
        me._fusionLayerList();
    };


    me._fusionLayerList = function(){

        //case of concat
        if(me._listLayer !== null){
            if(me._listCacheLayer !== null){
                me.list = me._listLayer.concat( me._listCacheLayer);
            }else{
                me.list = me._listLayer;
            }
        }else{
            if(me._listCacheLayer !== null){
                me.list = me._listCacheLayer;
            }else{
                me.list = null;
            }
        }

        //broadcast event
        $log.debug(me.list)
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

    //listen event from base layer def update
    rscp.$on("baseMapLayer:Change", function () {
        $log.debug("event recus : baseMapLayer:Change");
        me.update();
    });


 //listen event from cache map plugin
    document.addEventListener("updateListCache", function (e) {
        $log.debug("eventListCache intercept from mapLayer");

        //RAZ var
        me._listCacheLayer=[];

        //iterate on cache descriptor
        e.aCaDe.forEach(function (item) {
            //typage des object
            var localCaDe = new oCacheDescriptor(item);
            //add to cache underList
            me._listCacheLayer.push(localCaDe.getLayer());
        });

        //update global layer list
            me._fusionLayerList();
    });


    //initialisation

    me.update();

    //CacheMapPlugin.CaDeListReQuest();







})

