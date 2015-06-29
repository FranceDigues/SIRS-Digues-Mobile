/**
 * Created by roch dardie on 11/05/15.
 */

//require('oWmsParams');


    /**
     * @constructor for TMS
     * @param {ol.SourceType, URI }
     *
     */

function oSource(param){
        this.type= param.type;
        this.url= param.uri;

        if(param.type == "ImageWMS"){
            this.params = param.params;
        }if(param.type=="BingMaps"){
            this.key = param.key;
            this.imagerySet = param.imagerySet;
        }
    }

    ///**
    // * @constructor for WMS
    // * @param {ol.SourceType, URI, oWmsParams }
    // *
    // */
    //
    //oSource.prototype.WMSconstructor = function(type, uri, params){
    //    this.type= type;
    //    this.url= uri;
    //    this.params = params;
    //}
    //
    ///**
    // * @constructor for Bing
    // * @param {ol.SourceType, URI, BingKey, imagerySet  }
    // *
    // */
    //
    //oSource.prototype.BingConstructor = function(type, uri, key, imagerySet){
    //    this.type= type;
    //    this.url= uri;
    //    this.key = key;
    //    this.imagerySet = imagerySet;
    //}


/**
 * @constructor
 * @param {oSource }
 *
 */

oSource.prototype.patch = function(sourceObject){
    angular.extend(this,sourceObject);
}


