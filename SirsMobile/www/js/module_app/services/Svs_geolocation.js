angular.module('module_app.services.geolocation', [])

    .provider('GeolocationService', function() {

        this.$get = function($q, $timeout, $log, $rootScope) {

            var STOPPED = -1,
                STOPPING = 0,
                INITIALIZING = 1,
                INITIALIZED = 2,
                STARTING = 4,
                STARTED = 5;

            var status = -1,            // the last service status
                promise = undefined,    // the last command promise
                position = undefined;   // the last known position


            function initCmd(callback) {
                $log.debug('[GeolocationService] Connecting...');
                geoloc.initLoc(angular.noop, []);
                $timeout(callback, 1000); // TODO → find a way to handle setup success
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
                $rootScope.$broadcast('geoLocationReady', result);
            }

            function onChanged(result) {
                if (status === STARTING) {
                    status = STARTED;
                    $log.debug('[GeolocationService] Started.');
                }
                position = result;
                $log.debug('[GeolocationService] Position changed.');
                $rootScope.$broadcast('geoLocationChanged', result);
            }

            function onStopped(result) {
                if (status === STOPPING) {
                    status = STOPPED;
                }
                $log.debug('[GeolocationService] Stopped.');
                $rootScope.$broadcast('geoLocationStopped', result);
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

            function init() {
                if (status === STOPPED || status === STOPPING) {
                    status = INITIALIZING;
                    promise = exec(initCmd, onInitialized);
                }
                return promise;
            }

            function start() {
                if (status === STOPPED || status === STOPPING) {
                    init();
                }
                if (status === INITIALIZED || status === INITIALIZING) {
                    status = STARTING;
                    promise = exec(startCmd, onChanged);
                }
                return promise;
            }

            function stop() {
                if (status !== STOPPED && status !== STOPPING) {
                    status = STOPPING;
                    promise = exec(stopCmd, onStopped);
                }
                return promise;
            }


            return {
                start: start,
                stop: stop,
                isEnabled: function() {
                    return (status === STARTED || status === STARTING);
                }
            };
        };
    });