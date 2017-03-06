angular.module('app.controllers.login', ['app.services.context','app.services.dao'])

    .controller('LoginController', function LoginController($location, $ionicPopup, AuthService,$q,PouchService) {

        var self = this;

        self.username = undefined;

        self.password = undefined;

        self.login = function() {

            // PouchService.getLocalDB().query('Utilisateur/byLogin', { include_docs: true }).then(function (result) {
            //     console.log(result);
            // }).catch(function (err) {
            //     console.log(err);
            // });
            //
            // console.log("Username "+self.username);
            // console.log("password "+self.password);

            AuthService.login(self.username, self.password).then(
                function() {
                    // $location.path('/main');
                    $location.path('/first_sync');
                },
                function() {
                    $ionicPopup.alert({
                        title: 'Erreur',
                        template: 'Impossible de s\'authentifier. Veuillez vérifier vos informations de connexion.'
                    });
                });
        };
    });