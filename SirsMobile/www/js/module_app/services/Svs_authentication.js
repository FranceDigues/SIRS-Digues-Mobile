angular.module('module_app.services.authentication', [])

    // -------------------------------------------------------------------------
    //  DAOs
    // -------------------------------------------------------------------------

    .service('PouchHelper', function PouchHelper($q, sPouch) {

        var self = this;

        self.queryOne = function(fun, options, callback) {
            var deferred = $q.defer();

            sPouch.localDb.query(fun, options, callback).then(
                function onSuccess(result) {
                    if (result.rows.length === 1) {
                        deferred.resolve(result.rows[0].doc);
                    } else {
                        deferred.reject();
                    }
                },
                function onError() {
                    deferred.reject();
                });

            return deferred.promise;
        };
    })

    .service('PouchUser', function PouchUser($q, sPouch, PouchHelper) {

        var self = this;

        self.get = function(id) {
            return sPouch.localDb.get(id);
        };

        self.getByLogin = function(login) {
            return PouchHelper.queryOne('Utilisateur/byLogin', { key: login, include_docs: true });
        };

        self.put = function(document) {
            return sPouch.localDb.put(document);
        };
    })

    .service('AuthStorage', function AuthStorage() {

        var self = this;

        self.get = function() {
            return angular.fromJson(window.localStorage.getItem('authUser'));
        };

        self.set = function(value) {
            window.localStorage.setItem('authUser', angular.toJson(value));
        };

        self.clear = function() {
            window.localStorage.removeItem('authUser');
        };

        self.isEmpty = function() {
            return angular.isUndefined(window.localStorage.getItem('authUser'));
        };
    })

    // -------------------------------------------------------------------------
    //  BOs
    // -------------------------------------------------------------------------

    .service('AuthService', function AuthService($rootScope, $q, md5, PouchUser, AuthStorage) {

        var self = this;

        self.isAuthenticated = function() {
            return !AuthStorage.isEmpty();
        };

        self.getAuthenticatedUser = function() {
            return self.isAuthenticated() ? AuthStorage.get() : undefined;
        };

        self.login = function(login, password) {
            self.logout();

            var deferred = $q.defer();

            $rootScope.$broadcast('loginStart', login);

            PouchUser.getByLogin(login).then(
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
            if (self.isAuthenticated()) {
                return;
            }

            AuthStorage.clear();
            $rootScope.$broadcast('logoutSuccess');
        };
    });