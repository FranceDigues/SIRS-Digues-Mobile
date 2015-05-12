/**
 * Created by roch dardie on 11/05/15.
 */

//require('oWmsParams');


    /**
     * @constructor for TMS
     * @param {ol.SourceType, URI }
     *
     */

function oSource(type, uri){
        this.type= type;
        this.url= uri;
    }

    /**
     * @constructor for WMS
     * @param {ol.SourceType, URI, oWmsParams }
     *
     */

   function  oSource(type, uri, params){
        this.type= type;
        this.url= uri;
        this.params = params;
    }

    /**
     * @constructor for Bing
     * @param {ol.SourceType, URI, BingKey, imagerySet  }
     *
     */

    function  oSource(type, uri, key, imagerySet){
        this.type= type;
        this.url= uri;
        this.key = key;
        this.imagerySet = imagerySet;
    }


/**
 * @constructor
 * @param {oSource }
 *
 */

function  oSource(sourceObject){
    angular.extend(this,sourceObject);
}


