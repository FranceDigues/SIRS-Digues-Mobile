/**
 * Created by roch dardie on 03/04/15.
 */


angular.module('controllers.menus', [])

    .controller('TabsCtrl', function ($scope, $ionicSideMenuDelegate, sLayer, $log) {

        $scope.layers = sLayer.list;

        $log.debug(sLayer.json);

        $scope.openMenu = function () {
            $ionicSideMenuDelegate.toggleLeft();

        }

    })



    .controller('HomeCtrl', function ($scope, $state, $log, sContext, sEventSuperviseur) {

        //miam
        $scope.warpJump = function (nextStar) { //param string
            //$state.go('menu.mask',{'next':nextStar});
            sContext.param.action = nextStar;
            $state.go('menu.mask');
        }


        $scope.form = function () {
            $state.go('formGenerator');
        };


        $scope.newCache = function () {

            sEventSuperviseur.event.sideMenu = false;
            $state.go('cache');
        };


        $scope.openDoc = function () {

            //sEventSuperviseur.event.sideMenu = false;
            $state.go('menu.doc');
        };


    })







/***************************************************************** --------- *****************************************************/
/***************************************************************** SIDE MENU *****************************************************/
/***************************************************************** --------- *****************************************************/

    .controller('sideMenu', function ($scope, $state, $ionicSideMenuDelegate, sLayer, $log, sEventSuperviseur, $rootScope) { //kifkif un global controler non?

        //$log.debug("sideMenu");
        ////$log.debug(doc.layers);
        //$scope.layers = sLayer.list;
        //
        //$rootScope.$on("layersListUpdated", function () {
        //    $log.debug("event layers recus");
        //    $scope.layers = sLayer.list;
        //});

        $scope.openMenu = function () {
            $ionicSideMenuDelegate.toggleLeft();
        }

    })

/***************************************************************** --------- *****************************************************/
/***************************************************************** LOADER     *****************************************************/
/***************************************************************** --------- *****************************************************/


    .controller('loader', function ($scope, $state, sPouch, sLayer, $timeout, $log) {

        var n = sLayer.list;
        //var u =  sLayer.usr;
        //var l = sLayer.cfg;
        $log.debug("loader");
        $log.debug(n);
        //$log.debug(u);
        //$log.debug(l);
        $log.debug("/ loader");

        $scope.loadingPercent = 0;


        //Bouchon de vase
        $timeout(function () {
            $scope.loadingPercent = $scope.loadingPercent + 25;

            $timeout(function () {
                $scope.loadingPercent = $scope.loadingPercent + 25;
                $timeout(function () {
                    $scope.loadingPercent = $scope.loadingPercent + 25;
                    $timeout(function () {
                        $scope.loadingPercent = $scope.loadingPercent + 25;
                        $state.go("menu.home");
                    }, 600);
                }, 600);
            }, 600);


        }, 600);


    });