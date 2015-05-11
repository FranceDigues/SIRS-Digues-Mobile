/**
 * Created by roch dardie on 11/05/15.
 */

require('oSource');

/**
 * @constructor
 * @param {number, boolean, string, boolean, decimal precent , oSource }
 *
 */

    //TODO construction depuis un objet existant?
var oLayer = function(idf, active, name, isCache , opacity , source ){
    this.idf = idf;
        this.active= isCache;
        this.name= name;
        this.isCache= isCache;
        this.opacity= opacity;
        this.source = source ;

}

//