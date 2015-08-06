/**
 * Created by roch dardie on 06/08/15.
 */



angular.module('module_app.controllers.from.photo', [])

    .controller('cPhoto', function cPhoto($scope, $state,$stateParams, $log, sContext, sLoc) {
        var me = this;
        me.sContext = sContext;
        me.sLoc = sLoc;
        me.layerActif = $stateParams.layer;

    })