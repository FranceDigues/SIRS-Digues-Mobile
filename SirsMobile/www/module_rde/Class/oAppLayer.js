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
    this.realPosition= param.realPosition != null ? param.realPosition : true;
    this.visible= param.visible;
    this.editable= param.editable;
    this.selectable= param.selectable;

    this.order=param.order
    this.data = param.data != null ? param.data : [];

}


/**
 * @constructor
 * @param {oLayer }
 *
 */



oAppLayer.prototype.save=function(sPouch,$rootScope){
    var me =this;
    //todo save data in object by call all save method
    //todo chain resolve
    for(var i = 0; i< me.data.lenght; i++ ){
        sPouch.localDb.put(me.data[i]).then(function (res) {
    //validation
        }).catch(function (err) {
            // some error
        });
    }

}

oAppLayer.prototype.loadData=function(sPouch,$rootScope){
    console.log("loading data from : "+this.title);
    var me =this;

    sPouch.localDb.query(me.gIndex, {
        include_docs : true
    }).then(function (res) {

        me.data= res.rows;
        $rootScope.$broadcast("sAppLayer_LayerList_Update");
        console.log(res.rows);
        console.log(me);
    }).catch(function (err) {
        // some error
    });


}
