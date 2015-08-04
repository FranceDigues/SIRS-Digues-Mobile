/**
 * Created by roch dardie on 12/06/15.
 */

angular.module('module_app.data.services.applayer', [])
.service('sAppLayer', function sMapLayer ($ionicPlatform,sPouch, $log, $rootScope,$timeout) {
        var me = this;
        me.list=[]; //todo kill
        me.modules=[];
        me.categories=[];
        me.visible = []; //todo kill




        me.updateList = function(){
            //$log.debug("testLayer");
            //
            //me.list = []; //todo kill
            //me.visible = [];  //todo kill
            //
            //sPouch.localDb.query('TronconDigue/all', { //todo kill
            //    include_docs : true
            //}).then(function (res) {
            //    me.list.push({name:"TronconDigue/all",data:res.rows});
            //
            //    // Create and add the new vector layer.
            //    me.visible.push({ name: 'TronconDigue/all', source: { type: 'Vector' } });
            //
            //    $rootScope.$broadcast("sAppLayer_LayerList_Update");
            //}).catch(function (err) {
            //    // some error
            //});
            //
            //
            //
            ////sPouch.localDb.query('$sirs', {
            ////    include_docs : true
            ////}).then(function (res) {
            ////    me.tree=res.moduleDescriptions;
            ////    angular.forEach(res.moduleDescriptions, function(v,k) {
            ////        me.layersTreeIterator(v.layers, function (item) {
            ////            //todo simple stack to filter layer
            ////            me.asSimpleStack.push(item);
            ////        });
            ////    });
            ////
            ////    $log.debug("tree");
            ////    $log.debug(me.tree);
            ////
            ////
            ////
            ////    $rootScope.$broadcast("sAppLayer_LayerList_Update");
            ////}).catch(function (err) {
            ////    // some error
            ////});

        }


        //me.getLayerObject= function(layerName){
        //    angular.forEach(me.list, function(item){
        //        if(item.name=="TronconDigue/all")return item.value;
        //    });
        //}

        me.indexeTabObj={};
        me.asSimpleStack=[];

        me.updateHachMapclassIndex=function(){
            $log.debug("build reverseIndexe");



            //todo query only /all
            sPouch.localDb.allDocs({startkey : '_design/', endkey : '_design0', include_docs : true}).then(function (res) {
                $log.error("requette ok")

                //pour chaque design
                angular.forEach(res.rows, function(item){


                    //stock le nom du design
                    var design = item.doc._id.substring(8,  item.doc._id.length);

                    //pour chaque vue

                    angular.forEach(item.doc.views, function(v,k){
                        var indexe = design+"/"+k;

                        v.map
                        var Expr =/.*\@class.*\=\'(.*)\'\)\s\{.*/; //found class name


                        if(Expr.test(v.map)){
                            //$log.debug(RegExp.$1);
                            me.indexeTabObj[RegExp.$1]=indexe;
                        }

                    })

                });





                $log.debug(me.indexeTabObj);

                sPouch.localDb.get('$sirs').then(function (res) { //fixme doublon, kill this query

                    //$log.debug(res);

                    angular.forEach(res.moduleDescriptions, function(v,k) {
                        //$log.debug(v.layers);
                        me.modules.push({title:v.title,checked:true});
                        me.layersTreeIterator(v.layers,
                            //leafFunction
                            function (item, cat) {
                                cat=cat!=null?cat:"";
                            var tmp = item.filterValue;
                            //we affect into obj a property for found faster the global indexe associated.
                            item["gIndex"] = me.indexeTabObj[tmp];
                            //todo simple stack to filter layer
                            me.asSimpleStack.push((new oAppLayer({title:item.title,module:v.title,categorie:cat,filterValue:item.filterValue,gIndex:item.gIndex,visible:false,editable:false, selectable:false,order:me.asSimpleStack.length+1,data:null})));
                        },
                            //node function
                            function(item){
                                me.categories.push({title:item.title,mother: v.title,checked:false});
                            }
                        );

                        //fixme promesse promesse, mieux vaut un "tiens",  que deux "tu l'auras"...
                        $log.error("fixme promesse promesse, mieux vaut un \"tiens\",  que deux \"tu l\'auras\"...")
                        $timeout(function () {
                            //$log.debug(res);
                            res.revOnBuildIndex = res._rev;
                            sPouch.localDb.put(res);
                        }, 800 * res.moduleDescriptions.length)
                    })

                }).catch(function (error) {

                });



            }).catch(function (err) {
                // some error
            });




        }


me.layersTreeIterator = function(sirsDef, leafCallBack, NodeCallBack){



    var recFunc = function(itemArray, cat){

        angular.forEach(itemArray, function(item) {
            if (item.hasOwnProperty("children")) {
                var t = null;
                if(item.hasOwnProperty("children")) var t=item.title;
                recFunc(item.children,t);
                if(NodeCallBack != null) NodeCallBack(item);
            }else{
                if(leafCallBack != null) leafCallBack(item, cat);
            };
        });
    }


    recFunc(sirsDef); //autoup
}

        //me.layersTreeIterator = function(sirsDef){
        //
        //    var recFunc = function(itemArray){
        //
        //        angular.forEach(itemArray, function(item) {
        //            if (item.hasOwnProperty("children")) {
        //                recFunc(item.children);
        //            }else{
        //                    var tmp = item.filterValue;
        //                    //we affect into obj a property for found faster the global indexe associated.
        //                    item["gIndex"] = me.indexeTabObj[tmp];
        //                    //todo simple stack to filter layer
        //                    me.asSimpleStack.push(item);
        //                };
        //        });
        //    }
        //
        //    recFunc(sirsDef); //autorun
        //}

        me.testExistingHashMap = function(){
            //todo
            sPouch.localDb.get('$sirs').then(function (res) {

                if(!res.hasOwnProperty("revOnBuildIndex") || res.revOnBuildIndex!=res._rev ){
                    me.updateHachMapclassIndex();
                }


            }).catch(function(res){

            })
        }


        //init
        me.testExistingHashMap();
        //me.updateList();
        //me.updateHachMapclassIndex();



})

