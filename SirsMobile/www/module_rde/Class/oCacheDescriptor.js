/**
 * Created by roch dardie on 11/05/15.
 */

//require('oLayer');
//require('oSource');
//require('oWmsParams');

//FIXME a reflechir !

var NON_AUTO_FILE_SYSTEM = "file:///storage/emulated/0/Android/data/com.ionic.Map03/files/";

/**
 * @constructor
 * @param {number, string, string, ol.sourceType, int[0-19], int[0-19], uri, array string, BBox en degree }
 *
 */
function oCacheDescriptor(idf, nom, Source,path, typeSource , zMin , zMax, url, layer ,bbox ){
    this.idf = idf;
    this.nom= nom;
    this.Source= Source;
    this.path= path;
    this.typeSource= typeSource;
    this.zMin= zMin;
    this.zMax = zMax ;
    this.url = url ;
    this.bbox = bbox ;
}

oCacheDescriptor.prototype.patch = function(CaDeObject ){
    angular.extend(this,CaDeObject);
}

oCacheDescriptor.prototype.getLayer=function(){

    //FIXME pk l'attribut s'appel nom au liex de name???
    //FIXME constructeur de' oSource

    //var src = new oSource("OSM",NON_AUTO_FILE_SYSTEM+this.source+"/"+this.nom+"/{z}/{x}/{y}.png");
    //console.log(src);
    //return new oLayer(this.idf, false, this.nom, true, 0.6, src);
    console.log("ok")

    var olayer = new oLayer(this.idf, false, this.nom, true, 0.6, {type : "OSM", url : NON_AUTO_FILE_SYSTEM+this.path+"{z}/{x}/{y}.png"});

    console.log(olayer);

    return olayer;


}