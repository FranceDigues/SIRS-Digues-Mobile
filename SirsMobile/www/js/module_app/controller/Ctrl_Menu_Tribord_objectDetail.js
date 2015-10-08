
angular.module('module_app.controllers.menus.tribord.objectDetail', [])

    .controller('ObjectDetailsController', function cDesordreDetail($ionicScrollDelegate, sContext, LocalDocument) {

        var self = this;


        self.activeTab = 'description';

        self.document = sContext.selectedDocument;

        self.abstract = {};

        self.setActiveTab = function(name) {
            if (name !== self.activeTab) {
                self.activeTab = name;
                $ionicScrollDelegate.$getByHandle('disorderScroll').scrollTop(false);
            }
        };

        self.getObjectType = function() {
            var objectType = self.document['@class'].substring(
                self.document['@class'].lastIndexOf('.') + 1);
            objectType = objectType.charAt(0).toLowerCase() + objectType.slice(1);
            return objectType;
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

        (function loadAbstracts() {
            angular.forEach(self.document, function(value, key) {
                if (/.*Id$/.test(key)) {
                    LocalDocument.get(value).then(function(doc) {
                        self.abstract[key.substr(0, key.length - 2)] = doc.libelle;
                    });
                }
            });
        })(); // run it
    });