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

        (function loadAbstracts() {
            angular.forEach(self.document, function (value, key) {
                if (/.*Id$/.test(key)) {
                    LocalDocument.get(value).then(function (doc) {
                        self.abstract[key.substr(0, key.length - 2)] = doc.libelle;
                    });
                }
            });
        })(); // run it
    });