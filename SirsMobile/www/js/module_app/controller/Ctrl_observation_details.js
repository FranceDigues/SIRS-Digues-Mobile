
angular.module('module_app.controllers.observation_details', [])

    .controller('ObservationDetailsController', function ObservationDetailsController($ionicPlatform, sContext, SidePanelService, LocalDocument) {

        var self = this;


        self.doc = sContext.selectedObservation;

        self.urgencyLabel = null;

        self.mediaPath = null;

        self.objectId = sContext.selectedObject._id;

        self.getPhotoPath = function(photo) {
            var path = photo.chemin.replace(/\\/g, '/');
            if (path.charAt(0) !== '/') {
                path = '/' + path;
            }
            return self.mediaPath + path;
        };

        self.backToDisorderDetails = function() {
            SidePanelService.setTribordView('object_details');
        };


        if (self.doc.urgenceId) {
            // Acquire label for urgency identifier.
            LocalDocument.get(self.doc.urgenceId).then(function(result) {
                self.urgencyLabel = result.libelle;
            });
        }

        $ionicPlatform.ready(function() {
            // Acquire the medias storage path when the device is ready.
            self.mediaPath = window.cordova.file.externalDataDirectory + 'medias';
        });
    });