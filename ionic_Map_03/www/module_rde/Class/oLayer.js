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
function oLayer(idf, active, name, isCache , opacity , source ){
    this.idf = idf;
        this.active= isCache;
        this.name= name;
        this.isCache= isCache;
        this.opacity= opacity;
        this.source = source ;

}


/**
 * @constructor
 * @param {oLayer }
 *
 */

//var oLayer =
function oLayer(layerObject){
    //this=layerObject;
    angular.extend(this,layerObject);
}


oLayer.prototype.equals=function(){

    return null;

}




