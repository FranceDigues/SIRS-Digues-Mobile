
angular.module('app.controllers.object_selection', [])

    .controller('ObjectSelectionController', function ObjectSelectionController($cordovaToast, sContext, LocalDocument, SidePanelService, selection) {

        var self = this;

        self.selection = selection;

        //@hb the collection of the features of the cluster
        self.hbfeaturesCollection = [];
        //@hb get all the selected features from the the Cluster
        angular.forEach(self.selection.list,function(feat){
            angular.forEach(feat.get('features'),function(f){
                self.hbfeaturesCollection.push(f);
            });
        });

        console.log(self.hbfeaturesCollection);

        self.openDisorderDetails = function(feature) {

            feature.set('visited', true);
            selection.active = feature;

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