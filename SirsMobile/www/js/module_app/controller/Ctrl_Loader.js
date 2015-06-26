/**
 * Created by roch dardie on 12/06/15.
 */


/***************************************************************** --------- *****************************************************/
/***************************************************************** LOADER     *****************************************************/
/***************************************************************** --------- *****************************************************/

angular.module('module_app.controllers.loader', [])
.controller('cLoader', function cLoader ($scope,$timeout, $log, $state, sPouch, sMapLayer, sProf) {
    var me = this;

    me.max = 0;
    me.actual = 0;
        me.masterPile=[];



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

                        ////start ProfJs
                        //sProf.startLog("pdb_"+sPouch.localDb.adapter+"_"+design+"/"+k,Date.now());


                        ////creation de l'index
                        //sPouch.localDb.query('TronconDigue/all', {
                        //    include_docs : true
                        //}).then(function (res) {
                        //
                        //    //stop ProfJs
                        //    sProf.stopLog("pdb_"+sPouch.localDb.adapter+"_"+design+"/"+k,Date.now(), res.total_rows, sPouch.firstTime);
                        //
                        //    me.actual++;
                        //    //if all index created go home :
                        //    if(me.max==me.actual) $state.go("home.map");
                        //}).catch(function (err) {
                        //    // some error
                        //});


                        me.max++;
                    })

                    //incrementation



                })


                me._recursiveIndex(me.masterPile);


            }).catch(function (err) {
                // some error
            });


        }


        //pour bien separer les durrée de requette
me._recursiveIndex = function(pile){

    var viewItem = pile.pop();

    //start ProfJs
    sProf.startLog(viewItem,Date.now());

    //creation de l'index
    sPouch.localDb.query('TronconDigue/all', {
        include_docs : true
    }).then(function (res) {

        //stop ProfJs
        sProf.stopLog(viewItem,Date.now(), res.total_rows, sPouch.firstTime);

        me.actual++;


        //if pile, rerun, else go home
        if(pile.length>0){
            me._recursiveIndex(pile);
        }else{
            $state.go("home.map");
        }
        //if(me.max==me.actual) $state.go("home.map");
    }).catch(function (err) {
        // some error
    });

}







        //
    //    //Bouchon de vase
    //$timeout(function () {
    //    me.loadingPercent = me.loadingPercent + 25;
    //
    //    $timeout(function () {
    //        me.loadingPercent = me.loadingPercent + 25;
    //        $timeout(function () {
    //            me.loadingPercent = me.loadingPercent + 25;
    //            $timeout(function () {
    //                me.loadingPercent = me.loadingPercent + 25;
    //                $state.go("home.map");
    //            }, 600);
    //        }, 600);
    //    }, 600);
    //}, 600);


        //init
        me.buildIndex();
});