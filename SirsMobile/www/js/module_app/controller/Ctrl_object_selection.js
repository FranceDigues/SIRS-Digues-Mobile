
angular.module('module_app.controllers.object_selection', [])

    .controller('ObjectSelectionController', function ObjectSelectionController($cordovaToast, sContext, LocalDocument, SidePanelService) {

        var self = this;

        self.sContext = sContext;

        self.openDisorderDetails = function(feature) {
            LocalDocument.get(feature.get('id')).then(onGetDocumentSuccess, onGetDocumentError);
        };


        function onGetDocumentSuccess(doc) {
            sContext.selectedObject = doc;
            SidePanelService.setTribordView('object_details');
        }

        function onGetDocumentError() {
            $cordovaToast.showLongBottom('Une erreur s\'est produite.');
        }
    });