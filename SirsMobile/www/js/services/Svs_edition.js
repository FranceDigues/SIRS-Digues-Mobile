angular.module('app.services.edition', ['app.services.context'])

    .provider('EditionService', function EditionService() {

        // TODO → should be configured

        this.$get = function ($rootScope, $q, AuthService, LocalDocument, ContextService) {

            var context = ContextService.getValue();

            var refTypes = [
                {name: 'Berge', include_docs: false},
                {name: 'EchelleLimnimetrique', include_docs: false},
                {name: 'OuvrageRevanche', include_docs: false},
                {name: 'OuvrageTelecomEnergie', include_docs: false},
                {name: 'RefCote', include_docs: false},
                {name: 'RefCategorieDesordre', include_docs: false},
                {name: 'RefConduiteFermee', include_docs: false},
                {name: 'RefEcoulement', include_docs: false},
                {name: 'RefFonction', include_docs: false},
                {name: 'RefImplantation', include_docs: false},
                {name: 'RefLargeurFrancBord', include_docs: false},
                {name: 'RefMateriau', include_docs: false},
                {name: 'RefNature', include_docs: false},
                {name: 'RefOuvrageFranchissement', include_docs: false},
                {name: 'RefOuvrageParticulier', include_docs: false},
                {name: 'RefOrientationOuvrage', include_docs: false},
                {name: 'RefOuvrageHydrauliqueAssocie', include_docs: false},
                {name: 'RefOuvrageTelecomEnergie', include_docs: false},
                {name: 'RefOuvrageVoirie', include_docs: false},
                {name: 'RefPosition', include_docs: false},
                {name: 'RefReferenceHauteur', include_docs: false},
                {name: 'RefRevetement', include_docs: false},
                {name: 'RefSeuil', include_docs: false},
                {name: 'RefTypeDesordre', include_docs: true},
                {name: 'RefTypeGlissiere', include_docs: false},
                {name: 'RefReseauHydroCielOuvert', include_docs: false},
                {name: 'RefReseauTelecomEnergie', include_docs: false},
                {name: 'RefUsageVoie', include_docs: false},
                {name: 'RefUtilisationConduite', include_docs: false},
                {name: 'RefVoieDigue', include_docs: false},
                {name: 'ReseauHydrauliqueFerme', include_docs: false},
                {name: 'ReseauTelecomEnergie', include_docs: false}
            ];  // TODO → make it configurable ?

            return {
                newObject: function (type) {
                    var objectDoc = {
                        '@class': 'fr.sirs.core.model.' + type,
                        'author': AuthService.getValue()._id,
                        'valid': false,
                        'linearId': null,
                        'editMode': true
                    };
                    if (type !== 'Desordre') {
                        objectDoc.photos = [];
                    }
                    return objectDoc;
                },

                saveObject: function (objectDoc) {
                    return LocalDocument.save(objectDoc).then(function () {
                        $rootScope.$broadcast('editionObjectSaved', objectDoc);
                        return objectDoc;
                    });
                },

                getClosableObjects: function () {
                    return LocalDocument.query('objetsNonClosByBorne/byAuthor', {
                        key: AuthService.getValue()._id,
                        include_docs: true
                    });
                },

                getClosedObjects: function () {
                    return LocalDocument.query('objetsClosByBorne/byAuthor', {
                        key: AuthService.getValue()._id,
                        include_docs: true
                    });
                },
                getEditionModeObjects3: function () {
                    return LocalDocument.query('objetsModeEdition3/objetsModeEdition3', {
                        include_docs: true
                    });
                },

                getReferenceTypes: function () {
                    var promises = {};

                    angular.forEach(refTypes, function (refType) {
                        var deferred = $q.defer(),
                            classPath = 'fr.sirs.core.model.' + refType.name;

                        LocalDocument.query('byClassAndLinearRef', {
                            startkey: [classPath],
                            endkey: [classPath, {}],
                            include_docs: refType.include_docs
                        }).then(
                            function (results) {
                                var values = results.map(function (item) {
                                    return refType.include_docs ? item.doc : item.value;
                                });
                                deferred.resolve(values);
                            },
                            function (error) {
                                deferred.reject(error);
                            });

                        promises[refType.name] = deferred.promise;
                    });

                    return $q.all(promises);
                },

                isEnabled: function () {
                    return (context.settings.edition === true);
                },

                toggle: function () {
                    context.settings.edition = !context.settings.edition;
                    $rootScope.editionModeFlag = !$rootScope.editionModeFlag;
                    $rootScope.$broadcast('editionModeChanged', context.settings.edition);
                }

            };
        };
    });
