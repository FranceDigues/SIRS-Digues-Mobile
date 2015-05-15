/**
 * Created by Roch Dardie on 15/03/15.
 */


//TODO supr apres control

angular.module('data.services', [])

    .service('sMap', function () {

        //choper les calque dans un json
        this.mode = {

            cache: false,
            edit: false,
            visu: true

        }
    });



