angular.module('module_app.services.dao', ['module_app.services.context'])

    .service('DbService', function DbService($rootScope, DsService) {

        var self = this;

        var remoteDB = null;

        var localDB = null;

        var activeRemote = DsService.getActiveRemote();


        self.getRemote = function() {
            if (!remoteDB && activeRemote) {
                remoteDB = new PouchDB(activeRemote.url, {
                    auth: {
                        username: activeRemote.username,
                        password: activeRemote.password
                    }
                })
            }
            return remoteDB;
        };

        self.getLocal = function() {
            if (!localDB && activeRemote) {
                localDB = new PouchDB(activeRemote.name);
            }
            return localDB;
        };


        $rootScope.$on('remoteChanged', function(event, newRemote) {
            remoteDB = localDB = null;
            activeRemote = newRemote;
        });
    })

    .service('PouchDocument', function PouchDocument($q, DbService) {

        var self = this;

        self.get = function(id) {
            return DbService.getLocal().get(id);
        };

        self.queryOne = function(fun, key) {
            var deferred = $q.defer();

            DbService.getLocal().query(fun, { key: key, include_docs: true }).then(
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

            DbService.getLocal().query(fun, { key: key, include_docs: true }).then(
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

            DbService.getLocal().put(doc).then(
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

            DbService.getLocal().post(doc).then(
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
            return DbService.getLocal().remove(doc);
        };
    });