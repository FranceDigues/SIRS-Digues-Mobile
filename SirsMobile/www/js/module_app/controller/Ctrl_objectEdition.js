angular.module('module_app.controllers.objectEdition', [])

    .controller('ObjectEditionController', function ObjectEditionController($scope, $location, $ionicScrollDelegate, $routeParams, GeolocationService, PouchObject, objectDoc) {

        var self = this;

        var isNewObject = !$routeParams.id;

        var initialRevision = objectDoc._rev;

        var geolocWasEnabled = GeolocationService.isEnabled();


        self.tab = $location.search().tab || 'description';

        self.params = $routeParams;

        self.objectDoc = objectDoc;

        self.setTab = function(name) {
            if (name !== self.tab) {
                self.tab = name;
                $location.search('tab', self.tab);
                $ionicScrollDelegate.$getByHandle('formScroll').scrollTop(false);
            }
        };


        // Force the geolocation service activation.
        GeolocationService.start().then(function(position) {
            console.log(position);
        });

        $scope.$on('$destroy', function() {
            // Remove the document if it's new and non saved.
            if (isNewObject && objectDoc._rev === initialRevision) {
                PouchObject.remove(objectDoc);
            }
            // Restore the geolocation service state.
            if (!geolocWasEnabled) {
                GeolocationService.stop();
            }
        });
    });