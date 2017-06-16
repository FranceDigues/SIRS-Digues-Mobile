angular.module('app.controllers.sync', ['app.services.context'])

    .controller('SyncController', function SyncController($q, $timeout, DatabaseService, PouchService, MapManager, featureCache) {

        var self = this;

        var localDB = PouchService.getLocalDB();

        var remoteDB = PouchService.getRemoteDB();

        /*
           ___ ___ .__.__          .__     __________                    .__  .__
          /   |   \|__|  |   _____ |__|    \______   \ ____  __ _______  |  | |  |   ____   ____  __ __   ____
         /    ~    \  |  |  /     \|  |     |    |  _//  _ \|  |  \__  \ |  | |  | _/ __ \ / ___\|  |  \_/ __ \
         \    Y    /  |  |_|  Y Y  \  |     |    |   (  <_> )  |  // __ \|  |_|  |_\  ___// /_/  >  |  /\  ___/
         \___|_  /|__|____/__|_|  /__|     |______  /\____/|____/(____  /____/____/\___  >___  /|____/  \___  >
         \/               \/                \/                  \/               \/_____/             \/
         */
        var syncViews = [
            // 'Utilisateur/byLogin',
            // 'Element/byClassAndLinear',
            'Synchronisation avec la base de données ...'
        ]; // TODO → make it configurable ?


        self.db = DatabaseService.getActive();

        self.status = 0;

        self.launch = sync;

        function sync() {
            self.percent = 0;
            self.completion = '0/' + syncViews.length;
            self.status = 1;

            var promise = $q.when(); // empty promise for chaining

            angular.forEach(syncViews, function(view, i) {
                promise = promise.then(function() {
                    var deferred = $q.defer(),
                        options = { live: false, retry: true};
                    self.view = view;

                    PouchDB.sync(localDB,remoteDB, options)
                        .on('complete', function() {
                            deferred.notify(i + 1);
                            deferred.resolve();
                        })
                        .on('error', function(error) {
                            deferred.notify(i + 1);
                            deferred.reject(error);
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