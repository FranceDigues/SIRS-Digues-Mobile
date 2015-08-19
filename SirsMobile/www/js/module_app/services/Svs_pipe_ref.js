/**
 * Created by roch dardie on 19/06/15.
 */


angular.module('module_app.services.pipe.ref', [])
    .service('sRef', function sRef ($ionicPlatform, sPouch, $log, $rootScope, $timeout) {
        var me = this;
        me.refList={};


        //do not read under this line

        sPouch.localDb.query('REFLIST/_all').then(function (res) {
            // got the query results


            angular.forEach(res.rows,function(k,v){
                 if(me.refList[k.key] == null) {
                     me.refList[k.key] = [];
                 }else {
                     me.refList[k.key].push(
                         {libelle:k.value.libelle,abrege:k.value.abrege,id: k.id}
                     );
                 }
            })

$log. debug(me.refList)

        }).catch(function (err) {
            // some error
        });


    })

