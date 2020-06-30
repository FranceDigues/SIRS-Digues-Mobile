angular.module('app.controllers.object_details', ['app.services.map'])

    .controller('ObjectDetailsController', function ObjectDetailsController($ionicPopup, $ionicScrollDelegate, sContext, SidePanelService,
                                                                            LocalDocument, selection, $rootScope, MapManager, AuthService, EditionService) {

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
                || self.objectType === 'EchelleLimnimetrique'
                || self.objectType === 'Desordre';
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

        self.openDesordreLink = function (id) {
            $rootScope.loadingflag = true;
            window.location.href = "#/object/Desordre/" + id;
        };

        self.openPrestationLink = function (id) {
            $rootScope.loadingflag = true;
            window.location.href = "#/object/Prestation/" + id;
        };

        self.addDesordre = function (did) {
            if (!did) {
                return;
            }
            if (!self.document.desordreIds) {
                self.document.desordreIds = [];
            }
            self.document.desordreIds.push(did);
            self.filterDesordreList();

            self.document.valid = false;

            self.document.dateMaj = new Date().toISOString().split('T')[0];

            self.document.editMode = true;

            EditionService.saveObject(self.document)
                .then(function () {
                    MapManager.syncAllAppLayer();
                    MapManager.clearAll();
                });

        };

        self.removeDesordre = function (index) {
            return $ionicPopup.confirm({
                title: 'Suppression de l\'association',
                template: 'Voulez vous vraiment supprimer cette association ?'
            }).then(function (confirmed) {
                if (confirmed) {
                    self.document.desordreIds.splice(index, 1);
                    if (self.document.desordreIds.length === 0) {
                        delete self.document.desordreIds;
                    }

                    self.document.valid = false;

                    self.document.dateMaj = new Date().toISOString().split('T')[0];

                    self.document.editMode = true;

                    self.filterDesordreList();

                    EditionService.saveObject(self.document)
                        .then(function () {
                            MapManager.syncAllAppLayer();
                            MapManager.clearAll();
                        });
                }
                return confirmed;
            });
        };

        self.filterDesordreList = function () {
            self.desordreList = self.allDesordreList.filter(function (item) {
                return !self.document.desordreIds || self.document.desordreIds.indexOf(item.id) === -1;
            });

            console.debug('nombre of desordre : ', self.desordreList.length);
        };

        self.addPrestation = function (pid) {
            if (!pid) {
                return;
            }

            if (!self.document.prestationIds) {
                self.document.prestationIds = [];
            }
            self.document.prestationIds.push(pid);
            self.filterPrestationList();

            self.document.valid = false;

            self.document.dateMaj = new Date().toISOString().split('T')[0];

            self.document.editMode = true;

            EditionService.saveObject(self.document)
                .then(function () {
                    MapManager.syncAllAppLayer();
                    MapManager.clearAll();
                });
        };

        self.removePrestation = function (index) {
            return $ionicPopup.confirm({
                title: 'Suppression de l\'association',
                template: 'Voulez vous vraiment supprimer cette association ?'
            }).then(function (confirmed) {
                if (confirmed) {
                    self.document.prestationIds.splice(index, 1);
                    if (self.document.prestationIds.length === 0) {
                        delete self.document.prestationIds;
                    }

                    self.document.valid = false;

                    self.document.dateMaj = new Date().toISOString().split('T')[0];

                    self.document.editMode = true;

                    self.filterPrestationList();

                    EditionService.saveObject(self.document)
                        .then(function () {
                            MapManager.syncAllAppLayer();
                            MapManager.clearAll();
                        });
                }
                return confirmed;
            });
        };

        self.filterPrestationList = function () {
            self.prestationList = self.allPrestationList.filter(function (item) {
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
                self.allPrestationList = response.map(function (elt) {
                    self.prestationMap[elt.value.id] = elt.value.designation ? elt.value.designation : (elt.value.libelle ? elt.value.libelle : 'sans designation');
                    return elt.value;
                });
                self.filterPrestationList();
                self.tempPrestation = {v: null};
            }, function (error) {
                console.error(error);
            });

            LocalDocument.query('Element/byClassAndLinear', {
                startkey: ['fr.sirs.core.model.Desordre', self.document.linearId],
                endkey: ['fr.sirs.core.model.Desordre', self.document.linearId, {}]
            }).then(function (response) {
                self.desordreMap = {};
                self.allDesordreList = response.map(function (elt) {
                    self.desordreMap[elt.value.id] = elt.value.designation ? elt.value.designation : (elt.value.libelle ? elt.value.libelle : 'sans designation');
                    return elt.value;
                });
                self.filterDesordreList();
                self.tempDesordre = {v: null};
            }, function (error) {
                console.error(error);
            });
        };

        self.init();

    });
