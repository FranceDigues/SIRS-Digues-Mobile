angular.module('app.controllers.app_troncons', ['app.services.context','app.services.context'])
    .controller('TronconsChoiceMenu',TronconsChoiceMenu)
    .controller('SystemEndigumentController', SystemEndigumentController)
    .controller('DigueController',DigueController)
    .controller('TronconController',TronconController)
    .factory('AppTronconsService',AppTronconsService);

    function TronconsChoiceMenu(SidePanelService, $scope, AppTronconsService, localStorageService) {
        var self = this;

        self.preload = AppTronconsService.preload;

        $scope.$watch(AppTronconsService.preload, function(newVal) {
            self.preload = newVal;
        });


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
            AppTronconsService.preload = true;
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

    function SystemEndigumentController($timeout, PouchService, AppTronconsService) {

        var self = this;

        self.prelod = true;

        self.SystemeEndiguements = [];


        PouchService.getLocalDB().query('Element/byClassAndLinear',{
            startkey: ['fr.sirs.core.model.SystemeEndiguement'],
            endkey: ['fr.sirs.core.model.SystemeEndiguement', {}]
        }).then(function (results) {
            $timeout(function () {
                AppTronconsService.preload = false;
                self.SystemeEndiguements = results.rows;
            },100);
            }).catch(function (err) {
                console.log(err);
            });


    }
    
    function DigueController($timeout,PouchService, AppTronconsService) {
        var self = this;
        self.digues = [];

        self.getDigues = function (SEID) {
            if(SEID === "withoutSystem"){
                PouchService.getLocalDB().query('bySEIdHB',{
                    key : null
                }).then(function (results) {
                    $timeout(function () {
                        AppTronconsService.preload = false;
                        self.digues = results.rows;
                    },100);
                }).catch(function (err) {
                    console.log(err);
                });
            }
            else {
                PouchService.getLocalDB().query('bySEIdHB',{
                    key : SEID
                }).then(function (results) {
                    $timeout(function () {
                        AppTronconsService.preload = false;
                        self.digues = results.rows;
                    },100);
                }).catch(function (err) {
                    console.log(err);
                });

            }


        };

    }
    
    function TronconController($timeout,PouchService, AppTronconsService, localStorageService) {
        var self = this;

        self.troncons = [];

        self.getTroncons = function (DID) {
            if(angular.isDefined(DID)){
                PouchService.getLocalDB().query('byDigueIdHB',{
                    key : DID
                }).then(function (results) {
                    $timeout(function () {
                        AppTronconsService.preload = false;
                        self.troncons = results.rows;
                    },100);
                }).catch(function (err) {
                    console.log(err);
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
            favorites : init,
            preload : true
        };
        
    }