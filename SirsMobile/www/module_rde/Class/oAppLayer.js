/**
 * Created by roch dardie on 10/07/15.
 */



//sample Param :
//{title:"",module="",categorie="",filterValue:"",gIndex:"",propVisible:false,visible:false,editable:false, selectable:false,order:null,data:null}
function oAppLayer(param){
    this.title = param.title;
    this.module  = param.module;
    this.categorie =param.categorie;
    this.filterValue= param.filterValue;
    this.gIndex =param.gIndex;


    this.propVisible=param.propVisible != null ? param.propVisible : false;
    this.realPosition=param.realPosition != null ? param.realPosition : true;
    this.visible= param.visible;
    this.editable= param.editable;
    this.selectable= param.selectable;

    this.order=param.order
    this.data = param.data;

}


/**
 * @constructor
 * @param {oLayer }
 *
 */



oAppLayer.prototype.save=function(){

    //todo save data in object by call all save method

    return null;

}
