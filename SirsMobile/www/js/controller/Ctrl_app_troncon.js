angular.module('app.controllers.app_troncons', ['app.services.context','app.services.context'])
    .controller('TronconsChoiceMenu',TronconsChoiceMenu)
    .controller('SystemEndigumentController', SystemEndigumentController)
    .controller('DigueController',DigueController)
    .controller('TronconController',TronconController);

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
            if(angular.isDefined(SEID)){
                PouchService.getLocalDB().query('Digue/bySystemeEndiguementId',{
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


        };

        
    }
    
    function TronconController($timeout,PouchService) {
        var self = this;

        self.troncons = [];

        self.getTroncons = function (DID) {
            if(angular.isDefined(DID)){
                PouchService.getLocalDB().query('Berge/byDigueId',{
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
            // return AppLayersService.getFavorites().map(function(item) {
            //         return item.title;
            //     }).indexOf(layer.title) !== -1;
            return false;
        };

        self.toggleLayer = function(id) {
            // if (self.isActive(layer)) {
            //     AppLayersService.removeFavorite(layer);
            // } else {
            //     AppLayersService.addFavorite(layer);
            // }
        };
        
    }