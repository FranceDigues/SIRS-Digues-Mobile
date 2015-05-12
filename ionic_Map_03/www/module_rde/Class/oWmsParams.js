/**
 * Created by roch dardie on 11/05/15.
 */


/**
 * @constructor for TMS
 * @param {string }
 *
 */
//TODO expand
function oWmsParams(layers){
    this.LAYERS= layers;
}



/**
 * @constructor
 * @param {oWmsParams}
 *
 */
function oWmsParams(WmsParamsObject){
    angular.extend(this,WmsParamsObject);
}

