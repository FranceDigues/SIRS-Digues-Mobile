/**
 * Created by roch dardie on 12/06/15.
 */

angular.module('module_app.data.services.applayer', [])
.service('sAppLayer', function sMapLayer ($ionicPlatform,sPouch, $log, $rootScope,$timeout) {
        var me = this;
        me.list=[];
        me.tree=[];
        me.visible = [];

        me.updateList = function(){
            $log.debug("testLayer");

            me.list = [];
            me.visible = [];

            sPouch.localDb.query('TronconDigue/all', {
                include_docs : true
            }).then(function (res) {
                me.list.push({name:"TronconDigue/all",data:res.rows});

                // Create and add the new vector layer.
                me.visible.push({ name: 'TronconDigue/all', source: { type: 'Vector' } });

                $rootScope.$broadcast("sAppLayer_LayerList_Update");
            }).catch(function (err) {
                // some error
            });



            sPouch.localDb.query('$sirs', {
                include_docs : true
            }).then(function (res) {
                me.tree=res.rows[0].doc.layers;

                $log.debug("tree");
                $log.debug(me.tree);

                //$rootScope.$broadcast("sAppLayer_LayerList_Update");
            }).catch(function (err) {
                // some error
            });

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


                    //stoque le nom du design
                    var design = item.doc._id.substring(8,  item.doc._id.length);

                    //pour chaque vue

                    angular.forEach(item.doc.views, function(v,k){
                        var indexe = design+"/"+k;

                        v.map
                        var Expr =/.*\@class.*\=\'(.*)\'\)\s\{.*/;


                        if(Expr.test(v.map)){
                            $log.debug(RegExp.$1);
                            me.indexeTabObj[RegExp.$1]=indexe;
                        }

                    })

                });





                $log.debug(me.indexeTabObj);

                sPouch.localDb.get('$sirs').then(function (res) {

                    $log.debug("REAFECTATION");
                    $log.debug(res);

                    angular.forEach(res.moduleDescriptions, function(v,k) {
                        $log.debug(v.layers);
                        me.layersTreeIterator(v.layers, function (item) {
                            var tmp = item.filterValue;
                            //we affect into obj a property for found faster the global indexe associated.
                            item["gIndex"] = me.indexeTabObj[tmp];
                            //todo simple stack to filter layer
                            me.asSimpleStack.push(item);

                        })
                    });

                }).catch(function (error) {

                });



            }).catch(function (err) {
                // some error
            });




        }




        me.layersTreeIterator = function(sirsDef, leafCallBack, NodeCallBack){



            var recFunc = function(itemArray, glen){

                angular.forEach(itemArray, function(item) {
                    if (item.hasOwnProperty("children")) {
                        recFunc(item.children);

                    }else{
                        glen-1;
                        if(leafCallBack != null) leafCallBack(item);
                    };
                });
                if(one) $log.debug(sirsDef);
            }


            recFunc(sirsDef, sirsDef.length);
        }

        me.testExistingHashMap = function(){
            //todo
        }


        //init
        me.updateHachMapclassIndex();


})

