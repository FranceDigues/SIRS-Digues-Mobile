/**
 * Created by roch dardie on 12/06/15.
 */


/***************************************************************** --------- *****************************************************/
/***************************************************************** LOADER     *****************************************************/
/***************************************************************** --------- *****************************************************/

angular.module('module_app.controllers.loader', [])
    .controller('cLoader', function cLoader ($scope,$timeout, $log, $location, sPouch, sMapLayer, sProf, sContext) {
        var me = this;

        me.sContext =sContext;

        me.max = 0;
        me.actual = 0;
        me.masterPile=[];
        me.step ="waiting..."



        $log.debug("loader");












        me.buildIndex = function(){
            $log.error("build index")
            //recuperation de la liste des design
            sPouch.localDb.allDocs({startkey : '_design/', endkey : '_design0', include_docs : true}).then(function (res) {
                $log.error("requette ok")

                //initialisation du loader
                //me.max=res.total_rows;

                //pour chaque design
                angular.forEach(res.rows, function(item){
                    me.max

                    //stoque le nom du design
                    var design = item.doc._id.substring(8,  item.doc._id.length);

                    //pour chaque vue

                    angular.forEach(item.doc.views, function(v,k){
                        $log.error(design+"/"+k)

                        me.masterPile.push("pdb_"+sPouch.localDb.adapter+"_"+design+"/"+k);

                        me.max++;
                    })

                    //incrementation



                })


                me._recursiveIndex(me.masterPile, conf);


            }).catch(function (err) {
                // some error
            });


        }


        //pour bien separer les durrée de requette
        me._recursiveIndex = function(pile){

            var viewItem = pile.pop();

            //start ProfJs
            if(sContext.logProfiling===true) sProf.startLog(viewItem,Date.now());


            //creation de l'index
            sPouch.localDb.query('TronconDigue/all', {
                include_docs : true
            }).then(function (res) {

                //stop ProfJs
                if(sContext.logProfiling===true) sProf.stopLog(viewItem,Date.now(), res.total_rows, sPouch.firstTime);

                me.actual++;

                //if pile, rerun, else go home
                if(pile.length>0){
                    me._recursiveIndex(pile);
                }else{
                    me.upEnv();
                }
                //if(me.max==me.actual) $state.go("home.map");
            }).catch(function (err) {
                // some error
            });

        }

        me.upEnv = function(){
            me.step="Preparation de votre environement";
            //Bouchon
            me.max = 100;
            me.actual = 0;
            $timeout(function () {
                me.actual=  25;

                $timeout(function () {
                    me.actual=  50;
                    $timeout(function () {
                        me.actual=  75;
                        $timeout(function () {
                            me.actual=  100;
                            $location.path("/home");
                        }, 350);
                    }, 350);
                }, 350);
            }, 350);
        }





        //init
        if(me.sContext.firstTime == true){
            me.step="Mise à jour des indexes...";
            me.buildIndex(); //run up environement
        }else{
            me.upEnv();
        }






    });


