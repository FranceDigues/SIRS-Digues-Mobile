/**
 * Created by roch dardie on 28/05/15.
 */


angular.module('ctrl.menu.init', [])

    .controller('InitCtrl', function ($scope, $log, sPouch,$state) {

        var me = this;

        //me.oUrlCdb = new oUrlCouchDb();

        //TODO debug only
        me.oUrlCdb = new oUrlCouchDb("geouser","geopw","5.196.17.92",5984,"sirs_isere");
        //
        me.syncro= function(oUrlCdb){
                sPouch.dbConf(oUrlCdb);
        };

        me.note= function(note){
            $state.go('note');
        }
    })
