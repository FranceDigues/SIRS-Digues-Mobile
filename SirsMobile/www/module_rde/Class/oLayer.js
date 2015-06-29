/**
 * Created by roch dardie on 11/05/15.
 */

//require('oSource');
//require('oWmsParams');

/**
 * @constructor
 * @param {number, boolean, string, boolean, decimal precent , oSource }
 *
 */

    //TODO construction depuis un objet existant?
//var oLayer =
function oLayer(param){
        this.idf = param.idf;
        this.active= param.active;
        this.name= param.name;
        this.isCache= param.isCache;
        this.opacity= param.opacity;
        this.source = param.source ;

}


/**
 * @constructor
 * @param {oLayer }
 *
 */

//var oLayer =
oLayer.prototype.patch = function(layerObject){
    //this=layerObject;
    angular.extend(this,layerObject);
}


oLayer.prototype.equals=function(){

    return null;

}




