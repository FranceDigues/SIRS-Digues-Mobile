/**
 * Created by dardie roch on 03/04/15.
 */
angular.module('data.services.source', [])

    .service('sPouch', function(pouchDB,$log,$ionicPlatform) {

        var me = this;

        /**
         * instanciation de tte les base
         * @type {pouchDB}
         */
        me.cfg = new pouchDB('moskito_config');
        me.usr = new pouchDB('moskito_user');
        me.layer = new pouchDB('moskito_layer');

        /**
         * replication initiale
         */
        PouchDB.replicate('http://178.32.34.74:5984/moskito_config','moskito_config');
        PouchDB.replicate('http://178.32.34.74:5984/moskito_user','moskito_user');
        PouchDB.replicate('http://178.32.34.74:5984/moskito_layer','moskito_layer');





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


        /**
         * generation des index en local de la base PouchDb
         * @type {{_id: string, views: {name_index: {map: *}}}}
         */

        var designDoc = {
            _id: '_design/name_index',
            views: {
                'name_index': {
                    map: function(doc) {
                        emit(doc.name, doc.psw);
                    }.toString()
                }
            }
        };


        me.usr.put(designDoc).then(function (info) {
            // design doc created
            $log.debug(info);
        }).catch(function (err) {
            // if err.name === 'conflict', then
            // design doc already exists
            $log.debug(err);
        });

    })