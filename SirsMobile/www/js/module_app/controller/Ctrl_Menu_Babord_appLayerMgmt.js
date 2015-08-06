/**
 * Created by roch dardie on 19/06/15.
 */



angular.module('module_app.controllers.menus.babord.appLayerMgmt', [])

    .controller('cAppLayerMgmt', function cAppLayerMgmt($scope, $state, $log, sContext, sAppLayer, $timeout, sPouch,$rootScope) {
        var me = this;

        me.sContext = sContext;
        me.sAppLayer = sAppLayer;
        me.activeBranch = me.sAppLayer.tree;
        me.key="";
        me.filterConf = {module:true,categorie:true,nameRegex:true}
        //if (me.sAppLayer.modules[0] != null) me.sAppLayer.modules[0].checked = true;
        me.branchAct=null;
        me.displayStack=false;
        me.search=false

        me.modList=false;
        me.catList=false;


        me.noFilter=false;
        me.shouldShowDelete=false;
        me.shouldShowReorder=false;
        me.listCanSwipe=true;

        //kill twice click
        me.boomBitch=false;
        me.initBoomBitch = function(){
            me.boomBitch=true;
            $timeout(function(){
                me.boomBitch=false;
            }, 800)
        }

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

        me.toggleSearch= function(){
           me.search= !me.search;
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


        me.toggleFilter = function(){
            me.filterConf.module = !me.noFilter;
            me.filterConf.categorie = !me.noFilter;
            me.filterConf.nameRegex = !me.noFilter;
        }

        me.updateFilterConf = function(key){
            //{module:true,modAct:c.sAppLayer.modules,categorie:true,categorieList:c.sAppLayer.categories,nameRegex:true,searchOnName:c.key}
            //filterConf.key=me.key
            $log.debug(me.filterConf)

            return me.filterConf;
        }

        //check there are only one menu open
        me.justeOneOpen= function(cat){
            if(cat.visible === false){
                me.sAppLayer.categories.forEach(function(item){
                     item.visible = (item.title === cat.title);
                })
            }else{
                cat.visible = false;
            }

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


    })
    .filter('ModuleFilter', function() {

        // Create the return function
        // set the required parameter name to **number**
        return function(layersArray,refList ) {
            ////todo think to mapfor reflist

            return layersArray.filter(function(cat){
                //console.log(cat)
                var _bool = false;
                for(var i=0;i < refList.length;i++){
                    if (refList[i].checked === true) {
                        if (cat.mother == refList[i].title) {
                            _bool =  true;
                            break;
                        }
                    }
                };
                return _bool;
            });

        }


    })  .filter('modularFilter', function() {

        // Create the return function
        // set the required parameter name to **number**
        return function(layersArray,filterControl, FilterOption ) {
            ////todo think to mapfor reflist

            var tmp={arrayFiltered : []};
            console.log("start")
            console.log(tmp.arrayFiltered)
            console.log(layersArray)

            if(filterControl.module===true){ //filtre sur les module
                tmp.arrayFiltered = layersArray.filter(function(layer){
                    //return layer.module == FilterOption.modAct ? true: false;
                    var _bool = false;
                    for(var i=0;i < FilterOption.modules.length;i++){
                        if (FilterOption.modules[i].checked === true) {
                            if (layer.module == FilterOption.modules[i].title) {
                                _bool =  true;
                                break;
                            }
                        }
                    };
                    return _bool;

                });

                console.log("module")
                console.log(tmp.arrayFiltered)
                console.log(layersArray)
            }
            if(filterControl.categorie===true){ //filtre sur les categorie
                if(tmp.arrayFiltered.length <1)  tmp.arrayFiltered = layersArray; //si on à pas de filtre sur le module

                tmp.arrayFiltered =  tmp.arrayFiltered.filter(function(layer){
                    var _bool = false;
                    angular.forEach(
                        FilterOption.categorieList.filter(function(c){return c.checked;}),
                        function(cat) {
                        if (layer.categorie == cat.title) {
                            _bool =  true;
                        }
                    })
                    //for(var i=0;i < FilterOption.categorieList.length;i++){
                    //    if (FilterOption.categorieList[i].checked === true) {
                    //        if (layer.categorie == FilterOption.categorieList[i].title) {
                    //            _bool =  true;
                    //            break;
                    //        }
                    //    }
                    //};
                    return _bool;
                });

                console.log("categorie")
                console.log(tmp.arrayFiltered)
                console.log(layersArray)
            }
            if(filterControl.nameRegex===true){ //filtre sur les categorie
                if(tmp.arrayFiltered.length <1)  tmp.arrayFiltered = layersArray; //si on à pas de filtre sur le module

                var patt = new RegExp("."+FilterOption.searchOnName+".","i");

                tmp.arrayFiltered =  tmp.arrayFiltered.filter(function(layer){
                   return patt.test(layer.name);
                });


                console.log("regex")
                console.log(tmp.arrayFiltered)
                console.log(layersArray)
            }
            if (tmp.arrayFiltered.length <1){
                tmp.arrayFiltered = layersArray;

                console.log("default")
                console.log(tmp.arrayFiltered)
                console.log(layersArray)
            }


            return tmp.arrayFiltered;

        }


    });