angular.module('app.controllers.object_details', ['app.services.map'])

    .controller('ObjectDetailsController', function ObjectDetailsController($ionicPopup, $ionicScrollDelegate, sContext, SidePanelService,
                                                                            LocalDocument, selection, $rootScope, MapManager, AuthService) {

        var self = this;

        self.activeTab = 'description';

        self.document = sContext.selectedObject;

        self.objectType = self.document['@class'].substring(
            self.document['@class'].lastIndexOf('.') + 1);

        self.abstract = {};

        self.setActiveTab = function (name) {
            if (name !== self.activeTab) {
                self.activeTab = name;
                $ionicScrollDelegate.$getByHandle('disorderScroll').scrollTop(false);
            }
        };

        self.backToDisorderList = function () {
            selection.active.changed();
            selection.active = undefined;
            SidePanelService.setTribordView('object_selection');
        };

        self.openObservationDetails = function (observation) {
            sContext.selectedObservation = observation;
            SidePanelService.setTribordView('observation_details');
        };

        self.remove = function () {
            return $ionicPopup.confirm({
                title: 'Suppression d\'un objet',
                template: 'Voulez vous vraiment supprimer cet objet ?'
            }).then(function (confirmed) {
                if (confirmed) {
                    LocalDocument.remove(self.document).then(function () {
                        // Remove the feature from the selection list.
                        var i = sContext.selectedFeatures.length;
                        while (i--) {
                            if (sContext.selectedFeatures[i].get('id') === self.document._id) {
                                sContext.selectedFeatures.splice(i, 1);
                                break;
                            }
                        }
                        // Return to the selection list view.
                        self.backToDisorderList();
                        MapManager.redrawEditionLayerAfterSynchronization();
                    });
                }
                return confirmed;
            });
        };

        self.flagLoading = function () {
            $rootScope.loadingflag = true;
        };

        self.canShowObservationsTab = function () {
            return self.objectType === 'Desordre'
                || self.objectType === 'StationPompage'
                || self.objectType === 'ReseauHydrauliqueFerme'
                || self.objectType === 'OuvrageHydrauliqueAssocie'
                || self.objectType === 'ReseauHydrauliqueCielOuvert'
                || self.objectType === 'VoieAcces'
                || self.objectType === 'OuvrageFranchissement'
                || self.objectType === 'OuvertureBatardable'
                || self.objectType === 'VoieDigue'
                || self.objectType === 'OuvrageVoirie'
                || self.objectType === 'ReseauTelecomEnergie'
                || self.objectType === 'OuvrageTelecomEnergie'
                || self.objectType === 'OuvrageParticulier'
                || self.objectType === 'Prestation'
                || self.objectType === 'EchelleLimnimetrique'
                || self.objectType === 'DesordreDependance';
        };

        self.canShowPrestationTab = function () {
            return self.objectType === 'StationPompage'
                || self.objectType === 'ReseauHydrauliqueFerme'
                || self.objectType === 'OuvrageHydrauliqueAssocie'
                || self.objectType === 'ReseauHydrauliqueCielOuvert'
                || self.objectType === 'VoieAcces'
                || self.objectType === 'OuvrageFranchissement'
                || self.objectType === 'OuvertureBatardable'
                || self.objectType === 'VoieDigue'
                || self.objectType === 'OuvrageVoirie'
                || self.objectType === 'ReseauTelecomEnergie'
                || self.objectType === 'OuvrageTelecomEnergie'
                || self.objectType === 'OuvrageParticulier'
                || self.objectType === 'EchelleLimnimetrique';
        };

        self.canShowDesordreTab = function () {
            return self.objectType === 'StationPompage'
                || self.objectType === 'ReseauHydrauliqueFerme'
                || self.objectType === 'OuvrageHydrauliqueAssocie'
                || self.objectType === 'ReseauHydrauliqueCielOuvert'
                || self.objectType === 'VoieAcces'
                || self.objectType === 'OuvrageFranchissement'
                || self.objectType === 'OuvertureBatardable'
                || self.objectType === 'VoieDigue'
                || self.objectType === 'OuvrageVoirie'
                || self.objectType === 'ReseauTelecomEnergie'
                || self.objectType === 'OuvrageTelecomEnergie'
                || self.objectType === 'OuvrageParticulier'
                || self.objectType === 'Prestation'
                || self.objectType === 'EchelleLimnimetrique';
        };

        self.canAddObservation = function () {
            return self.activeTab === 'observations' && AuthService.getValue().role !== 'GUEST';
        };

        self.canShowEditionButtons = function () {
            if (self.document['@class'] === "fr.sirs.core.model.BorneDigue"
                || self.document['@class'] === "fr.sirs.core.model.TronconDigue") {
                return false;
            }
            if (AuthService.getValue().role === 'USER' || AuthService.getValue().role === 'ADMIN') {
                return true;
            }
            if (AuthService.getValue().role === 'GUEST') {
                return false;
            }
            if (AuthService.getValue().role === 'EXTERN') {
                return self.document.author && AuthService.getValue()._id === self.document.author;
            }
        };

        self.addDesordre = function (did) {
            if (!self.document.desordreIds) {
                self.document.desordreIds = [];
            }
            self.document.desordreIds.push(did);
            self.desordreList = self.desordreList.filter(function (item) {
                return !self.document.desordreIds || self.document.desordreIds.indexOf(item.id) === -1;
            });
        };

        self.addPrestation = function (pid) {
            if (!self.document.prestationIds) {
                self.document.prestationIds = [];
            }
            self.document.prestationIds.push(pid);
            self.prestationList = self.prestationList.filter(function (item) {
                return !self.document.prestationIds || self.document.prestationIds.indexOf(item.id) === -1;
            });
        };

        self.init = function () {
            (function loadAbstracts() {
                angular.forEach(self.document, function (value, key) {
                    if (/.*Id$/.test(key)) {
                        LocalDocument.get(value).then(function (doc) {
                            self.abstract[key.substr(0, key.length - 2)] = doc.libelle;
                        });
                    }
                });
            })(); // run it

            LocalDocument.query('Element/byClassAndLinear', {
                startkey: ['fr.sirs.core.model.Prestation'],
                endkey: ['fr.sirs.core.model.Prestation', {}]
            }).then(function (response) {
                self.prestationMap = {};
                self.prestationList = response.map(function (elt) {
                    self.prestationMap[elt.value.id] = elt.value.designation + ' : ' + elt.value.libelle;
                    return elt.value;
                }).filter(function (item) {
                    return !self.document.prestationIds || self.document.prestationIds.indexOf(item.id) === -1;
                });
                self.tempPrestation = {v: null};
            }, function (error) {
                console.error(error);
            });

            LocalDocument.query('Element/byClassAndLinear', {
                startkey: ['fr.sirs.core.model.Desordre'],
                endkey: ['fr.sirs.core.model.Desordre', {}]
            }).then(function (response) {
                self.desordreMap = {};
                self.desordreList = response.map(function (elt) {
                    self.desordreMap[elt.value.id] = elt.value.designation && elt.value.libelle ? elt.value.designation + ' : ' + elt.value.libelle : elt.value.id;
                    return elt.value;
                }).filter(function (item) {
                    return !self.document.desordreIds || self.document.desordreIds.indexOf(item.id) === -1;
                });
                self.tempDesordre = {v: null};
            }, function (error) {
                console.error(error);
            });


        };

        self.init();

    });
