angular.module('module_app.controllers.replicate', ['module_app.services.context'])

    .constant('replicationViews', [
        'Utilisateur/byLogin',
        'Element/byClassAndLinear'
    ])

    .controller('ReplicateController', function ReplicateController($log, $q, $timeout, $location, AuthService, DsService, DbService, replicationViews) {

        var self = this;

        var localDB = DbService.getLocal();

        var remoteDB = DbService.getRemote();


        function step1() {
            self.step = 1;
            self.description = 'Connexion à la base de données...';
            self.percent = 0;
            self.completion = null;

            var deferred = $q.defer();

            remoteDB.info()
                .then(function(result) {
                    deferred.resolve(result.doc_count);
                }).catch(function(error) {
                    deferred.reject(error);
                });

            deferred.promise.then(step1Complete, step1Error);
        }

        function step1Complete(docCount) {
            // Update step completion percent.
            self.percent = 100;

            // Wait 1000ms before launching the second step.
            $timeout(function() { step2(docCount); }, 1000);
        }

        function step1Error(error) {
            // TODO → handle errors
        }

        function step2(docCount) {
            self.step = 2;
            self.description = 'Téléchargement des documents...';
            self.percent = 0;
            self.completion = '0/' + docCount;

            var deferred = $q.defer();

            remoteDB.replicate.to(localDB, { live: false, retry: true })
                .on('change', function(result) {
                    deferred.notify({
                        repCount: Math.min(result.last_seq, docCount),
                        docCount: docCount
                    });
                })
                .on('complete', function() {
                    deferred.resolve();
                })
                .on('error', function(error) {
                    deferred.reject(error);
                });

            deferred.promise.then(step2Complete, step2Error, step2Progress);
        }

        function step2Progress(info) {
            self.percent = (info.repCount / info.docCount) * 100;
            self.completion = info.repCount + '/' + info.docCount;
        }

        function step2Complete() {
            // Wait 1000ms before launching the third step.
            $timeout(step3, 1000);
        }

        function step2Error(error) {
            // TODO → handle errors
        }

        function step3() {
            self.step = 3;
            self.description = 'Indexation...';
            self.percent = 0;
            self.completion = '0/' + replicationViews.length;

            var promise = $q.when(0);

            angular.forEach(replicationViews, function(view, i) {
                promise = promise.then(function() {
                    var deferred = $q.defer();

                    localDB.query(view, {
                        limit: 0
                    }).then(function() {
                        deferred.notify(i + 1);
                        deferred.resolve();
                    }).catch(function(error) {
                        deferred.reject(error);
                    });

                    return deferred.promise;
                });
            });

            promise.then(step3Complete, step3Error, step3Progress);
        }

        function step3Progress(proceedViews) {
            self.percent = (proceedViews / replicationViews.length) * 100;
            self.completion = proceedViews + '/' + replicationViews.length;
        }
        
        function step3Complete() {
            DsService.getActiveRemote().replicated = true;
            if (AuthService.isNull()) {
                $location.path('/login');
            } else {
                $location.path('/home');
            }
        }

        function step3Error(error) {
            // TODO → handle errors
        }


        step1();
    });