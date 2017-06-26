angular.module('app.controllers.app_troncons', ['app.services.context','app.services.context'])
    .controller('TronconsChoiceMenu',TronconsChoiceMenu)
    .controller('SystemEndigumentController', SystemEndigumentController)
    .controller('DigueController',DigueController)
    .controller('TronconController',TronconController)
    .factory('AppTronconsService',AppTronconsService);

    function TronconsChoiceMenu(SidePanelService, $scope, AppTronconsService, localStorageService) {
        var self = this;

        self.backToMenu = function () {
            if(self.view === "T"){
                self.view = "D";
            } else if(self.view === "D"){
                self.view = "SE";
            } else {
                SidePanelService.setBabordView('menu');
            }
        };

        self.view = "SE";

        self.changeView = function (view) {
            self.view = view;
        };

        self.putSE = function (id) {
            if(angular.isDefined(id)){
                self.SEID = id;
            }
        };

        self.putD = function (id) {
            if(angular.isDefined(id)){
                self.DID = id;
            }
        };

        self.cleanAll = function () {
            AppTronconsService.favorites = [];
            localStorageService.add("AppTronconsFavorities",[]);
        };

    }

    function SystemEndigumentController($timeout, PouchService, AppTronconsService, $rootScope) {

        var self = this;

        self.prelod = true;

        self.SystemeEndiguements = [];


        $rootScope.loadingflag = true;
        PouchService.getLocalDB().query('Element/byClassAndLinear',{
            startkey: ['fr.sirs.core.model.SystemeEndiguement'],
            endkey: ['fr.sirs.core.model.SystemeEndiguement', {}]
        }).then(function (results) {
            $timeout(function () {
                self.SystemeEndiguements = results.rows;
                $rootScope.loadingflag = false;
            },100);
            }).catch(function (err) {
                console.log(err);
                $rootScope.loadingflag = false;
            });


    }
    
    function DigueController($timeout,PouchService, AppTronconsService, $rootScope) {
        var self = this;
        self.digues = [];



        self.getDigues = function (SEID) {
            if(SEID === "withoutSystem"){
                $rootScope.loadingflag = true;
                PouchService.getLocalDB().query('bySEIdHB',{
                    key : null
                }).then(function (results) {
                    $timeout(function () {
                        self.digues = results.rows;
                        $rootScope.loadingflag = false;
                    },100);
                }).catch(function (err) {
                    console.log(err);
                    $rootScope.loadingflag = false;
                });
            }
            else {
                $rootScope.loadingflag = true;
                PouchService.getLocalDB().query('bySEIdHB',{
                    key : SEID
                }).then(function (results) {
                    $timeout(function () {
                        self.digues = results.rows;
                        $rootScope.loadingflag = false;
                    },100);
                }).catch(function (err) {
                    console.log(err);
                    $rootScope.loadingflag = false;
                });

            }


        };

    }
    
    function TronconController($timeout,PouchService, AppTronconsService, localStorageService, $rootScope) {
        var self = this;

        self.troncons = [];

        self.getTroncons = function (DID) {

            if(angular.isDefined(DID)){
                $rootScope.loadingflag = true;
                PouchService.getLocalDB().query('byDigueIdHB',{
                    key : DID
                }).then(function (results) {
                    $timeout(function () {
                        self.troncons = results.rows;
                        $rootScope.loadingflag = false;
                    },100);
                }).catch(function (err) {
                    console.log(err);
                    $rootScope.loadingflag = false;
                });
            }


        };

        self.isActive = function(id) {
            return AppTronconsService.favorites.map(function(item) {
                    return item;
                }).indexOf(id) !== -1;
        };

        self.toggleLayer = function(id) {
            if (self.isActive(id)) {
                AppTronconsService.favorites.splice(AppTronconsService.favorites.indexOf(id), 1);
            } else {
                AppTronconsService.favorites.push(id);
            }
            localStorageService.add("AppTronconsFavorities",AppTronconsService.favorites);
        };
        
    }
    
    function AppTronconsService(localStorageService) {
        var init = [];
        if(localStorageService.get("AppTronconsFavorities") !== null){
            init = localStorageService.get("AppTronconsFavorities");
        }

        return {
            favorites : init
        };
        
    }