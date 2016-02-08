angular.module('app.services.tracker', ['app.services.geolocation'])

    .service('tracker', function($q, GeolocationService) {

        var self = this;

        var locationWasEnabled = GeolocationService.isEnabled();

        var status = 'off';

        var coordinates = [];

        var deferred = $q.defer();


        GeolocationService.trackLocation(handleLocation);


        self.start = start;

        self.stop = stop;

        self.clear = clear;


        function start() {
            clear();

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

        function clear() {
            coordinates = [];
        }

        function handleLocation(location) {
            if (status === 'on') {
                // Store new coordinate.
                coordinates.push([location.coords.longitude, location.coords.latitude]);

                // Notify advancement.
                deferred.notify(coordinates);
            }
        }
    });

