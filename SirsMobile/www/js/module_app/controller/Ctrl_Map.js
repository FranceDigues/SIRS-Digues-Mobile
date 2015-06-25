/**
 * Created by roch Dardie on 10/04/15.
 */


//"active": true,

angular.module('module_app.controllers.map', [])
/***************************************************************** --------- *****************************************************/
/*****************************************************************  MAP    *****************************************************/
/***************************************************************** --------- *****************************************************/

//sMap ==> ?
    .controller('cMap', function cMap ($scope, sMapLayer,sAppLayer, $log,  olData, sEventSuperviseur, sContext, $rootScope, $cordovaGeolocation,$timeout,$ionicPopover) {

        // affect
        var me = this;
        me.sMapLayer = sMapLayer;


//todo add to conf db
        angular.extend(me,
            {
                centreCarte: {
                    lat: 43.5,
                    lon: 3.5,
                    zoom: 8
                },
                defaults: {
                    events: {
                        //map: [ 'drawend' ]
                    }
                },

                controls: [
                    {name: 'zoom', active: false},
                    {name: 'rotate', active: false},
                    {name: 'attribution', active: false}
                ],

                mouseposition: {},
                mouseclickposition: {},
                projection: 'EPSG:4326',
                markers: []  //FIXME zoom impossible si marker sur la carte

            });


//map instance
        olData.getMap("map").then(function (map) {
            me.currentMap = map;
        });












        $scope.$on("enableGeoLoc", function () {
         //todo link cme plugin
        });

        $scope.$on("disableGeoLoc", function () {
            //todo link cme plugin
        });


        $rootScope.$on("sAppLayer_LayerList_Update",function(){


        });


        //get One AppLayerfor debug
        sAppLayer.updateList();
    });
