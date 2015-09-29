(function(window, angular, ol) { 'use strict';

    /**
     * The 'ol' module provides OpenLayers (v3.0.0) services and directives for angular apps.
     *
     * @author Fabien Bernard (Geomatys).
     * @version 0.1.0
     *
     * @ngModule
     * @name ol
     */
    angular.module('ol', ['ng'])
        .provider('olMap', OlMapProvider)
        .directive('olMap', olMapDirective);


    /**
     * Used for configuring {@link ol.Map}s.
     *
     * @ngProvider
     * @name olMapProvider
     */
    function OlMapProvider() {

        var options = {};

        /**
         * The 'olMapProvider' configuration object.
         *
         * @property
         * @name olMapProvider#defaults
         * @public
         */
        var defaults = this.defaults = {
            /**
             * The default {@link ol.Map} options. Override this property to change the
             * default map behavior.
             *
             * @property
             * @name olMapProvider#defaults.options
             * @public
             *
             * @returns {object} the map options.
             */
            options: function() {
                return {
                    layers: [
                        new ol.layer.Tile({ source: new ol.source.OSM() })
                    ],
                    view: new ol.View({ center: [0, 0], zoom: 1 })
                };
            }
        };

        /**
         * Sets the options for the {@link ol.Map} with the specified name.
         *
         * @method
         * @name olMapProvider#provideOptions
         * @public
         *
         * @param name {string} the map name.
         * @param opts {object|function} the map options (prefer function).
         */
        this.provideOptions = function(name, opts) {
            options[name] = opts;
        };

        /**
         * Provider '$get' method implementation.
         *
         * @see https://docs.angularjs.org/api/auto/service/$provide#provider
         */
        this.$get = ['$injector', function($injector) {

            var maps = {};

            /**
             * Utility method used to resolve map options variable whatever its type.
             *
             * @param options {object|array|function|undefined} the map options variable.
             * @param locals {object} contextual values to be injected.
             * @return {object} the map options or undefined.
             */
            function resolveOptions(options, locals) {
                if (angular.isString(options)) {
                    return $injector.get(options);
                }
                if (angular.isArray(options) || angular.isFunction(options)) {
                    return $injector.invoke(options, null, locals);
                }
                return options;
            }

            /**
             * The 'olMap' service.
             *
             * @ngService
             * @name olMap
             */
            return {
                /**
                 * Returns the {@link ol.Map} instance for the specified name.
                 *
                 * @method
                 * @name olMap#get
                 * @public
                 *
                 * @param name {string} the map name.
                 * @return {object} the map instance or undefined.
                 */
                get: function(name) {
                    return maps[name];
                },

                /**
                 * Returns the options for the map with the specified name. Fallback on
                 * default options if there is not options matching the specified name.
                 *
                 * @method
                 * @name olMap#_getOptions_
                 * @internal
                 *
                 * @param name {string} the map name.
                 * @param locals {object} contextual values to be injected.
                 * @return {object} the map options or undefined.
                 */
                _getOptions_: function(name, locals) {
                    return resolveOptions(options[name], locals) || 
                        resolveOptions(defaults.options, locals) || {};
                },

                /**
                 * Adds a new {@link ol.Map} instance in the service.
                 *
                 * @method
                 * @name olMap#_add_
                 * @internal
                 *
                 * @param name {string} the map name.
                 * @param instance {ol.Map} the map instance.
                 */
                _add_: function(name, instance) {
                    maps[name] = instance;
                },

                /**
                 * Removes the {@link ol.Map} instance with the specified name from the service.
                 *
                 * @method
                 * @name olMap#_remove_
                 * @internal
                 *
                 * @param name {string} the map name.
                 */
                _remove_: function(name) {
                    delete maps[name];
                }
            };
        }];
    }


    /**
     * The 'olMap' directive.
     *
     * @ngDirective
     * @name olMap
     */
    olMapDirective.$inject = ['olMap'];
    function olMapDirective(olMap) {
        return {
            restrict: 'ECA',
            link: function(scope, element, attr) {
                var name = attr.olMap || attr.name || attr.id,
                    onreadyExp = attr.onready || '',
                    ondisposeExp = attr.ondispose || '',
                    options = olMap._getOptions_(name, { element: element });

                // Set directive element as 'target' for the map.
                options.target = element[0];

                // Instantiate the OpenLayers map with previous options.
                var map = new ol.Map(options);

                // Handle the map 'postrender' event.
                map.on('postrender', onPostRender, map);

                // Handle directive element '$destroy' event.
                element.on('$destroy', onDestroy);

                // OpenLayers map 'postrender' event callback.
                function onPostRender() {
                    // Add the map instance in the 'olMap' service.
                    olMap._add_(name, map);

                    // Call 'onready' callback.
                    scope.$eval(onreadyExp, { map: map });

                    // No longer listen 'postrender' event.
                    map.un('postrender', onPostRender, map);
                }

                // Directive element '$destroy' event callback.
                function onDestroy() {
                    // Call 'ondispose' callback.
                    scope.$eval(ondisposeExp, { map: map });

                    // Properly destroy the map.
                    map.setTarget(null);

                    // Remove the map instance from the 'olMap' service.
                    olMap._remove_(name);
                }
            }
        };
    }

})(window, window.angular, window.ol);