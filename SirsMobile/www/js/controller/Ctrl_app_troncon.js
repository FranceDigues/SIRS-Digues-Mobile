angular.module('app.controllers.app_troncons', ['app.services.context', 'app.services.context'])
    .controller('TronconsChoiceMenu', TronconsChoiceMenu)
    .controller('SystemEndigumentController', SystemEndigumentController)
    .controller('DigueController', DigueController)
    .controller('TronconController', TronconController)
    .factory('AppTronconsService', AppTronconsService);

function TronconsChoiceMenu(SidePanelService, $scope, AppTronconsService, localStorageService) {
    var self = this;

    self.backToMenu = function () {
        if (self.view === "T") {
            self.view = "D";
        } else if (self.view === "D") {
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
        if (angular.isDefined(id)) {
            self.SEID = id;
        }
    };

    self.putD = function (id) {
        if (angular.isDefined(id)) {
            self.DID = id;
        }
    };

    self.cleanAll = function () {
        AppTronconsService.favorites = [];
        localStorageService.add("AppTronconsFavorities", []);
    };

}

function SystemEndigumentController($rootScope, $timeout, PouchService) {

    var self = this;

    self.prelod = true;

    self.SystemeEndiguements = [];

    $rootScope.loadingflag = true;

    PouchService.getLocalDB().query('Element/byClassAndLinear', {
        startkey: ['fr.sirs.core.model.SystemeEndiguement'],
        endkey: ['fr.sirs.core.model.SystemeEndiguement', {}]
    }).then(function (results) {
        $timeout(function () {
            self.SystemeEndiguements = results.rows;
            self.SystemeEndiguements.push({
                id: 'withoutSystem',
                value: {
                    libelle: "Sans système d'endiguement"
                }
            });
            $rootScope.loadingflag = false;
        }, 100);
    }).catch(function (err) {
        console.log(err);
        $rootScope.loadingflag = false;
    });


}

function DigueController($timeout, PouchService, AppTronconsService, $rootScope) {
    var self = this;
    self.digues = [];

    self.getDigues = function (SEID) {
        var key = SEID === "withoutSystem" ? null : SEID;
        $rootScope.loadingflag = true;
        PouchService.getLocalDB().query('bySEIdHB', {
            key: key
        }).then(function (results) {
            $timeout(function () {
                self.digues = results.rows;
                if (SEID === "withoutSystem") {
                    self.digues.push({
                        id: 'SansDigue',
                        value: {
                            libelle: "Sans digue"
                        }
                    });
                }
                $rootScope.loadingflag = false;
            }, 100);
        }).catch(function (err) {
            console.log(err);
            $rootScope.loadingflag = false;
        });

    };

}

function TronconController($timeout, PouchService, AppTronconsService, localStorageService, $rootScope) {
    var self = this;

    self.troncons = [];

    self.getTroncons = function (DID) {

        if (DID === "SansDigue") {
            PouchService.getLocalDB().query('Element/byClassAndLinear', {
                startkey: ['fr.sirs.core.model.TronconDigue'],
                endkey: ['fr.sirs.core.model.TronconDigue', {}],
                include_docs: true
            }).then(function (results) {
                $timeout(function () {
                    self.troncons = results.rows.filter(function (item) {
                        return !item.doc.digueId;
                    });
                    $rootScope.loadingflag = false;
                }, 100);
            }).catch(function (err) {
                console.log(err);
                $rootScope.loadingflag = false;
            });
        } else {
            $rootScope.loadingflag = true;
            PouchService.getLocalDB().query('byDigueId', {
                key: DID
            }).then(function (results) {
                $timeout(function () {
                    self.troncons = results.rows;
                    $rootScope.loadingflag = false;
                }, 100);
            }).catch(function (err) {
                console.log(err);
                $rootScope.loadingflag = false;
            });
        }
    };

    self.isActive = function (id) {
        return AppTronconsService.favorites.map(function (item) {
            return item.id;
        }).indexOf(id) !== -1;
    };

    self.toggleLayer = function (troncon) {
        if (self.isActive(troncon.id)) {
            AppTronconsService.favorites.splice(AppTronconsService.favorites
                .map(function (item) {
                    return item.id;
                }).indexOf(troncon.id), 1);
        } else {
            AppTronconsService.favorites.push({
                id: troncon.id,
                libelle: troncon.value.libelle,
                systemeRepDefautId: troncon.value.systemeRepDefautId,
                borneIds: troncon.value.borneIds
            });
        }
        localStorageService.add("AppTronconsFavorities", AppTronconsService.favorites);
    };

}

function AppTronconsService(localStorageService) {
    var init = [];
    if (localStorageService.get("AppTronconsFavorities") !== null) {
        init = localStorageService.get("AppTronconsFavorities");
    }

    return {
        favorites: init
    };

}
