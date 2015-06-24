/**
 * Created by roch dardie on 12/06/15.
 */


/***************************************************************** --------- *****************************************************/
/***************************************************************** LOADER     *****************************************************/
/***************************************************************** --------- *****************************************************/

angular.module('module_app.controllers.loader', [])
.controller('cLoader', function cLoader ($scope,$timeout, $log, $state, sPouch, sMapLayer) {
    var me = this;

    //var n = sMapLayer.list;
    //var u =  sMapLayer.usr;
    //var l = sMapLayer.cfg;

    $log.debug("loader");


    me.loadingPercent = 0;


    //Bouchon de vase
    $timeout(function () {
        me.loadingPercent = me.loadingPercent + 25;

        $timeout(function () {
            me.loadingPercent = me.loadingPercent + 25;
            $timeout(function () {
                me.loadingPercent = me.loadingPercent + 25;
                $timeout(function () {
                    me.loadingPercent = me.loadingPercent + 25;
                    $state.go("home.map");
                }, 600);
            }, 600);
        }, 600);
    }, 600);


});