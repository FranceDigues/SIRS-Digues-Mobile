/**
 * Created by roch dardie on 28/05/15.
 */

angular.module('module_app.controllers.menus.signIn', [])
.controller('cSignIn', function cSignIn ($scope, $state, sPouch,  $log, sContext, md5) {

    var me = this;
        me.user={login:"admin",password:"admin"};



    me.signIn = function (user) {
        console.log('Sign-In', user);

        //TODO DEMO Comment
        //$state.go('loading');

        //TODO DEMO unComment
        //sPouch.usr.query('name_index', {key: 'mok-sensei'}).then(function(result) {
        //sPouch.localDb.query('Utilisateur/byLogin', {key: user.login, include_docs:true}).then(function (result) {
        sPouch.localDb.query('Utilisateur/byLogin/'+user.login, {include_docs:true}).then(function (result) {
            // do something with result
            $log.debug(result);

            $log.debug(result.rows[0].doc);
            $log.debug(result.rows[0].doc.password);
            $log.debug(user.password);
            $log.debug((md5.createHash(user.password)).toUpperCase()); //TODO not int only

            //FIXME verif apref mise a jour de l'encodage des mot de passe par samuel.
            if (result.rows[0].doc.password == (md5.createHash(user.password)).toUpperCase() ) {
            //if (0==0) {
                sContext.auth.user = result.rows[0].doc;
                $state.go('loading', {}, {reload: true}); //force ctrl reload
            }

        });




    };



})
