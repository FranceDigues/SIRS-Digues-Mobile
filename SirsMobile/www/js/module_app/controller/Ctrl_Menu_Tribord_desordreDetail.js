
angular.module('module_app.controllers.menus.tribord.desordreDetail', [])

    .controller('cDesordreDetail', function cDesordreDetail($ionicScrollDelegate, $cordovaToast, sContext) {

        var self = this;

        self.activeTab = 'description';

        self.document = sContext.selectedDocument;

        self.setActiveTab = function(name) {
            if (name !== self.activeTab) {
                self.activeTab = name;
                $ionicScrollDelegate.$getByHandle('disorderScroll').scrollTop(false);
            }
        };

        self.backToDisorderList = function() {
            sContext.tribordView.active = 'desordreSlct';
        };

        self.openObservationDetails = function() {
            onGetObservationSuccess(); // TODO -> load observation details
        };


        function onGetObservationSuccess() {
            sContext.tribordView.active = 'observationDetail';
        }

        function onGetObservationError() {
            $cordovaToast.showLongBottom('Une erreur s\'est produite.');
        }
    });