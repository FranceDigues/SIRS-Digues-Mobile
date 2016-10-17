
angular.module('app.controllers.object_selection', [])

    .controller('ObjectSelectionController', function ObjectSelectionController($cordovaToast, sContext, LocalDocument, SidePanelService, selection) {

        var self = this;

        self.selection = selection;

        self.openDisorderDetails = function(feature) {
            feature.set('visited', true);
            selection.active = feature;

            //@hb
            if(!feature.getId()){
                LocalDocument.get(feature.get('features')[0].get('id')).then(onGetDocumentSuccess, onGetDocumentError);
            }
            else {
                LocalDocument.get(feature.get('id')).then(onGetDocumentSuccess, onGetDocumentError);
            }
        };

        function onGetDocumentSuccess(doc) {
            sContext.selectedObject = doc;
            SidePanelService.setTribordView('object_details');
        }

        function onGetDocumentError() {
            $cordovaToast.showLongBottom('Une erreur s\'est produite.');
        }
    });