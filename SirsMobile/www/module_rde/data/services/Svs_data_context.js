/**
 * Created by roch Dardie on 03/04/15.
 *
 *
 */
angular.module('module_rde.data.services.context', [])

    .service('sContext',  function sContext (sPouch, $rootScope, $log) {

        var me = this;

        var rscp = $rootScope.$new();


        this.param = {action: null, mskUUID: null}
        this.auth = {user: null}


        me.saveUser = function () {
            $log.debug("reception event UptateUser")
            sPouch.usr.put(this.auth.user)
                .then(function (response) {
                    //propagation pour remise a jour de l'user
                    $rootScope.$broadcast("userChange"); //TODO faire des type d'event specifique pour les notification de contexte

                }).catch(function (err) {
                    $log.debug(err);
                });
        }


        ////mise a jour de l'utilisateur via un event.'
        //rscp.$on("updateUser",  function() {
        //    $log.debug("reception event UptateUser")
        //    sPouch.usr.put(this.auth.user)
        //        .then(function (response) {
        //            //propagation pour remise a jour de l'user
        //            $rootScope.$broadcast("userChange"); //TODO faire des type d'event specifique pour les notification de contexte
        //
        //        }).catch(function (err) {
        //            $log.debug(err);
        //        });
        //
        //});
        //
        // Initialisation du contexte avec les donnée de la base de conf
        rscp.$on("buildBaseContext",  function(event, viewDesc) {

            sPouch.confDb.get('baseContext').then(function (res) {
                $log.debug(res);
                me.babordActiveView = res.tribordActiveView ; //babord
                me.tribordActiveView = res.babordActiveView ;
            }).catch(function (err) {
                //$log.debug(err);
            });


        });

        rscp.$on("viewUpdateRequest",  function(event, viewDesc) {
            $log.debug("EVENT RECEIVE VIEW UPDATE");
            $log.debug(viewDesc);

            if(viewDesc.target == "b")  me.babordActiveView = viewDesc.file ; //babord
            if(viewDesc.target == "t")  me.tribordActiveView = viewDesc.file ; //tribord
            //if(viewDesc.target == "c")  me.centerActiveView = viewDesc.file ; //center


        });




        //TODO gestion reprise a chaud

        //TODO gestion neastedViewContext
        //
        //me.tribordActiveView ="addDesordre" ;
        //me.babordActiveView = "menu" ;
    })
