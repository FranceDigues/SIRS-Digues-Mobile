/**
 * Created by roch dardie on 12/06/15.
 */

angular.module('module_app.data.services.applayer', [])
.service('sAppLayer', function sMapLayer ($ionicPlatform,sPouch, $log, $rootScope,$timeout) {
        var me = this;
       me.list=[];

        me.updateList = function(){
            $log.debug("testLayer");
            sPouch.localDb.query('TronconDigue/all', {
                include_docs : true
            }).then(function (res) {
                $log.debug("testLayer return");
               $log.debug(res);
                me.list.push({name:"TronconDigue/all",data:res});
                $rootScope.$broadcast("sAppLayer_LayerList_Update");
            }).catch(function (err) {
                // some error
            });

        }


        //me.getLayerObject= function(layerName){
        //    angular.forEach(me.list, function(item){
        //        if(item.name=="TronconDigue/all")return item.value;
        //    });
        //}



})