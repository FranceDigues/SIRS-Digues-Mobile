
angular.module('app.directives.materialize', [])

    .directive('mtSelect', function mtSelectDirective() {
        return {
            restrict: 'AE',
            link: function(scope, $element) {
                //$element.material_select();
                //
                //$element.on('$destroy', function() {
                //    $element.material_select('destroy');
                //});
            },
            transclude: true,
            replace: true,
            template: '<select ng-transclude></select>'
        }
    })

    .directive('mtPickadate', function mtSelectDirective() {
        return {
            restrict: 'AE',
            link: function(scope, $element) {
                $element.pickadate(angular.extend({
                    // Default options here.
                }, scope.$eval('mtPickadate')));
            },
            transclude: true,
            replace: true,
            template: '<select ng-transclude></select>'
        }
    });