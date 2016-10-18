
angular.module('app.controllers.object_selection', [])

    .controller('ObjectSelectionController', function ObjectSelectionController($cordovaToast, sContext,
                                                                                LocalDocument, SidePanelService,
                                                                                selection, $rootScope) {

        var self = this;

        self.selection = selection;
        self.hbfeaturesCollection = [];

        //@hb watch for the change of the list of selected features
        $rootScope.$watch(function() { return selection.list; }, function () {
            self.selection = selection;
            self.doRefresh();
        });

        //@hb do the refresh of the list of the selected features
        self.doRefresh =function () {
            //@hb the collection of the features of the cluster
            self.hbfeaturesCollection = [];
            //@hb get all the selected features from the the Cluster
            angular.forEach(self.selection.list,function(feat){
                angular.forEach(feat.get('features'),function(f){
                    self.hbfeaturesCollection.push(f);
                });
            });
        };

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

        //@hb
        function setSelectionStyle (fillColor,strokeColor) {
            var fill = new ol.style.Fill({ color: fillColor });
            var stroke = new ol.style.Stroke({ color: strokeColor, width: 1 });
            var circle = new ol.style.Circle({ fill: fill, stroke: stroke, radius: 6 });
            return new ol.style.Style({ image: circle, zIndex: 3});

        }
    });
