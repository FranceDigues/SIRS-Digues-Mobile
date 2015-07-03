/**
 * Created by roch dardie on 02/07/15.
 */

angular.module('module_app.controllers.from.newDesordre', [])

    .controller('cNewDesordre', function cNewDesordre($scope, $state,$stateParams, $log, sContext, sLoc) {
        var me = this;
        me.sContext = sContext;
        me.sLoc = sLoc;
        me.layerActif = $stateParams.layer;

    })
