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
    this.name= param.name;

    this.path= param.path;

    this.zMin= param.zMin;
    this.zMax = param.zMax ;


    this.layerSource= param.layerSource;
    this.typeSource= param.typeSource;
    this.urlSource = param.urlSource ;

    if(param.hasOwnProperty('layers')) this.layers = param.layers;
    this.bbox = param.bbox ;
}



oCacheDescriptor.prototype.patch = function(CaDeObject ){
    angular.extend(this,CaDeObject);
}

oCacheDescriptor.prototype.getLayer=function(){

    console.log("ok")



//fixme multiLayers
    var olayer = new oLayer({idf:this.idf , active:false, name:this.name, isCache:true , opacity:0.6 , source :{type : "OSM", url : NON_AUTO_FILE_SYSTEM+this.path+"{z}/{x}/{y}.png"}});

    console.log(olayer);

    return olayer;


}