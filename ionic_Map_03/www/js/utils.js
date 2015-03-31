/**
 * Created by roch Dardie on 23/03/15.
 */
function asPolygon(pArray){

    var coordArray = new Array();

    pArray.forEach(function(p){
        coordArray.push(new Array(p.lon, p.lat));
    });


    coordArray.push( new Array(pArray[0].lon, pArray[0].lat) ); //TODO methode de classe ou abandon du point.

    return new Array(coordArray);
}

function ringBuilder(p1,p2){

    var coordArray = new Array();

//verif sens
    coordArray.push(new Array(p1.lon, p1.lat));
    coordArray.push(new Array(p1.lon, p2.lat));
    coordArray.push(new Array(p2.lon, p2.lat));
    coordArray.push(new Array(p2.lon, p1.lat));
    coordArray.push(new Array(p1.lon, p1.lat));



    return new Array(coordArray);
}

function geomBuilder(pa,pb){
    console.log("ringBuilder")
    console.log([[[pa,[pa[0],pb[1]],pb,[pb[0],pa[1]],pa]]]);
    console.log(new ol.geom.Polygon([[[pa,[pa[0],pb[1]],pb,[pb[0],pa[1]],pa]]]));

    //return new ol.geom.Polygon([[[pa,[pa[0],pb[1]],pb,[pb[0],pa[1]],pa]]]);
    return new ol.geom.Polygon(pOktmp);

};


function getEG(vertexList){

    var minMAx =[[0,0],[0,0]];

    vertexList.forEach(function(v){
        if(v[0] < minMAx[0][0] ) minMAx[0][0] = v[0];
        if(v[0] > minMAx[1][0] ) minMAx[1][0] = v[0];
        if(v[1] < minMAx[0][1] ) minMAx[0][1] = v[0];
        if(v[1] > minMAx[1][1] ) minMAx[1][1] = v[0];
    });

    return miniMax;
}

function getEC(){ //gift paper algo

}