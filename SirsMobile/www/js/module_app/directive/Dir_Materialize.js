
angular.module('module_app.directives.materialize', [])

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
    });