/**
 * Created by roch dardie on 19/06/15.
 */


angular.module('module_app.data.services.conf', [])
    .service('sConf', function sConf ($ionicPlatform, sPouch, $log, $rootScope, $timeout) {
        var me = this;
        me.BabordMenu = null;


        me.getBabordMenu = function(){
            sPouch.confDb.get('menuSettings').then(function (res) {
                $log.debug(res);
                me.BabordMenu = res.data;
            }).catch(function (err) {
                //$log.debug(err);
            });
        }




        //init
        //me.getBabordMenu();

    })