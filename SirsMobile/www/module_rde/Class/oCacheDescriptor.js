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
function oCacheDescriptor(param){
    this.idf = param.idf;
    this.nom= param.nom;
    this.Source= param.Source;
    this.path= param.path;
    this.typeSource= param.typeSource;
    this.zMin= param.zMin;
    this.zMax = param.zMax ;
    this.url = param.url ;
    this.bbox = param.bbox ;
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

    //var olayer = new oLayer(this.idf, false, this.nom, true, 0.6,{type : "OSM", url : NON_AUTO_FILE_SYSTEM+this.path+"{z}/{x}/{y}.png"} );
    var olayer = new oLayer({idf:this.idf , active:false, name:this.nom, isCache:true , opacity:0.6 , source :{type : "OSM", url : NON_AUTO_FILE_SYSTEM+this.path+"{z}/{x}/{y}.png"}});

    console.log(olayer);

    return olayer;


}