/**
 * Created by roch dardie on 11/05/15.
 */

require('oLayer');

//FIXME a reflechir !

var NON_AUTO_FILE_SYSTEM = "file:///storage/emulated/0/Android/data/com.ionic.Map03/files/Tile/";

/**
 * @constructor
 * @param {number, string, string, ol.sourceType, int[0-19], int[0-19], uri, array string, BBox en degree }
 *
 */
var oCacheDescriptor  = function(idf, nom, source, type , zMin , zMax, url, layer ,bbox ){
    this.idf = idf;
    this.nom= nom;
    this.source= source;
    this.type= type;
    this.zMin= zMin;
    this.zMax = zMax ;
    this.url = url ;
    this.bbox = bbox ;
}

oCacheDescriptor.prototype.getLayer=function(){

    return new oLayer(this.idf, false, this.nom, true, 0.6, new oSource("OSM", NON_AUTO_FILE_SYSTEM+this.source+"/"+this.nom+"/{z}/{x}/{y}.png"));

}