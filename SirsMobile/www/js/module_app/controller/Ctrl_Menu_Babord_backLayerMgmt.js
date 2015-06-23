/**
 * Created by roch dardie on 19/06/15.
 */



angular.module('module_app.controllers.menus.babord.backLayerMgmt', [])

    .controller('cBackLayerMgmt', function cBackLayerMgmt($scope, $state, $log, sContext) {
        var me = this;

        me.sContext = sContext;

        me.goToGeoCache = function(){
            $log.debug("goto geoCache")
            $state.go('geoCache')
        }

    })


