angular.module('app.controllers.replicate', ['app.services.context'])

    .controller('ReplicateController', function ReplicateController($q, $log, $timeout, $location, $ionicPopup,
                                                                    AuthService, DatabaseService, PouchService) {

        var self = this;

        var localDB = PouchService.getOrCreateLocalDB();

        var remoteDB = PouchService.getRemoteDB();

        // Les vues de couchdb indexé afin de rendre l'application rapide
        var indexedViews = [
            'Utilisateur/byLogin',
            'Element/byClassAndLinear',
            'Document/byPath',
            'TronconDigue/streamLight'
        ]; // TODO → make it configurable ?

        var syncViews = [
            // 'Utilisateur/byLogin',
            // 'Element/byClassAndLinear'
        ]; // TODO → make it configurable ?

        var designDocs = [
            {
                _id: '_design/objetsNonClos',
                views: {
                    byAuthor: {
                        map: function(doc) {
                            if (doc.author && !doc.valid && doc.positionDebut && !doc.positionFin) {
                                emit(doc.author);
                            }
                        }.toString()
                    }
                }
            },
            {
                _id: '_design/objetsClos',
                views: {
                    byAuthor: {
                        map: function(doc) {
                            if (doc.author && !doc.valid && doc.positionDebut && doc.positionFin) {
                                emit(doc.author, {
                                    '@class': doc['@class'],
                                    'id': doc._id,
                                    'rev': doc._rev,
                                    'designation': doc.designation,
                                    'libelle': doc.libelle,
                                    'positionDebut': doc.positionDebut,
                                    'positionFin': doc.positionFin
                                });
                            }
                        }.toString()
                    }
                }
            },
            {
                _id: '_design/Document',
                views: {
                    byPath: {
                        map: function(doc) {
                            if (doc.chemin) {
                                var path = doc.chemin.replace(/\\/g, '/');
                                if (path.indexOf('/')) {
                                    path = path.substring(1);
                                }
                                emit(path, {
                                    '@class': doc['@class'],
                                    'id': doc._id,
                                    'rev': doc._rev,
                                    'libelle': doc.libelle,
                                    'commentaire': doc.commentaire
                                });
                            }
                        }.toString()
                    }
                }
            }
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
            $log.debug(error);

            $ionicPopup.alert({
                title: 'Erreur',
                template: 'Une erreur s\'est produite lors de la connexion à la base de données.'
            }).then(backToDatabase);
        }

        function secondStep(docCount) {
            self.step = 2;
            self.description = 'Téléchargement des documents...';
            self.percent = 0;
            self.completion = '0/' + docCount;

            var deferred = $q.defer();

            remoteDB.replicate.to(localDB, { live: false, retry: true, batch_size : 10 })
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
            $log.debug(error);

            $ionicPopup.alert({
                title: 'Erreur',
                template: 'Une erreur s\'est produite lors du téléchargement des documents.'
            }).then(backToDatabase);
        }

        function thirdStep() {
            self.step = 3;
            self.description = 'Préparation de l\'espace de travail...';
            self.percent = 0;
            self.completion = '0/' + designDocs.length;

            var promise = $q.when(); // empty promise for chaining

            angular.forEach(designDocs, function(designDoc, i) {
                promise = promise.then(function() {
                    var deferred = $q.defer();

                    localDB.put(designDoc)
                        .then(function() {
                            deferred.notify(i + 1);
                            deferred.resolve();
                        }).catch(function(error) {
                            deferred.notify(i + 1);
                            if (error.status === 409) {
                                deferred.resolve(); // already done
                            } else {
                                deferred.reject(error);
                            }
                        });

                    return deferred.promise;
                });
            });

            promise.then(thirdStepComplete, thirdStepError, thirdStepProgress);
        }

        function thirdStepProgress(proceedDocs) {
            self.percent = (proceedDocs / designDocs.length) * 100;
            self.completion = proceedDocs + '/' + designDocs.length;
        }

        function thirdStepComplete() {
            // Wait 1000ms before launching the fourth step.
            $timeout(fourthStep, 1000);
        }

        function thirdStepError() {
            $ionicPopup.alert({
                title: 'Erreur',
                template: 'Une erreur s\'est produite lors de la préparation de l\'espace de travail.'
            }).then(backToDatabase);
        }

        function fourthStep() {
            self.step = 4;
            self.description = 'Construction des index...';
            self.percent = 0;
            self.completion = '0/' + indexedViews.length;

            var promise = $q.when(); // empty promise for chaining

            angular.forEach(indexedViews, function(view, i) {
                promise = promise.then(function() {
                    var deferred = $q.defer();

                    localDB.query(view, { limit: 0 })
                        .then(function() {
                            deferred.notify(i + 1);
                            deferred.resolve();
                        }).catch(function(error) {
                            deferred.notify(i + 1);
                            deferred.reject(error);
                        });

                    return deferred.promise;
                });
            });

            promise.then(fourthStepComplete, fourthStepError, fourthStepProgress);
        }

        function fourthStepProgress(proceedViews) {
            self.percent = (proceedViews / indexedViews.length) * 100;
            self.completion = proceedViews + '/' + indexedViews.length;
        }
        
        function fourthStepComplete() {
            $timeout(fifthStep, 1000);
        }

        function fourthStepError(error) {
            $log.debug(error);

            $ionicPopup.alert({
                title: 'Erreur',
                template: 'Une erreur s\'est produite lors de la construction des index.'
            }).then(backToDatabase);
        }

        function fifthStep() {

            self.step = 5;
            self.description = 'Synchronisation avec la base de données distantes...';
            self.percent = 0;
            self.completion = '0/' + syncViews.length;
            self.status = 1;

            var promise = $q.when(); // empty promise for chaining

                angular.forEach(syncViews, function(view, i) {
                    promise = promise.then(function() {
                        var deferred = $q.defer(),
                            options = { live: false, retry: false, filter: '_view', view: view };

                        localDB.sync(remoteDB, options)
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

            promise.then(fifthStepComplete, fifthStepError, fifthStepProgress);




            /*

             __---___---_________________________________________________________---___---__
             ===============================================================================
             ||||                             # HILMI #                                 ||||
             |---------------------------------------------------------------------------|
             |___-----___-----___-----___-----___-----___-----___-----___-----___-----___|
             / _ \===/ _ \   / _ \===/ _ \   / _ \===/ _ \   / _ \===/ _ \   / _ \===/ _ \
             ( (.\ oOo /.) ) ( (.\ oOo /.) ) ( (.\ oOo /.) ) ( (.\ oOo /.) ) ( (.\ oOo /.) )
             \__/=====\__/   \__/=====\__/   \__/=====\__/   \__/=====\__/   \__/=====\__/
                |||||||         |||||||         |||||||         |||||||         |||||||
                |||||||         |||||||         |||||||         |||||||         |||||||
                |||||||         |||||||         |||||||         |||||||         |||||||
                |||||||         |||||||         |||||||         |||||||         |||||||
                |||||||         |||||||         |||||||         |||||||         |||||||
                |||||||         |||||||         |||||||         |||||||         |||||||
                |||||||         |||||||         |||||||         |||||||         |||||||
                |||||||         |||||||         |||||||         |||||||         |||||||
                (oOoOo)         (oOoOo)         (oOoOo)         (oOoOo)         (oOoOo)
                J%%%%%L         J%%%%%L         J%%%%%L         J%%%%%L         J%%%%%L
                ZZZZZZZZZ      ZZZZZZZZZ       ZZZZZZZZZ       ZZZZZZZZZ       ZZZZZZZZZ
             ===========================================================================
             __|_________________________________________________________________________|__
             _|___________________________________________________________________________|_
             |_____________________________________________________________________________|
             _______________________________________________________________________________

*/

        }

        function fifthStepProgress(proceedViews) {
            self.percent = (proceedViews / syncViews.length) * 100;
            self.completion = proceedViews + '/' + syncViews.length;
        }

        function fifthStepComplete() {
            DatabaseService.getActive().replicated = true;
            $timeout(function() {
                if (AuthService.isNull()) {
                    $location.path('/login');
                } else {
                    $location.path('/main');
                }
            }, 1000);
        }

        function fifthStepError(error) {
            $log.debug(error);

            $ionicPopup.alert({
                title: 'Erreur',
                template: 'Une erreur s\'est produite lors de la synchronisation'
            }).then(backToDatabase);
        }

        function backToDatabase() {
            $location.path('/database');
        }
    });