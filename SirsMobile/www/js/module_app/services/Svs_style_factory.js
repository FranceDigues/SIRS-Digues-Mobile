
angular.module('module_app.services.style.factory', [])

    .provider('sStyleFactory', function() {

        var colors = [
            [31 , 119, 180, 1], [174, 199, 232, 1],
            [255, 127,  14, 1], [255, 187, 120, 1],
            [44 , 160,  44, 1], [152, 223, 138, 1],
            [214,  39,  40, 1], [255, 152, 150, 1],
            [148, 103, 189, 1], [197, 176, 213, 1],
            [140,  86,  75, 1], [196, 156, 148, 1],
            [227, 119, 194, 1], [247, 182, 210, 1],
            [127, 127, 127, 1], [199, 199, 199, 1],
            [188, 189,  34, 1], [219, 219, 141, 1],
            [23 , 190, 207, 1], [158, 218, 229, 1]
        ];

        /**
         * Defines the list of available colors.
         *
         * @param {Array<Array<number>>} array the color array.
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
                 * @param {Array<number>} mainColor the main color.
                 * @param {Array<number>} [shadowColor] the shadow color.
                 * @returns {function(number)} the function that creates the ol.style.Style
                 * dynamically.
                 */
                create: function(mainColor, shadowColor) {
                    return function(resolution) {
                        var styles = [],
                            strokeWidth = 4,
                            pointRadius = 7;

                        var fillColor = angular.copy(mainColor);
                        fillColor[3] = fillColor[3] / 2;
                        var fill = new ol.style.Fill({ color: fillColor });

                        // Shadow style.
                        if (angular.isString(shadowColor) || angular.isArray(shadowColor)) {
                            var shadowStyle = new ol.style.Style({
                                stroke: new ol.style.Stroke({ color: shadowColor, width: strokeWidth + 4 })
                            });
                            styles.push(shadowStyle);
                        }

                        // Main style.
                        var mainStyle = new ol.style.Style({
                            fill: fill,
                            stroke: new ol.style.Stroke({ color: mainColor, width: strokeWidth }),
                            image: new ol.style.Circle({ fill: fill, radius: pointRadius })
                        });
                        styles.push(mainStyle);

                        return styles;
                    };
                },

                /**
                 * Returns the factory method used to create the ol.style.Style depending
                 * on the current map resolution and using the color at the specified index.
                 *
                 * @param {Integer} index the color index.
                 * @param {Array<number>} [shadowColor] the shadow color.
                 * @returns {function(number)} the function that creates the ol.style.Style
                 * dynamically.
                 */
                createByIndex: function(index, shadowColor) {
                    return this.create(colors[index], shadowColor);
                }
            };
        };
    });