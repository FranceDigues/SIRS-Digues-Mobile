/**
 * Created by dardie roch on 03/04/15.
 */
angular.module('module_rde.data.services.source', [])

    .service('sPouch', function sPouch (pouchDB, $log, $rootScope, $timeout, $http) {

        var me = this;

        /**
         * instanciation de tte les base
         * @type {pouchDB}
         */
        me.localDb =  null;

        //objet pour couper la syncro
        me.syncInstanceColector = {};

        me.syncState = {actual:0, total:0, ratio:0 ,  clonning:false}



        //instancie une syncro bi-directionelle avec support de l'interuption, et propagation des evenement change
            //les evenements sont nome comme la base
        me.initiateSync = function (oUrlCdb) {
            $log.info("RUN_db_SYNC");
            me.syncInstanceColector[oUrlCdb.db] = PouchDB.sync("" + oUrlCdb.db, oUrlCdb.getUrlString(), {
                live: true,
                retry: true
            }).on('change', function (info) {
                // handle change
                $log.info(oUrlCdb.db +'_Sync_'+ '_change');
                $log.debug(info);
                if (info.direction == "pull") {
                    $rootScope.$broadcast(oUrlCdb.db + "_change"); //FIXME  ne pas declacher l'event lorsque la modification vien du local.
                }
            }).on('paused', function () {
                // replication paused (e.g. user went offline)
                $log.info(oUrlCdb.db +'_Sync_'+ '_paused');
            }).on('active', function () {
                // replicate resumed (e.g. user went back online)
                $log.info(oUrlCdb.db + '_Sync_'+'_active');
            }).on('denied', function (info) {
                // a document failed to replicate, e.g. due to permissions
                $log.error(oUrlCdb.db +'_Sync_'+ '_denied');
                $log.error(info);
            }).on('complete', function (info) {
                // handle complete
                $log.info(oUrlCdb.db +'_Sync_'+ '_complete');
                $log.info(info);
            }).on('error', function (err) {
                // handle error
                $log.error(oUrlCdb.db +'_Sync_'+ '_error');
                $log.error(error);
            });
        };


        me.instantiateRep = function(oUrlCdb,syncMe){
            $log.info("RUN_db_REP");
            me.syncState.clonning=true;

            //var RemoteDb = new PouchDB(oUrlCdb.getUrlString());


            me.localDb.replicate.from( oUrlCdb.getUrlString(), {
                live: false,
                retry: true
            }).on('change', function (info) {
                $log.info(oUrlCdb.db +'_Repliation_'+ '_paused');
            }).on('paused', function () {
                // replication paused (e.g. user went offline)
                $log.info(oUrlCdb.db +'_Repliation_'+ '_paused');
            }).on('active', function () {
                // replicate resumed (e.g. user went back online)
                $log.info(oUrlCdb.db +'_Repliation_'+ '_active');
            }).on('denied', function (info) {
                // a document failed to replicate, e.g. due to permissions
                $log.error(oUrlCdb.db +'_Repliation_'+ '_denied');
                $log.error(info);
            }).on('complete', function (info) {
                // handle complete
                $log.info(oUrlCdb.db + '_Repliation_'+'_complete');
                $log.info(info);

                me.syncState.clonning = false

                if(syncMe === true) me.initiateSync(oUrlCdb);



            }).on('error', function (err) {
                // handle error
                $log.error(oUrlCdb.db + '_Repliation_'+'_error');
                $log.error(error);

                me.syncState.clonning = false
            });


            me._recursiveRegularGetState();



        }



       me._recursiveRegularGetState =  function(){
           $log.debug("RUN__recursiveRegularGetState")
           $log.debug("RUN__recursiveRegularGetState")


            me.localDb.info().then( function(result){
                $log.debug("RUN__info")
                $log.debug( result)
                $log.debug( me.syncState.clonning)
                $log.debug(me.syncState.actual)
                $log.debug(result.doc_count);

                me.syncState.actual= (result.doc_count / me.syncState.ratio).toFixed(2);

                if(me.syncState.clonning == true){
                    $timeout( me._recursiveRegularGetState,2000);

                }


            });


       }

        me.dbConf = function(oUrlCdb){
            me.localDb = new pouchDB(oUrlCdb.db);
                me.initiateSync(oUrlCdb);
            $log.debug("instance de base");
            $log.debug(me.syncInstanceColector);


        };

        me.dbInit = function(oUrlCdb){

            $http.get(oUrlCdb.getUrlString()).
                success(function(data, status, headers, config) {
                    $log.debug("gettotal")
                    $log.debug(data);
                    me.syncState.total = data.doc_count;
                    me.syncState.ratio = data.doc_count / 100;
                }).
                error(function(data, status, headers, config) {});


            me.localDb = new pouchDB(oUrlCdb.db);
            me.instantiateRep( oUrlCdb,true  );

        };

        me.destroyDb = function(oUrlCdb){
            $log.debug("RUN__clear")

            me.localDb = new pouchDB(oUrlCdb.db);
            me.localDb.destroy().then(function () {
                $log.debug("db_clear")
            }).catch(function (error) {
                console.log(error);
            });

        };





            //$http.get(oUrlCdb.getUrlString()).
            //    success(function(data, status, headers, config) {
            //        $log.debug(data)
            //        //me.syncState.total =
            //    }).
            //    error(function(data, status, headers, config) {
            //        // called asynchronously if an error occurs
            //        // or server returns response with an error status.
            //    });



    })

