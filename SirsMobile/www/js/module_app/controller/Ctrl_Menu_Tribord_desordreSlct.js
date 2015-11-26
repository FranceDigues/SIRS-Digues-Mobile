
angular.module('module_app.controllers.menus.tribord.desordreSlct', [])

    .controller('cDesordreSlct', function cDesordreSlct($cordovaToast, sContext, LocalDocument, SidePanelService) {

        var self = this;

        self.sContext = sContext;

        self.openDisorderDetails = function(feature) {
            LocalDocument.get(feature.get('id')).then(onGetDocumentSuccess, onGetDocumentError);
        };


        function onGetDocumentSuccess(doc) {
            sContext.selectedObject = doc;
            SidePanelService.setTribordView('objectDetail');
        }

        function onGetDocumentError() {
            $cordovaToast.showLongBottom('Une erreur s\'est produite.');
        }
    });