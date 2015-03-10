angular.module('hybride_0.controllers', [])

.controller('MapCtrl', function($scope) {

        //var ctrl = this;

        //$scope.map = MapService;

        this.map = null;

        this.setup = function (m){
            this.map=m;
            console.log("m");
        }




    });



