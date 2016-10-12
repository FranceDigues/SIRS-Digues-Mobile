angular.module('app.services.loading',[])
.factory('load',loadingFactory);

function loadingFactory(){
    return {
       state : true
    };

}