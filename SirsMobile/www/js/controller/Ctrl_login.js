angular.module('app.controllers.login', ['app.services.context'])

    .controller('LoginController', function LoginController($location, AuthService) {

        var self = this;


        self.username = 'admin';

        self.password = 'admin';


        self.login = function() {
            AuthService.login(self.username, self.password).then(
                function() {
                    $location.path('/main');
                },
                function() {
                    // TODO → handle errors
                });
        };
    });