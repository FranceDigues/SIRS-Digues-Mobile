angular.module('module_app.services.dao', ['module_app.services.context'])

    .service('PouchService', function PouchService($rootScope, DatabaseService) {

        var self = this;

        var remoteDB = null;

        var localDB = null;

        var activeDb = DatabaseService.getActive();


        self.getRemoteDB = function() {
            if (!remoteDB && activeDb) {
                remoteDB = new PouchDB(activeDb.url, {
                    auth: {
                        username: activeDb.username,
                        password: activeDb.password
                    }
                })
            }
            return remoteDB;
        };

        self.getLocalDB = function() {
            if (!localDB && activeDb) {
                localDB = new PouchDB(activeDb.name);
            }
            return localDB;
        };


        $rootScope.$on('databaseChanged', function(event, newRemote) {
            remoteDB = localDB = null;
            activeDb = newRemote;
        });
    })

    .service('PouchDocument', function PouchDocument($q, PouchService) {

        var self = this;

        self.get = function(id) {
            return PouchService.getLocalDB().get(id);
        };

        self.queryOne = function(fun, key) {
            var deferred = $q.defer();

            PouchService.getLocalDB().query(fun, { key: key, include_docs: true }).then(
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

            PouchService.getLocalDB().query(fun, { key: key, include_docs: true }).then(
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

            PouchService.getLocalDB().put(doc).then(
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

            PouchService.getLocalDB().post(doc).then(
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
            return PouchService.getLocalDB().remove(doc);
        };
    });