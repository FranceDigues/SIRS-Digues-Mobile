/**
 * Created by roch dardie on 19/06/15.
 */



angular.module('module_app.controllers.menus.babord.appLayerMgmt', [])

    .controller('cAppLayerMgmt', function cAppLayerMgmt($scope, $state, $log, sContext, sAppLayer) {
        var me = this;

        me.sContext = sContext;
        me.sAppLayer = sAppLayer;
        me.activeBranch = me.sAppLayer.tree;
        me.modAct="";
        me.branchAct=null;
        me.displayStack=false;
        me.search=false

        me.modList=false;
        me.catList=false;

        me.displayModule=function(key){
            me.modAct=""+key;
            me.branchAct=sAppLayer.tree[me.modAct].layers;
        }

        me.deepBranch=function(node){

        }

        me.toggleMod= function(m){
           me.modAct= me.modAct != m ? m : "";
        }

        me.toggleFilter= function(){
           me.search= me.search == false ? true : false;
        }

//todo WORKING with list visible??
        me.catFilter =
            //function() {
            //
            //return
                function(layer) {
            $log.debug("filter");
            $log.debug(layer);


                angular.forEach(me.sAppLayer.categorie, function (ref) {

                    $log.debug("loop");
                    $log.debug(ref);

                    if (ref.checked === true) {
                        if (layer.categorie == ref.title) {
                            $log.debug("inLoop")
                            $log.debug(layer)
                            $log.debug(ref)
                            return layer
                        }
                    }
                })
            }
        //}




    })
    .filter('catFilter', function() {

        // Create the return function
        // set the required parameter name to **number**
        return function(item, refList) {

console.log("filter");
            console.log(refList);
            console.log(item)

            angular.forEach(refList, function (ref) {

                if(ref.checked===true){
                    if (item.categorie === ref.title) {
                        return item
                    }
                }
            })
        }


    });