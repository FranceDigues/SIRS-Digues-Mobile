angular.module('app.controllers.app_troncons', ['app.services.context','app.services.context'])
    .controller('TronconsChoiceMenu',TronconsChoiceMenu)
    .controller('SystemEndigumentController', SystemEndigumentController);

    function TronconsChoiceMenu() {
        var self = this;
        self.backToMenu = function () {
            SidePanelService.setBabordView('menu');
        };

        self.view = "SE";

        self.changeView = function (view) {
            self.view = view;
        };

    }

    function SystemEndigumentController($rootScope, SidePanelService, PouchService) {

        var self = this;

        self.prelod = true;

        self.SystemeEndiguements = [];

        // PouchService.getLocalDB().query('TronconDigue/streamLight').then(function (results) {
        //         console.log(results);
        //         self.troncons = results.rows;
        //         self.prelod = false;
        //     }).catch(function (err) {
        //         console.log(err);
        //     });


        PouchService.getLocalDB().query('Element/byClassAndLinear',{
            startkey: ['fr.sirs.core.model.SystemeEndiguement'],
            endkey: ['fr.sirs.core.model.SystemeEndiguement', {}]
        }).then(function (results) {
                console.log(results);
                self.SystemeEndiguements = results.rows;
                self.prelod = false;
            }).catch(function (err) {
                console.log(err);
            });



        self.putSE = function (id) {
            console.log(id);
            if(angular.isDefined(id)){
                self.SEID = id;
            }

        };

    }