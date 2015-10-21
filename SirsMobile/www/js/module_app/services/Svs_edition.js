angular.module('module_app.services.edition', ['module_app.services.context'])

    .provider('EditionService', function EditionService() {

        // TODO → should be configured

        this.$get = function($rootScope, AuthService, LocalDocument, ContextService) {

            var context = ContextService.getValue();

            return {
                newObject: function(type) {
                    return {
                        '@class': 'fr.sirs.core.model.' + type,
                        'author': AuthService.getValue()._id,
                        'valid': false
                    };
                },

                saveObject: function(objectDoc) {
                    return LocalDocument.save(objectDoc).then(function() {
                        $rootScope.$broadcast('editionObjectSaved', objectDoc);
                        return objectDoc;
                    });
                },

                getClosableObjects: function() {
                    return LocalDocument.query('objetsNonClos/byLogin', {
                        key: AuthService.getValue()._id,
                        include_docs: true
                    });
                },

                getClosedObjects: function() {
                    return LocalDocument.query('objetsClos/byLogin', {
                        key: AuthService.getValue()._id,
                        include_docs: false
                    });
                },

                isEnabled: function() {
                    return (context.settings.edition === true);
                },

                toggle: function() {
                    context.settings.edition = !context.settings.edition;
                    $rootScope.$broadcast('editionModeChanged', context.settings.edition);
                }
            };
        };
    });