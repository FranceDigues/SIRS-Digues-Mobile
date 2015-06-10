/**
 * Created by roch dardie on 28/05/15.
 */

//TODO nommer controller
//TODO créer la doc pas default

angular.module('ctrl.menu.init', [])

    .controller('cInit', function cInit($scope, $log, sPouch,$state) {

        var me = this;

        //me.loading = true;
        //me.syncState = sPouch.syncState;
        me.sPouch = sPouch;

        //me.oUrlCdb = new oUrlCouchDb();

        //TODO debug only
        me.confDbDesc = new oUrlCouchDb("geouser","geopw","5.196.17.92",5984,"sirs_conf");
        me.activeDbDesc = new oUrlCouchDb();


        /**
         * @param {oUrlCouchDb} oUrlCdb
         */
        me.syncro= function(){
                sPouch.syncConfDb(me.confDbDesc );
        };

        me.replicationInitiale = function(){
            var tmp = new oUrlCouchDb() ;
            //$log.debug(tmp);
            //$log.debug(tmp.patch(me.activeDbDesc));
            //$log.debug("normal");

                sPouch.dbInit( new oUrlCouchDb(me.activeDbDesc.id,me.activeDbDesc.psw, me.activeDbDesc.adress, me.activeDbDesc.port,me.activeDbDesc.db) ); //FIXME persistance de l'objet au travert du select
        };

        me.clearDb= function(oUrlCdb){
            sPouch.destroyDb(oUrlCdb);
        };

        me.note= function(note){
            $state.go('note');
        }
    })
