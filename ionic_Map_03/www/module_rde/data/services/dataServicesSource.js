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
        me.cfg = new pouchDB('moskito_config');
        me.usr = new pouchDB('moskito_user');
        me.layer = new pouchDB('moskito_layer');
        me.form = new pouchDB('moskito_form');
        me.obs = new pouchDB('moskito_obs');


            //instancie une syncro bi-directionelle avec support de l'interuption, et propagation des evenement change
            //les evenements sont nomer comme la database
        me.initiateSync = function (database) {
            return PouchDB.sync("" + database, 'http://178.32.34.74:5984/' + database, {
                live: true,
                retry: true
            }).on('change', function (info) {
                // handle change
                $log.debug(database + '_change');
                $log.debug(info);
                if (info.direction == "pull") {
                    $rootScope.$broadcast(database + "_change"); //FIXME  ne pas declacher l'event lorsque la modification vien du local.
                }
            }).on('paused', function () {
                // replication paused (e.g. user went offline)
                $log.debug(database + '_paused');
            }).on('active', function () {
                // replicate resumed (e.g. user went back online)
                $log.debug(database + '_active');
            }).on('denied', function (info) {
                // a document failed to replicate, e.g. due to permissions
                $log.debug(database + '_denied');
                $log.debug(info);
            }).on('complete', function (info) {
                // handle complete
                $log.debug(database + '_complete');
                $log.debug(info);
            }).on('error', function (err) {
                // handle error
                $log.debug(database + '_error');
                $log.debug(error);
            });
        };


//essai syncro + propagation
        me.esy = new pouchDB('essai_sync');

        //objet pour couper la syncro
        //TODO fonction en gise de constructeur ol School.
        var syncCfg = me.initiateSync("moskito_config");
        var syncUsr = me.initiateSync("moskito_user");
        var syncLayer = me.initiateSync("moskito_layer");
        var syncForm = me.initiateSync("moskito_form");
        var syncObs = me.initiateSync("moskito_obs");


        //me.cfg.allDocs().then(function (result) {
        //    console.log(result);
        //}).catch(function (err) {
        //    console.log(err);
        //});
        //
        //me.usr.allDocs().then(function (result) {
        //    console.log(result);
        //}).catch(function (err) {
        //    console.log(err);
        //});
        //
        //me.layer.allDocs().then(function (result) {
        //    console.log(result);
        //}).catch(function (err) {
        //    console.log(err);
        //});
        //
        //me.form.allDocs().then(function (result) {
        //    console.log("form");
        //    console.log(result);
        //}).catch(function (err) {
        //    console.log("form");
        //    console.log(err);
        //});


        /**
         * generation des index en local de la base PouchDb
         * @type {{_id: string, views: {name_index: {map: *}}}}
         */

        var designDoc = {
            _id: '_design/name_index',
            views: {
                'name_index': {
                    map: function (doc) {
                        emit(doc.name, doc);
                    }.toString()
                }
            }
        };


        me.usr.put(designDoc).then(function (info) {
            // design doc created
            $log.debug(info);
        }).catch(function (err) {
            // design doc already exists
            $log.debug(err);
        });

    })