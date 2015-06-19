/**
 * Created by roch dardie on 19/06/15.
 */


angular.module('module_app.controllers.menus.babord.menu', [])

    .controller('cBabordMenu', function cBabordMenu($scope,$rootScope, $state, $log, sContext, sConf) {
        var me = this;
        me.sConf = sConf;


        me.UpdateView = function(t,f) {
            $rootScope.$broadcast("viewUpdateRequest", {"target": t, "file": f});
        }

    });
