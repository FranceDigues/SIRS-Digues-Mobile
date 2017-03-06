angular.module('app.controllers.login', ['app.services.context','app.services.dao'])

    .controller('LoginController', function LoginController($location, $ionicPopup, AuthService,$q,PouchService) {

        var self = this;

        self.username = undefined;

        self.password = undefined;

        self.login = function() {

            var db =


                new pouchdb("meetups");
            db.allDocs({
                include_docs: true,
                attachments: true
            }).then(function (result) {
                console.log(result);
                res.json({"users": result.rows});
            }).catch(function (err) {
                console.log(err);
            });

            // AuthService.login(self.username, self.password).then(
            //     function() {
            //         // $location.path('/main');
            //         $location.path('/first_sync');
            //     },
            //     function() {
            //         $ionicPopup.alert({
            //             title: 'Erreur',
            //             template: 'Impossible de s\'authentifier. Veuillez vérifier vos informations de connexion.'
            //         });
            //     });
        };
    });