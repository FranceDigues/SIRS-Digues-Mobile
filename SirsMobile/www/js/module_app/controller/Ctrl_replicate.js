angular.module('module_app.controllers.replicate', ['module_app.services.context'])

    .controller('ReplicateController', function ReplicateController($q, $timeout, $location, AuthService, DatabaseService, PouchService) {

        var self = this;

        var localDB = PouchService.getLocalDB();

        var remoteDB = PouchService.getRemoteDB();

        var indexedViews = [
            'Utilisateur/byLogin',
            'Element/byClassAndLinear'
        ]; // TODO → make it configurable ?


        (function firstStep() {
            self.step = 1;
            self.description = 'Connexion à la base de données...';
            self.percent = 0;
            self.completion = null;

            var deferred = $q.defer();

            remoteDB.info()
                .then(function(result) {
                    deferred.resolve(result.doc_count);
                })
                .catch(function(error) {
                    deferred.reject(error);
                });

            deferred.promise.then(firstStepComplete, firstStepError);
        })(); // run it

        function firstStepComplete(docCount) {
            // Update step completion percent.
            self.percent = 100;

            // Wait 1000ms before launching the second step.
            $timeout(function() { secondStep(docCount); }, 1000);
        }

        function firstStepError(error) {
            // TODO → handle errors
        }

        function secondStep(docCount) {
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

            deferred.promise.then(secondStepComplete, secondStepError, secondStepProgress);
        }

        function secondStepProgress(state) {
            self.percent = (state.repCount / state.docCount) * 100;
            self.completion = state.repCount + '/' + state.docCount;
        }

        function secondStepComplete() {
            // Wait 1000ms before launching the third step.
            $timeout(thirdStep, 1000);
        }

        function secondStepError(error) {
            // TODO → handle errors
        }

        function thirdStep() {
            self.step = 3;
            self.description = 'Indexation des documents...';
            self.percent = 0;
            self.completion = '0/' + indexedViews.length;

            var promise = $q.when(); // empty promise for chaining

            angular.forEach(indexedViews, function(view, i) {
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

            promise.then(thirdStepComplete, thirdStepError, thirdStepProgress);
        }

        function thirdStepProgress(proceedViews) {
            self.percent = (proceedViews / indexedViews.length) * 100;
            self.completion = proceedViews + '/' + indexedViews.length;
        }
        
        function thirdStepComplete() {
            DatabaseService.getActive().replicated = true;
            if (AuthService.isNull()) {
                $location.path('/login');
            } else {
                $location.path('/home');
            }
        }

        function thirdStepError(error) {
            // TODO → handle errors
        }
    });