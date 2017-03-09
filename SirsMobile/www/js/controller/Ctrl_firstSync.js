angular.module('app.controllers.first_sync', ['app.services.context'])

    .controller('FirstSyncController', function SyncController($q, $timeout, DatabaseService, PouchService,
                                                               MapManager, featureCache, $location) {

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
            // 'Element/byClassAndLinear'
        ]; // TODO → make it configurable ?

        self.db = DatabaseService.getActive();

        self.status = 0;

        sync.call();

        function sync() {
            self.percent = 0;
            self.completion = '0/' + 1;
            self.status = 1;

            var promise = $q.when(); // empty promise for chaining

            promise = promise.then(function() {
                    var deferred = $q.defer();

                    PouchDB.sync(localDB,remoteDB)
                        .on('complete', function() {
                            deferred.resolve();
                        })
                        .on('error', function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
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
                $location.path('/main');
            }, 1000);
        }

        function syncError() {
            $timeout(function() {
                self.status = 3;
            }, 1000);
        }
    });