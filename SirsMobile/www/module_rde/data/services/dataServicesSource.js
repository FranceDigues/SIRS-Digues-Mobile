/**
 * Created by dardie roch on 03/04/15.
 */
angular.module('module_rde.data.services.source', [])

    .service('sPouch', function (pouchDB, $log, $rootScope) {

        var me = this;

        /**
         * instanciation de tte les base
         * @type {pouchDB}
         */
        me.localDb =  null;

        //objet pour couper la syncro
        me.synclocalDb = null;



        //instancie une syncro bi-directionelle avec support de l'interuption, et propagation des evenement change
            //les evenements sont nome comme la base
        me.initiateSync = function (oUrlCdb) {
            return PouchDB.sync("" + oUrlCdb.db, oUrlCdb.getUrlString(), {
                live: true,
                retry: true
            }).on('change', function (info) {
                // handle change
                $log.info(oUrlCdb.db + '_change');
                $log.debug(info);
                if (info.direction == "pull") {
                    $rootScope.$broadcast(oUrlCdb.db + "_change"); //FIXME  ne pas declacher l'event lorsque la modification vien du local.
                }
            }).on('paused', function () {
                // replication paused (e.g. user went offline)
                $log.info(oUrlCdb.db + '_paused');
            }).on('active', function () {
                // replicate resumed (e.g. user went back online)
                $log.info(oUrlCdb.db + '_active');
            }).on('denied', function (info) {
                // a document failed to replicate, e.g. due to permissions
                $log.error(oUrlCdb.db + '_denied');
                $log.error(info);
            }).on('complete', function (info) {
                // handle complete
                $log.info(oUrlCdb.db + '_complete');
                $log.info(info);
            }).on('error', function (err) {
                // handle error
                $log.error(oUrlCdb.db + '_error');
                $log.error(error);
            });
        };



        me.dbConf = function(oUrlCdb){
            me.localDb = new pouchDB(oUrlCdb.db);
            me.synclocalDb =   me.initiateSync(oUrlCdb);

        };



    })