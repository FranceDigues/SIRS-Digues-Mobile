/**
 * Created by roch dardie on 19/06/15.
 */



angular.module('module_app.controllers.menus.babord.appLayerMgmt', [])

    .controller('cAppLayerMgmt', function cAppLayerMgmt($scope, $state, $log, sContext, sAppLayer, $timeout) {
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


        me.noFilter=false;
        me.shouldShowDelete=false;
        me.shouldShowReorder=false;
        me.listCanSwipe=true;

        me.reorderItem = function(item, fromIndex, toIndex) {
            //Move the item in the array
            $log.debug(fromIndex);
            $log.debug(toIndex);

            me.sAppLayer.asSimpleStack.splice(fromIndex, 1);
            me.sAppLayer.asSimpleStack.splice(toIndex, 0, item);

        };


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
//        me.catFilter =
//            //function() {
//            //
//            //return
//                function(layer) {
//                    var a =0;
//                    if(layer) {
//                        $log.debug("filter");
//                        $log.debug(layer);
//
//
//                        angular.forEach(me.sAppLayer.categorie, function (ref) {
//
//                            if (ref.checked === true) {
//                                if (layer.categorie == ref.title) {
//                                    a++;
//                                    $log.debug("inLoop")
//                                    $log.debug(layer)
//                                    $log.debug(a)
//                                    return layer
//                                }
//                            }
//                        })
//                    }
//            }
        //}



        ////INIT :
        ////UNIQUE METHOD
        //$timeout(function(){
        //    $log.debug("sparadra");
        //    $log.debug(me.sAppLayer.asSimpleStack);
        //    me.sAppLayer.asSimpleStack = _.uniq(me.sAppLayer.asSimpleStack, "title");  // fixme stop add layer  for all of his views... (3 times avg..)
        //    $log.debug(me.sAppLayer.asSimpleStack);
        //},1000);




    })
    .filter('catFilter', function() {

        // Create the return function
        // set the required parameter name to **number**
        return function(layersArray,refList ) {

            //var Filtered = [];
            ////todo think to mapfor reflist
            //angular.forEach(layersArray,function(layer){
            //        angular.forEach(refList, function (ref) {
            //            if (ref.checked === true) {
            //                if (layer.categorie == ref.title) {
            //                    Filtered.push(layer);
            //                }
            //            }
            //        })
            //});
            //return Filtered

            return layersArray.filter(function(layer){
                var _bool = false;
                for(var i=0;i < refList.length;i++){
                    if (refList[i].checked === true) {
                        if (layer.categorie == refList[i].title) {
                            _bool =  true;
                            break;
                        }
                    }
                };
                return _bool;
            });

        }


    });