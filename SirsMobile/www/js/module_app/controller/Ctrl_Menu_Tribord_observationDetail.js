
angular.module('module_app.controllers.menus.tribord.observationDetail', [])

    .controller('cObservationDetail', function cObservationDetail(sContext, LocalDocument) {

        var self = this;


        self.doc = sContext.selectedObservation;

        self.urgencyLabel = null;

        self.objectId = sContext.selectedObject._id;

        self.backToDisorderDetails = function() {
            sContext.tribordView.active = 'objectDetail';
        };


        (function loadUrgencyLabel() {
            if (self.doc.urgenceId) {
                LocalDocument.get(self.doc.urgenceId).then(function(result) {
                    self.urgencyLabel = result.libelle;
                });
            }
        })();
    });