angular.module('module_app.services.edition', ['module_app.services.context'])

    .provider('EditionService', function EditionService() {

        // TODO → should be configured

        this.$get = function(sPouch, AuthService, LocalDocument) {
            return {
                newObject: function(type) {
                    return {
                        '@class': 'fr.sirs.core.model.' + type,
                        'author': AuthService.getValue()._id,
                        'valid': false
                    };
                },

                getClosableObjects: function() {
                    return LocalDocument.query('objetsNonClos/byLogin', { key: AuthService.getValue()._id });
                },

                getClosedObjects: function() {
                    return LocalDocument.query('objetsClos/byLogin', { key: AuthService.getValue()._id });
                }
            };
        };
    });