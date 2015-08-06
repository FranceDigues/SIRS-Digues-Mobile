/**
 * Created by roch dardie on 10/07/15.
 */

function createIconStyle() {
    return new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 1],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            opacity: 0.90,
            src: './img/icon.png'
        })
    });
}

function createPointStyle(color, text) {
    var options = {
        image: new ol.style.Circle({
            radius: 10,
            fill: new ol.style.Fill({
                color: color,
                opacity: 0.6
            }),
            stroke: new ol.style.Stroke({
                color: 'white',
                opacity: 0.4
            })
        })
    };
    if ( text ) {
        options.text = new ol.style.Text({
            text: text,
            fill: new ol.style.Fill({
                color: 'white'
            })
        });
    }
    return new ol.style.Style(options);
}

function getStyle(feature) {
    // Take car we use clustering, thus possibly have multiple features in one
    var features = feature.get('features');
    var style = null;
    //var style = createIconStyle();
    // Icon base style ?
    //if ( $scope.icon ) {
    //    style = createIconStyle()
    //}


    // Circle + txt base style
    // Add number of clustered item in this case
    if ( features && features.length > 1 ) {
        style = createPointStyle('blue', features.length.toFixed());
    } else {
        style = createPointStyle('blue');
    }
    return [ style ];
}


//sample Param :
//{title:"",module="",categorie="",filterValue:"",gIndex:"",propVisible:false,visible:false,editable:false, selectable:false,order:null,data:null}
function oAppLayer(param){
    this.title = param.title;
    this.module  = param.module;
    this.categorie =param.categorie;
    this.filterValue= param.filterValue;

    //clusturing value
    this.clustering = false;
    this.clusteringDistance= 40;
    //this.style= getStyle;


    //layer ol propertie
    this.source= { type: 'Vector' };
    this.gIndex =param.gIndex;


    //layer display properties
    this.propVisible=param.propVisible != null ? param.propVisible : false;
    this.realPosition= param.realPosition != null ? param.realPosition : true;
    this.fav= param.fav != null ? param.fav : false;
    this.favori= false; //TODO inject user Data
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




