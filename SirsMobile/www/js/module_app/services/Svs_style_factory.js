
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

            function createPolygonStyle(fillColor, strokeColor, strokeWidth) {
                var fill = new ol.style.Fill({ color: fillColor });
                var stroke = new ol.style.Stroke({ color: strokeColor, width: strokeWidth });
                return new ol.style.Style({ fill: fill, stroke: stroke });
            }

            function createLineStyle(strokeColor, strokeWidth) {
                var stroke = new ol.style.Stroke({ color: strokeColor, width: strokeWidth });
                return new ol.style.Style({ stroke: stroke });
            }

            function createPointStyle(fillColor, strokeColor, strokeWidth, circleRadius) {
                var fill = new ol.style.Fill({ color: fillColor });
                var stroke = new ol.style.Stroke({ color: strokeColor, width: strokeWidth });
                var circle = new ol.style.Circle({ fill: fill, stroke: stroke, radius: circleRadius });
                return new ol.style.Style({ image: circle });
            }

            function createPointStyleArray(color, highligth) {
                var fillColor = highligth === true ? color : [255, 255, 255, 0.25],
                    strokeColor = highligth === true ? [255, 255, 255, 1] : color,
                    strokeWidth = 2,
                    pointRadius = 5;
                return [createPointStyle(fillColor, strokeColor, strokeWidth, pointRadius)];
            }

            function createLineStyleArray(color, highligth) {
                var styles = [],
                    strokeColor = color,
                    strokeWidth = 4;
                if (highligth === true) {
                    styles.push(createLineStyle([255, 255, 255, 1], strokeWidth + 4));
                }
                styles.push(createLineStyle(strokeColor, strokeWidth));
                return styles;
            }

            function createPolygonStyleArray(color, highligth) {
                var styles = [],
                    fillColor = [255, 255, 255, 0.25],
                    strokeColor = color,
                    strokeWidth = 4;
                if (highligth === true) {
                    styles.push(createLineStyle([255, 255, 255, 1], strokeWidth + 4));
                }
                styles.push(createPolygonStyle(fillColor, strokeColor, strokeWidth));
                return styles;
            }

            return {
                /**
                 * Returns the factory method used to create the ol.style.Style depending
                 * on the current map resolution and using the specified color.
                 *
                 * @param {Array<number>} color the color to apply.
                 * @param {string} geometryType the geometry type.
                 * @param {boolean} [highlight] if true, the style will be highlighted.
                 * @returns {function(number)} the function that creates the ol.style.Style
                 * dynamically.
                 */
                createByColor: function(color, geometryType, highlight) {
                    switch (geometryType) {
                        case 'Polygon':
                        case 'MultiPolygon':
                            return createPolygonStyleArray(highlight);
                        case 'LineString':
                        case 'MultiLineString':
                            return createLineStyleArray(color, highlight);
                        case 'Point':
                        case 'MultiPoint':
                            return createPointStyleArray(color, highlight);
                    }
                    return null;
                },

                /**
                 * Returns the factory method used to create the ol.style.Style depending
                 * on the current map resolution and using the color at the specified index.
                 *
                 * @param {Integer} index the color index.
                 * @param {string} geometryType the geometry type.
                 * @param {boolean} [highlight] if true, the style will be highlighted.
                 * @returns {function(number)} the function that creates the ol.style.Style
                 * dynamically.
                 */
                createByIndex: function(index, geometryType, highlight) {
                    return this.createByColor(colors[index], geometryType, highlight);
                }
            };
        };
    });