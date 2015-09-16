angular.module('module_app.services.edition', ['module_app.services.dao', 'module_app.services.authentication'])

    .provider('EditionService', function EditionService() {

        // TODO → should be configured

        this.$get = function(sPouch, AuthService, PouchDocument) {
            return {
                newObject: function(type) {
                    return {
                        '@class': 'fr.sirs.core.model.' + type,
                        'author': AuthService.hasUser() ? AuthService.getUser()._id : null,
                        'valid': false
                    };
                },

                getClosableObjects: function() {
                    return PouchDocument.query('objetsNonClos/byLogin', AuthService.getUser()._id);
                }
            };
        };
    });