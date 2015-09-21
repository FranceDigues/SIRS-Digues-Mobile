angular.module('module_app.services.edition', ['module_app.services.context'])

    .provider('EditionService', function EditionService() {

        // TODO → should be configured

        this.$get = function(sPouch, AuthService, PouchDocument) {
            return {
                newObject: function(type) {
                    return {
                        '@class': 'fr.sirs.core.model.' + type,
                        'author': AuthService.getValue()._id,
                        'valid': false
                    };
                },

                getClosableObjects: function() {
                    return PouchDocument.query('objetsNonClos/byLogin', AuthService.getValue()._id);
                },

                getClosedObjects: function() {
                    return PouchDocument.query('objetsClos/byLogin', AuthService.getValue()._id);
                }
            };
        };
    });