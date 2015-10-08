angular.module('module_app.controllers.login', ['module_app.services.context'])

    .controller('LoginController', function LoginController($location, AuthService) {

        var self = this;


        self.username = 'admin';

        self.password = 'admin';


        self.login = function() {
            AuthService.login(self.username, self.password).then(
                function() {
                    $location.path('/home');
                },
                function() {
                    // TODO → handle errors
                });
        };
    });