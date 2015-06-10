/**
 * Created by roch dardie on 28/05/15.
 */

angular.module('ctrl.menu.signIn', [])
.controller('cSignIn', function cSignIn ($scope, $state, sPouch, sMask, $log, sContext) {


    $scope.signIn = function (user) {
        console.log('Sign-In', user);

        //TODO DEMO Comment
        //$state.go('loading');

        //TODO DEMO unComment
        //sPouch.usr.query('name_index', {key: 'mok-sensei'}).then(function(result) {
        sPouch.usr.query('name_index', {key: user.username}).then(function (result) {
            // do something with result
            $log.debug(result);

            $log.debug(result.rows[0].value);
            $log.debug(parseInt(user.password)); //TODO not int only

            if (result.rows[0].value.psw == parseInt(user.password)) {
                sContext.auth.user = result.rows[0].value;
                $state.go('loading');
            }

        });

    };


    $scope.logout = function () {
        $state.go('signin');
    };

    $scope.home = function () {
        $state.go('menu.home');
    };

})
