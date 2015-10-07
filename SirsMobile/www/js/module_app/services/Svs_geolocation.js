angular.module('module_app.services.geolocation', [])

    .provider('GeolocationService', function() {

        // TODO → should be configured

        this.$get = function($rootScope, $log, $q, $timeout, ContextService) {

            var STOPPED = -1,
                STOPPING = 0,
                INITIALIZING = 1,
                INITIALIZED = 2,
                STARTING = 4,
                STARTED = 5;

            var context = ContextService.getValue(),    // the application context
                status = -1,                            // the last service status
                promise = undefined,                    // the last command promise
                nextLocation = $q.defer();              // the next location deferred


            function initCmd(callback) {
                $log.debug('[GeolocationService] Connecting...');
                geoloc.initLoc(angular.noop, []);
                $timeout(callback, 3000); // TODO → find a way to handle setup success
            }

            function startCmd(callback) {
                $log.debug('[GeolocationService] Starting...');
                geoloc.startLoc(callback, []);
            }

            function stopCmd(callback) {
                $log.debug('[GeolocationService] Stopping...');
                geoloc.stopLoc(angular.noop);
                $timeout(callback, 1000); // TODO → find a way to handle stop success
            }

            function onInitialized(result) {
                if (status === INITIALIZING) {
                    status = INITIALIZED;
                }
                $log.debug('[GeolocationService] Connected.');
                $rootScope.$broadcast('geolocationReady', result);
            }

            function onChanged(result) {
                if (status === STARTING) {
                    status = STARTED;
                    $log.debug('[GeolocationService] Started.');
                }
                context.lastLocation = result;
                nextLocation.resolve(result);
                nextLocation = $q.defer();
                $log.debug('[GeolocationService] Position changed.');
                $rootScope.$broadcast('geolocationChanged', result);
            }

            function onStopped(result) {
                if (status === STOPPING) {
                    status = STOPPED;
                }
                $log.debug('[GeolocationService] Stopped.');
                $rootScope.$broadcast('geolocationStopped', result);
            }

            function exec(cmd, callback) {
                var newDeferred = $q.defer();
                $q.when(promise).finally(function execNext() {
                    cmd(function cmdCallback(result) {
                        newDeferred.resolve(result);
                        callback(result);
                    });
                });
                return newDeferred.promise;
            }

            function initialize() {
                if (status === STOPPED || status === STOPPING) {
                    status = INITIALIZING;
                    promise = exec(initCmd, onInitialized);
                }
                return promise;
            }


            return {
                start: function() {
                    if (status === STOPPED || status === STOPPING) {
                        initialize();
                    }
                    if (status === INITIALIZED || status === INITIALIZING) {
                        status = STARTING;
                        promise = exec(startCmd, onChanged);
                    }
                    return promise;
                },

                stop: function() {
                    if (status !== STOPPED && status !== STOPPING) {
                        status = STOPPING;
                        promise = exec(stopCmd, onStopped);
                    }
                    return promise;
                },

                getLastLocation: function() {
                    return context.lastLocation;
                },

                getLocationPromise: function() {
                    return nextLocation.promise;
                },

                isEnabled: function() {
                    return (status === STARTED || status === STARTING);
                }
            };
        };
    });