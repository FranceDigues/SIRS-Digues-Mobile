/**
 * Created by roch dardie on 19/06/15.
 */



angular.module('module_app.controllers.menus.babord.appLayerMgmt', [])

    .controller('cAppLayerMgmt', function cAppLayerMgmt($scope, $state, $log, sContext, sAppLayer, $timeout, sPouch,$rootScope) {
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

        me.loadDataLayer = function(layer){
            if(layer.data.length==0) layer.loadData(sPouch, $rootScope); //fixme force reload?
        }

        me.upLayer =function(item, index){
            $log.debug(index);
                me.sAppLayer.asSimpleStack.splice(index, 1);
                me.sAppLayer.asSimpleStack.splice(index+1, 0, item);
        }

        me.downLayer = function(item, index){
            $log.debug(index);
            me.sAppLayer.asSimpleStack.splice(index, 1);
            me.sAppLayer.asSimpleStack.splice(index-1, 0, item);
        }

    })

    .filter('catFilter', function() {

        // Create the return function
        // set the required parameter name to **number**
        return function(layersArray,refList ) {
            ////todo think to mapfor reflist

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