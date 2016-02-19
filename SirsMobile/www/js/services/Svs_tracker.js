/**
 * @ngdoc service
 * @name TrackerService
 *
 * @param {$q} $q
 * @param {Object} GeolocationService
 * @this TrackerService
 */
function TrackerService($q, GeolocationService) {

    var self = this;

    var locationWasEnabled = GeolocationService.isEnabled();

    var status = 'off';

    var coordinates = undefined;

    var deferred = undefined;


    GeolocationService.trackLocation(handleLocation);


    self.start = start;

    self.stop = stop;

    self.getStatus = getStatus;

    self.getCoordinates = getCoordinates;

    self.getPromise = getPromise;


    function start() {

        coordinates = [];

        // Switch internal status.
        status = 'on';

        // Store geolocation state.
        locationWasEnabled = GeolocationService.isEnabled();

        // Start geolocation.
        if (!locationWasEnabled) GeolocationService.start();

        // Create and return coordinate promise.
        return (deferred = $q.defer()).promise;
    }

    function stop() {
        // Switch internal status.
        status = 'off';

        // Restore geolocation state.
        if (!locationWasEnabled) GeolocationService.stop();

        // Resolve coordinate promise.
        deferred.resolve(coordinates);

        // Return coordinates array.
        return coordinates;
    }

    function getStatus() {
        return status;
    }

    function getCoordinates() {
        return coordinates;
    }

    function getPromise() {
        return deferred.promise;
    }

    function handleLocation(location) {
        if (status === 'on') {
            // Store new coordinate.
            coordinates.push([location.coords.longitude, location.coords.latitude]);

            // Notify advancement.
            deferred.notify(coordinates);
        }
    }
}

angular.module('app.services.tracker', ['app.services.geolocation'])
    .service('tracker', TrackerService);

