angular.module('module_app.services.geolocation', [])

    .provider('sGeolocation', function() {

        this.$get = function($rootScope) {

            function onLocationReady(params) {
                $rootScope.$broadcast('geoLocationReady', params);
            }

            function onLocationChanged(params) {
                $rootScope.$broadcast('geoLocationChanged', params);
            }

            function onLocationStopped(params) {
                $rootScope.$broadcast('geoLocationStopped', params);
            }

            return {
                /**
                 * Setups connection to Google API.
                 */
                setup: function initLocation() {
                    geoloc.initLoc(onLocationReady);
                },

                /**
                 * Starts the location service.
                 */
                start: function startLocation() {
                    geoloc.startLoc(onLocationChanged);
                },

                /**
                 * Stops the location service.
                 */
                stop: function stopLocation() {
                    geoloc.stopLoc(onLocationStopped);
                }
            };
        };
    });