angular.module('module_app.controllers.objectEdition', [])

    .controller('ObjectEditionController', function ObjectEditionController($scope, $q, $location, $ionicLoading, $ionicScrollDelegate, $routeParams, GeolocationService, LocalDocument, ContextService, objectDoc) {

        var self = this;

        var isNewObject = !$routeParams.id;

        var isClosed = !!objectDoc.positionFin;

        var initialRevision = objectDoc._rev;

        var geolocWasEnabled = GeolocationService.isEnabled();


        self.tab = $location.search().tab || 'description';

        self.objectType = $routeParams.type;

        self.objectDoc = objectDoc;

        self.geoloc = undefined;

        self.isLinear = true;

        self.setTab = function(name) {
            if (name !== self.tab) {
                self.tab = name;
                $location.search('tab', self.tab);
                $ionicScrollDelegate.$getByHandle('formScroll').scrollTop(false);
            }
        };

        self.updateLoc = function() {
            waitForLocation(GeolocationService.getLocationPromise());
        };

        self.save = function() {
            var coordinate = ol.proj.transform([self.geoloc.longitude, self.geoloc.latitude], 'EPSG:4326', 'EPSG:2154');

            // Set position(s).
            if (isNewObject) {
                self.objectDoc.positionDebut = 'POINT(' + coordinate[0] + ',' + coordinate[1] + ')';
            }
            if (!self.isLinear || (!isNewObject && !isClosed)) {
                self.objectDoc.positionFin = 'POINT(' + coordinate[0] + ',' + coordinate[1] + ')';
            }

            // Save document.
            LocalDocument.save(self.objectDoc).then(function() {
                $location.path('/home');
            });
        };


        // Force geolocation service activation and wait for first location.
        if (geolocWasEnabled) {
            var lastLocation = GeolocationService.getLastLocation();
            if (lastLocation) {
                self.geoloc = lastLocation.coords;
            } else {
                waitForLocation(GeolocationService.getLocationPromise());
            }
        } else {
            waitForLocation(GeolocationService.start());
        }

        // Callback for page exit.
        $scope.$on('$destroy', function() {
            // Remove the document if it's new and non saved.
            if (isNewObject && objectDoc._rev === initialRevision) {
                LocalDocument.remove(objectDoc);
            }
            // Restore the geolocation service state.
            if (!geolocWasEnabled) {
                GeolocationService.stop();
            }
        });


        function waitForLocation(locationPromise) {
            $ionicLoading.show({ template: 'En attente de localisation...' });
            locationPromise.then(function handleLocation(location) {
                self.geoloc = location.coords;
                $ionicLoading.hide();
            });
        }
    });