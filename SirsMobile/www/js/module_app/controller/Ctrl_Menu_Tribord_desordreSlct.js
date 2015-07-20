
angular.module('module_app.controllers.menus.tribord.desordreSlct', [])

    .controller('cDesordreSlct', function cDesordreSlct($cordovaToast, sContext, sPouch) {

        var self = this;

        self.sContext = sContext;

        self.openDisorderDetails = function(feature) {
            sPouch.localDb.get(feature.get('id')).then(onGetDocumentSuccess, onGetDocumentError);
        };


        function onGetDocumentSuccess(doc) {
            sContext.selectedDocument = doc;
            sContext.tribordView.active = 'desordreDetail';
        }

        function onGetDocumentError() {
            $cordovaToast.showLongBottom('Une erreur s\'est produite.');
        }
    });