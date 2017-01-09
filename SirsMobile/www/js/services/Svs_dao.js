angular.module('app.services.dao', ['app.services.context'])

    .service('PouchService', function PouchService($rootScope, DatabaseService) {

        var self = this;

        var remoteDB = null;

        var localDB = null;

        var activeDb = DatabaseService.getActive();


        self.getRemoteDB = function() {
            if (!activeDb) {
                throw new Error('No active database.');
            }
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

        self.getOrCreateLocalDB = function() {
            if (!activeDb) {
                throw new Error('No active database.');
            }
            if (!localDB && activeDb) {
                localDB = new PouchDB(activeDb.name);
            }
            return localDB;
        };

        self.getLocalDB = function() {
            if (!activeDb || !activeDb.replicated) {
                throw new Error('No active database or active database is not replicated yet.');
            }
            if (!localDB && activeDb) {
                localDB = new PouchDB(activeDb.name);
            }
            return localDB;
        };


        $rootScope.$on('databaseChanged', function(event, newDb) {
            remoteDB = localDB = null;
            activeDb = newDb;
        });
    })

    .service('LocalDocument', function LocalDocument($q, PouchService) {

        var self = this;

        self.get = function(id) {
            var deferred = $q.defer();

            PouchService.getLocalDB().get(id)
                .then(function(result) {
                    deferred.resolve(result);
                })
                .catch(function(error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        };

        self.queryOne = function(fun, options) {
            var deferred = $q.defer();

            PouchService.getLocalDB().query(fun, options)
                .then(function(result) {
                    if (result.rows.length === 1) {
                        deferred.resolve(result.rows[0]);
                    } else {
                        deferred.reject();
                    }
                })
                .catch(function(error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        };

        self.query = function(fun, options) {
            var deferred = $q.defer();

            PouchService.getLocalDB().query(fun, options)
                .then(function(result) {
                    deferred.resolve(result.rows);
                })
                .catch(function(error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        };

        self.save = function(doc) {
            var deferred = $q.defer();

            PouchService.getLocalDB().put(doc)
                .then(function(result) {
                    doc._rev = result.rev;
                    deferred.resolve(doc);
                })
                .catch(function(error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        };

        self.create = function(doc) {
            var deferred = $q.defer();

            PouchService.getLocalDB().post(doc)
                .then(function(result) {
                    doc._id = result.id;
                    doc._rev = result.rev;
                    deferred.resolve(doc);
                })
                .catch(function(error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        };

        self.remove = function(doc) {
            var deferred = $q.defer();

            PouchService.getLocalDB().remove(doc)
                .then(function(result) {
                    deferred.resolve(result);
                })
                .catch(function(error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        };
    })

    .service('SirsDoc', function SirsDoc($rootScope, $q, LocalDocument) {

        var self = this;

        var doc = undefined;


        self.get = function() {
            return doc;
        };

        self.getOrLoad = function() {
            if (doc) {
                return $q.when(doc);
            }
            return LocalDocument.get('$sirs').then(function(result) {
                return (doc = result);
            });
        };


        $rootScope.$on('databaseChanged', function() {
            doc = undefined;
        });
    });