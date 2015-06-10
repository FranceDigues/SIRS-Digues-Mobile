/**
 * Created by roch dardie on 28/05/15.
 */

//TODO nommer controller
//TODO créer la doc pas default

angular.module('ctrl.menu.init', [])

    .controller('cInit', function cInit($scope, $log, sPouch,$state) {

        var me = this;

        //me.loading = true;
        me.syncState = sPouch.syncState;

        //me.oUrlCdb = new oUrlCouchDb();

        //TODO debug only
        me.oUrlCdb = new oUrlCouchDb("geouser","geopw","5.196.17.92",5984,"sirs_isere");


        /**
         * @param {oUrlCouchDb} oUrlCdb
         */
        me.syncro= function(){
                sPouch.dbInit(me.oUrlCdb );
        };

        me.clearDb= function(oUrlCdb){
            sPouch.destroyDb(oUrlCdb);
        };

        me.note= function(note){
            $state.go('note');
        }
    })
