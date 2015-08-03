/**
 * Created by roch dardie on 28/05/15.
 */

angular.module('module_app.controllers.menus.signIn', [])
    .controller('cSignIn', function cSignIn($ionicDeploy,$ionicPopup, $scope, $state, sPouch, $log, sContext, md5, sProf,$timeout) {



        var me = this;
        me.user = {login: "admin", password: "admin"};
        me.updateProgress = 0;


        me.signIn = function (user) {
            console.log('Sign-In', user);

            //TODO DEMO Comment
            //$state.go('loading');

            //TODO DEMO unComment
            //sPouch.usr.query('name_index', {key: 'mok-sensei'}).then(function(result) {
            //sPouch.localDb.query('Utilisateur/byLogin', {key: user.login, include_docs:true}).then(function (result) {


            //start ProfJs
            if (sContext.logProfiling === true)  sProf.startLog("pdb_" + sPouch.localDb.adapter + "_Utilisateur/byLogin/" + user.login, Date.now());

            sPouch.localDb.query('Utilisateur/byLogin/' + user.login, {include_docs: true}).then(function (result) {
                // do something with result.

                // stop ProfJs
                if (sContext.logProfiling === true) sProf.stopLog("pdb_" + sPouch.localDb.adapter + "_Utilisateur/byLogin/" + user.login, Date.now(), result.total_rows, sPouch.firstTime);


                $log.debug(result);

                $log.debug(result.rows[0].doc);
                $log.debug(result.rows[0].doc.password);
                $log.debug(user.password);
                $log.debug((md5.createHash(user.password)).toUpperCase()); //TODO not int only

                //FIXME verif apref mise a jour de l'encodage des mot de passe par samuel.
                if (result.rows[0].doc.password == (md5.createHash(user.password)).toUpperCase()) {
                    //if (0==0) {
                    sContext.auth.user = result.rows[0].doc;
                    $state.go('loading', {}, {reload: true}); //force ctrl reload
                }

            });


        };


        //$timeout(
        //    function (){
        //    sPouch.confDb.put({
        //        _id: "test-03",
        //        data: [1, 1, 1, 1]
        //    }).then(function () {
        //        $log.debug("add");
        //        sPouch.confDb.get('test-03').then(function (res) {
        //            $log.debug("update")
        //            $timeout(function () {
        //                res.data.push([2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]);
        //                sPouch.confDb.put(res);
        //            }, 2000);
        //        })
        //    })
        //    }, 2000);


        // Update app code with new release from Ionic Deploy
        me.doUpdate = function() {
            $ionicDeploy.update().then(function(res) {
                //console.log('Ionic Deploy: Update Success! ', res);
                me.alert('Etat de mise à jour', 'mise à jour complete')
            }, function(err) {
                //console.log('Ionic Deploy: Update error! ', err);
                me.alert('Etat de mise à jour', 'mise à jour echoué')
            }, function(prog) {
                //console.log('Ionic Deploy: Progress... ', prog);
                me.updateProgress= prog;
                //$log.debug(me.updateProgress)
            });
            //$ionicDeploy.download().then(function() {
            //    // called when the download has completed successfully
            //    me.updateProgress = 0;
            //
            //    $ionicDeploy.extract().then(function() {
            //        // called when the extraction completes succesfully
            //
            //        $window.location.reload(true);//reload all
            //
            //    }, function(error) {
            //        // called when an error occurs
            //    }, function(deployExtractionProgress) {
            //        // this is a progress callback, so it will be called a lot
            //        // deployExtractionProgress will be an Integer representing the current
            //        // completion percentage.
            //        me.updateProgress= deployExtractionProgress;
            //    });
            //
            //
            //}, function(deployDownloadError) {
            //    // called when an error occurs
            //}, function(deployDownloadProgress) {
            //    // this is a progress callback, so it will be called a lot
            //    // deployDownloadProgress will be an Integer representing the current
            //    // completion percentage.
            //    me.updateProgress= deployDownloadProgress;
            //});



        };

        // Check Ionic Deploy for new code
        me.checkForUpdates = function() {
            console.log('Ionic Deploy: Checking for updates');
            $ionicDeploy.check().then(function(hasUpdate) {
                console.log('Ionic Deploy: Update available: ' + hasUpdate);
                me.hasUpdate = hasUpdate;

                var updateState = hasUpdate ===true ? 'Mise à jour Disponible' : 'Système à jour'
                me.alert('Gestionaire de mise à jour',updateState);

            }, function(err) {
                console.error('Ionic Deploy: Unable to check for updates', err);
            });
        }


        me.alert = function(title, status){
            var alert =  function() {
                var alertPopup = $ionicPopup.alert({
                    title: title,
                    template: status
                });
                alertPopup.then(function(res) {
                });
            };

            alert();

        }

        $log.debug("INFO IONIC DEPLOY")

        //SET Chanel deploy
        $ionicDeploy.setChannel("dev");
        $log.debug($ionicDeploy.info())
        $log.debug($ionicDeploy)

})
