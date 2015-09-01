angular.module('module_app.directives.horizontal_tree', [])

    .directive('hTree', function($q, $timeout) {
        return {
            restrict: 'EA',
            scope: {
                size: '=',
                tops: '=',
                children: '&',
                onselect: '&'
            },
            link: function(scope) {
                var columns  = scope.columns = [],
                    path     = scope.path = [],
                    size     = scope.size || 3,
                    position = 0;

                // Watch for top concept changes.
                scope.$watch('tops', topsWatchAction);

                /**
                 * Handles first column nodes changes.
                 *
                 * @param {Array} tops The nodes of the first column.
                 */
                function topsWatchAction(tops) {
                    columns  = scope.columns = [];
                    path     = scope.path = [];
                    position = 0;
                    addColumn(tops);
                }

                /**
                 * Adds a column with specified nodes.
                 *
                 * @param {Array} nodes The nodes of the column.
                 */
                function addColumn(nodes) {
                    if (angular.isArray(nodes)) {
                        columns.push(nodes);
                    }
                    if ((position + size) < columns.length) {
                        $timeout(function() { scope.move(1); });
                    }
                }

                /**
                 * Computes and returns the column position style according its
                 * index and the current view position.
                 *
                 * @param {number} columnIndex The column index.
                 * @returns {{width: string, left: string}}
                 */
                scope.style = function(columnIndex) {
                    var width = (100 / size),
                        left  = (columnIndex - position) * width;
                    return { width: width + '%', left: left + '%' };
                };

                /**
                 * Selects a node and loads its children if any.
                 *
                 * @param {number} columnIndex The column index.
                 * @param {number} nodeIndex The node index in column.
                 */
                scope.select = function(columnIndex, nodeIndex) {
                    var node = columns[columnIndex][nodeIndex];

                    // Remove obsolete columns and clear path.
                    if (columnIndex < columns.length - 1) {
                        columns.splice(columnIndex + 1, columns.length - columnIndex + 1);
                    }
                    if (columnIndex <= path.length - 1) {
                        path.splice(columnIndex, path.length - columnIndex);
                    }

                    // Call selection callback.
                    scope.onselect({ node: node, path: path });

                    // Add node in selection path.
                    path.push(node);

                    // Acquire node children if needed.
                    if (node.childCount) {
                        $q.when(scope.children({ node: node })).then(addColumn);
                    }
                };

                /**
                 * Moves the current view position.
                 *
                 * @param {number} delta The view position delta.
                 */
                scope.move = function(delta) {
                    position = Math.max(Math.min(position + delta, columns.length - size), 0);
                };
            },
            replace: true,
            template:
                '<div class="h-tree">' +
                    '<div class="h-tree-content">' +
                        '<div class="h-tree-columns">' +
                            '<div class="h-tree-column" ng-repeat="column in columns" ng-style="style($index)">' +
                                '<ion-scroll direction="y">' +
                                    '<ul>' +
                                        '<li class="h-tree-node" ng-repeat="node in column" ng-class="{active:path[$parent.$index]==node}" on-tap="select($parent.$index,$index)">' +
                                            '<span class="node-label">{{node.label}}</span>' +
                                            '<span class="node-count" ng-show="node.childCount">{{node.childCount}}</span>' +
                                        '</li>' +
                                    '</ul>' +
                                '</ion-scroll>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="h-tree-prev" ng-click="move(-1)"><i class="ion-chevron-left"></i></div>' +
                    '<div class="h-tree-next" ng-click="move(+1)"><i class="ion-chevron-right"></i></div>' +
                '</div>'
        };
    });