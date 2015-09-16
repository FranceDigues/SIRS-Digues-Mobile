angular.module('module_app.services.dao', ['module_app.services.utils'])

    .service('PouchDocument', function PouchDocument($q, sPouch) {

        var self = this;

        self.get = function(id) {
            return sPouch.localDb.get(id);
        };

        self.queryOne = function(fun, key) {
            var deferred = $q.defer();

            sPouch.localDb.query(fun, { key: key, include_docs: true }).then(
                function onSuccess(result) {
                    if (result.rows.length === 1) {
                        deferred.resolve(result.rows[0].doc);
                    } else {
                        deferred.reject();
                    }
                },
                function onError() {
                    deferred.reject();
                });

            return deferred.promise;
        };

        self.query = function(fun, key) {
            var deferred = $q.defer();

            sPouch.localDb.query(fun, { key: key, include_docs: true }).then(
                function onSuccess(result) {
                    deferred.resolve(result.rows.map(function(row) {
                        return row.doc;
                    }));
                },
                function onError() {
                    deferred.reject();
                });

            return deferred.promise;
        };

        self.save = function(doc) {
            var deferred = $q.defer();

            sPouch.localDb.put(doc).then(
                function onSuccess(response) {
                    doc._rev = response.rev;
                    deferred.resolve(doc);
                },
                function onError() {
                    deferred.reject();
                });

            return deferred.promise;
        };

        self.create = function(doc) {
            var deferred = $q.defer();

            sPouch.localDb.post(doc).then(
                function onSuccess(result) {
                    doc._id = result.id;
                    doc._rev = result.rev;
                    deferred.resolve(doc);
                },
                function onError() {
                    deferred.reject();
                });

            return deferred.promise;
        };

        self.remove = function(doc) {
            return sPouch.localDb.remove(doc);
        };
    });