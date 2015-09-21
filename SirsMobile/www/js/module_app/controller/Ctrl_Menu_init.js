/**
 * Created by roch dardie on 28/05/15.
 */

//TODO nommer controller
//TODO créer la doc pas default

angular.module('module_app.controllers.menus.init', [])

    .controller('cInit', function cInit($scope, $log, sPouch, $location, sContext) {

        var me = this;

        //me.loading = true;
        //me.syncState = sPouch.syncState;
        me.sPouch = sPouch;

        //me.oUrlCdb = new oUrlCouchDb();

        //TODO debug only
        me.confDbDesc = new oUrlCouchDb({id:"geouser",psw:"geopw",adress:"5.196.17.92",port:5984,db:"sirs_conf"});
        me.activeDbDesc = new oUrlCouchDb({});


        /**
         * @param {oUrlCouchDb} oUrlCdb
         */
        me.syncro= function(){
                sPouch.syncConfDb(me.confDbDesc, sPouch.getDbs );
        };

        me.replicationInitiale = function(){
            //var tmp = new oUrlCouchDb(me.activeDbDesc) ;
            var tmp = new oUrlCouchDb({id:"geouser",psw:"geopw",adress:"5.196.17.92",port:5984,db:"sirs_sym"}) ; //fixme radio button
                //sPouch.dbInit( new oUrlCouchDb(me.activeDbDesc.id,me.activeDbDesc.psw, me.activeDbDesc.adress, me.activeDbDesc.port,me.activeDbDesc.db) ); //FIXME persistance de l'objet au travert du select
                sPouch.dbInit(tmp); //FIXME persistance de l'objet au travert du select
        };

        me.clearDb= function(oUrlCdb){
            sPouch.destroyDb(oUrlCdb);
        };

        me.note= function(note){
            $location.path('/note');
        }


        $(document).ready(function(){
            $('.collapsible').collapsible({
                accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
            });
        });
        $(document).ready(function() {
            $('select').material_select();
        });

    })
