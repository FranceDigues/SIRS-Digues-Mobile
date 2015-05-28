/**
 * Created by roch  dardie on 10/05/15.
 */

angular.module('filter.custom', [])

    .filter('activeLayer', function() {
        return function(input, RefList) {
            input = input || '';
            var out = null;


            //$.inArray(input., array)

            for (var i = 0; i < RefList.length; i++) {
                if (RefList[i].idf === obj.idf) {
                    obj.active = RefList[i].active;
                }
            }


            return obj;
        };
    })
;

