angular.module('app.controllers.app_troncons', ['app.services.context','app.services.context'])
    .controller('TronconsChoiceMenu',TronconsChoiceMenu)
    .controller('SystemEndigumentController', SystemEndigumentController)
    .controller('DigueController',DigueController)
    .controller('TronconController',TronconController)
    .factory('AppTronconsService',AppTronconsService);

    function TronconsChoiceMenu(SidePanelService) {
        var self = this;
        self.backToMenu = function () {
            SidePanelService.setBabordView('menu');
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

    }

    function SystemEndigumentController($timeout, PouchService) {

        var self = this;

        self.prelod = true;

        self.SystemeEndiguements = [];


        PouchService.getLocalDB().query('Element/byClassAndLinear',{
            startkey: ['fr.sirs.core.model.SystemeEndiguement'],
            endkey: ['fr.sirs.core.model.SystemeEndiguement', {}]
        }).then(function (results) {
            $timeout(function () {
                console.log(results);
                self.SystemeEndiguements = results.rows;
            },100);
            }).catch(function (err) {
                console.log(err);
            });


    }
    
    function DigueController($timeout,PouchService) {
        var self = this;
        self.digues = [];

        self.getDigues = function (SEID) {
            if(SEID === "withoutSystem"){
                PouchService.getLocalDB().query('bySEIdHB',{
                    key : null
                }).then(function (results) {
                    $timeout(function () {
                        console.log(results);
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
                        console.log(results);
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
                        console.log(results);
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

            console.log(AppTronconsService.favorites);
            localStorageService.add("AppTronconsFavorities",AppTronconsService.favorites);
            console.log(localStorageService.get("AppTronconsFavorities"));
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