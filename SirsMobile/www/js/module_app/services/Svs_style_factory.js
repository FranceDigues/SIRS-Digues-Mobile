
angular.module('module_app.services.style.factory', [])

    .provider('sStyleFactory', function() {

        var colors = [
            '#1f77b4', '#aec7e8',
            '#ff7f0e', '#ffbb78',
            '#2ca02c', '#98df8a',
            '#d62728', '#ff9896',
            '#9467bd', '#c5b0d5',
            '#8c564b', '#c49c94',
            '#e377c2', '#f7b6d2',
            '#7f7f7f', '#c7c7c7',
            '#bcbd22', '#dbdb8d',
            '#17becf', '#9edae5'
        ];

        /**
         * Defines the list of available colors (hex).
         *
         * @param {Array} array the color array.
         * @returns {Object} self.
         */
        this.setColors = function(array) {
            if (angular.isArray(array)) {
                colors = array;
            }
            return this;
        };

        this.$get = function() {
            return {
                /**
                 * Returns the factory method used to create the ol.style.Style depending
                 * on the current map resolution and using the specified color.
                 *
                 * @param {String} color the color (hex code).
                 * @returns {Function} the function that creates the ol.style.Style dynamically.
                 */
                create: function(color) {
                    return function(resolution) {
                        var fill = new ol.style.Fill({
                            color: color,
                            opacity: 0.25
                        });

                        var stroke = new ol.style.Stroke({
                            color: color,
                            width: 4
                        });

                        var image = new ol.style.Circle({
                            fill: fill,
                            radius: 7
                        });

                        return [new ol.style.Style({
                            fill: fill,
                            stroke: stroke,
                            image: image
                        })];
                    };
                },

                /**
                 * Returns the factory method used to create the ol.style.Style depending
                 * on the current map resolution and using the color at the specified index.
                 *
                 * @param {Integer} index the color index.
                 * @returns {Function} the function that creates the ol.style.Style dynamically.
                 */
                createByIndex: function(index) {
                    return this.create(colors[index]);
                }
            };
        };
    });