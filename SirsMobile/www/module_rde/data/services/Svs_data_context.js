/**
 * Created by roch Dardie on 03/04/15.
 *
 *
 */
angular.module('module_rde.data.services.context', [])

    .service('sContext',  function sContext (sPouch, $rootScope, $log) {

        var me = this;

        var rscp = $rootScope.$new();

    //variable d'environement
        //path :
            me.photoDir=null;
            me.notesDir=null;

        //conf
            me.logProfiling=false;

        //version
            me.version = "v0.2.1 -u10 "


    //variable d'etat
        //vue
            me.tribordView = {active: "desordreMgmt"  , last:[]};
            me.babordView = {active: "menu" , last:[]};
        //variable d'ajout de desordre
            me.activeDesordreId=null;

        //variable globale utilitaire
        me.linearIndex=0;

        me.editionMode = false;


        this.param = {action: null, mskUUID: null}
        this.auth = {user: null}

        //serialisation pour reprise à chaud.
        //todo
        //save static conf
        //todo
        //utilities function:
        me.getLinearIndex = function(){
            me.linearIndex = me.linearIndex + 1;
            return me.linearIndex;
        }


        me.saveUser = function () {
            $log.debug("reception event UptateUser")
            sPouch.localDb.put(me.auth.user)
                .then(function (response) {
                    //update user doc revision
                    me.auth.user._rev=response.rev;
                    $rootScope.$broadcast("userChange"); //TODO faire des type d'event specifique pour les notification de contexte
                }).catch(function (err) {
                    $log.debug(err);
                });
        }

        me.switchEditionMode = function() {
            me.editionMode = !me.editionMode;
            $rootScope.$broadcast("editionModeChanged", me.editionMode);
        };


        // Initialisation du contexte avec les donnée de la base de conf
        rscp.$on("buildBaseContext",  function(event, viewDesc) {

            sPouch.confDb.get('baseContext').then(function (res) {
                $log.debug(res);
                me.babordView.active = res.tribordActiveView ; //babord
                me.tribordView.active = res.babordActiveView ;
                me.logProfiling=res.logProfiling;//if yes we send data on influxdb
            }).catch(function (err) {
                //$log.debug(err);
            });


        });

        rscp.$on("viewUpdateRequest",  function(event, viewDesc) {
            $log.debug("EVENT RECEIVE VIEW UPDATE");
            $log.debug(viewDesc);





            if(viewDesc.target == "b"){

                //res si menu de base
                if(viewDesc.file=="menu"){ //TODO metre tout les string hardcodé dans un fichier recap.
                    me.babordView.last = [];
                }else{
                    me.babordView.last.push(  me.babordView.active);
                }



                me.babordView.active = viewDesc.file ; //babord
            }
            if(viewDesc.target == "t")  me.tribordView.active = viewDesc.file ; //tribord
            //if(viewDesc.target == "c")  me.centerActiveView = viewDesc.file ; //center


        });


        me.backBabordMenus= function(){

            me.babordView.active = me.babordView.last.pop();
        }

        //TODO gestion reprise a chaud

        //TODO gestion neastedViewContext
        //



        //desordre
        me.editedDesordre=[];
        me.unCloseDesordre=[];


    })
