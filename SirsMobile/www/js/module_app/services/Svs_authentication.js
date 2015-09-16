angular.module('module_app.services.authentication', ['module_app.services.dao'])

    // -------------------------------------------------------------------------
    //  DAOs
    // -------------------------------------------------------------------------

    .factory('AuthStorage', function AuthStorage(LocalStorageItem) {
        return new LocalStorageItem('authUser');
    })

    // -------------------------------------------------------------------------
    //  BOs
    // -------------------------------------------------------------------------

    .service('AuthService', function AuthService($rootScope, $q, md5, PouchDocument, AuthStorage) {

        var self = this;

        self.hasUser = function() {
            return !AuthStorage.isEmpty();
        };

        self.getUser = function() {
            return self.hasUser() ? AuthStorage.get() : undefined;
        };

        self.login = function(login, password) {
            self.logout();

            var deferred = $q.defer();

            $rootScope.$broadcast('loginStart', login);

            PouchDocument.queryOne('Utilisateur/byLogin', login).then(
                function onGetUserSuccess(doc) {
                    if (doc.password === md5.createHash(password).toUpperCase()) {
                        AuthStorage.set(doc);
                        deferred.resolve(doc);
                        $rootScope.$broadcast('loginSuccess', login, doc);
                    } else {
                        deferred.reject();
                        $rootScope.$broadcast('loginError', login);
                    }
                },
                function onGetUserError() {
                    deferred.reject();
                    $rootScope.$broadcast('loginError', login);
                });

            return deferred.promise;
        };

        self.logout = function() {
            if (self.hasUser()) {
                return;
            }

            AuthStorage.clear();
            $rootScope.$broadcast('logoutSuccess');
        };
    });