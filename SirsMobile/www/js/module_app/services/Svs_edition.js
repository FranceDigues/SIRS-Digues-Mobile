angular.module('module_app.services.edition', ['module_app.services.context'])

    .provider('EditionService', function EditionService() {

        // TODO → should be configured

        this.$get = function($rootScope, $q, AuthService, LocalDocument, ContextService) {

            var context = ContextService.getValue();

            var refTypes = [
                { name: 'EchelleLimnimetrique', include_docs: false },
                { name: 'RefCote',              include_docs: false },
                { name: 'RefCategorieDesordre', include_docs: true  },
                { name: 'RefFonction',          include_docs: false },
                { name: 'RefLargeurFrancBord',  include_docs: false },
                { name: 'RefMateriau',          include_docs: false },
                { name: 'RefNature',            include_docs: false },
                { name: 'RefPosition',          include_docs: false },
                { name: 'RefReferenceHauteur',  include_docs: false },
                { name: 'RefTypeDesordre',      include_docs: false }
            ];  // TODO → make it configurable ?

            return {
                newObject: function(type) {
                    return {
                        '@class': 'fr.sirs.core.model.' + type,
                        'auteur': AuthService.getValue()._id,
                        'valid': false,
                        'photos': [],
                        'linearId': null
                    };
                },

                saveObject: function(objectDoc) {
                    return LocalDocument.save(objectDoc).then(function() {
                        $rootScope.$broadcast('editionObjectSaved', objectDoc);
                        return objectDoc;
                    });
                },

                getClosableObjects: function() {
                    return LocalDocument.query('objetsNonClos/byAuteur', {
                        key: AuthService.getValue()._id,
                        include_docs: true
                    });
                },

                getClosedObjects: function() {
                    return LocalDocument.query('objetsClos/byAuteur', {
                        key: AuthService.getValue()._id,
                        include_docs: false
                    });
                },

                getReferenceTypes: function() {
                    var promises = {};

                    angular.forEach(refTypes, function(refType) {
                        var deferred = $q.defer(),
                            classPath = 'fr.sirs.core.model.' + refType.name;

                        LocalDocument.query('Element/byClassAndLinear', {
                            startkey: [classPath],
                            endkey: [classPath, {}],
                            include_docs: refType.include_docs
                        }).then(
                            function(results) {
                                var values = results.map(function(item) {
                                    return refType.include_docs ? item.doc : item.value;
                                });
                                deferred.resolve(values);
                            },
                            function(error) {
                                deferred.reject(error);
                            });

                        promises[refType] = deferred.promise;
                    });

                    return $q.all(promises);
                },

                isEnabled: function() {
                    return (context.settings.edition === true);
                },

                toggle: function() {
                    context.settings.edition = !context.settings.edition;
                    $rootScope.$broadcast('editionModeChanged', context.settings.edition);
                },
            };
        };
    });