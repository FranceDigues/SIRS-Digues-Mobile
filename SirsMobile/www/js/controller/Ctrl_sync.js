angular.module('app.controllers.sync', ['app.services.context'])

    .controller('SyncController', function SyncController($q, $timeout, DatabaseService, PouchService, MapManager,$location) {

        var self = this;

        var localDB = PouchService.getLocalDB();

        var remoteDB = PouchService.getRemoteDB();

        var syncViews = [
            'Synchronisation avec la base de données ...'
        ];


        self.db = DatabaseService.getActive();

        self.status = 0;

        self.launch = sync;

        self.cancelSync = function () {
            self.sync ? self.sync.cancel() : angular.noop();
            $location.path('/main');
        };

        function sync() {
            self.percent = 0;
            self.completion = '0/' + syncViews.length;
            self.status = 1;

            var promise = $q.when(); // empty promise for chaining

            angular.forEach(syncViews, function(view, i) {
                promise = promise.then(function() {
                    var deferred = $q.defer(),
                        options = {live:false,retry:true,batch_size:1,batches_limit:1};
                    self.view = view;

                    self.sync = PouchDB.sync(localDB,remoteDB,options)
                        .on('complete', function() {
                            deferred.notify(i + 1);
                            deferred.resolve();
                            console.debug("complete");
                        })
                        .on('error', function(error) {
                            deferred.notify(i + 1);
                            deferred.reject(error);
                            console.debug("error",error);
                        }).on('change', function (info) {
                            console.debug("change",info);
                        }).on('paused', function (err) {
                            console.debug("paused",err);
                        }).on('active', function () {
                            console.debug("active");
                        }).on('denied', function (err) {
                            console.debug("denied",err);
                        });

                    return deferred.promise;
                });
            });

            promise.then(syncComplete, syncError, syncProgress);
        }

        function syncProgress(proceedViews) {
            self.percent = (proceedViews / syncViews.length) * 100;
            self.completion = proceedViews + '/' + syncViews.length;
        }

        function syncComplete() {
            $timeout(function() {
                self.db.lastSync = new Date().getTime(); // store sync timestamp
                self.status = 2;
                MapManager.redrawEditionLayerAfterSynchronization();

            }, 1000);
        }

        function syncError() {
            $timeout(function() {
                self.status = 3;
            }, 1000);
        }
    });