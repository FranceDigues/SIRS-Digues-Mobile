/**
 * Created by roch Dardie on 23/03/15.
 */
function asPolygon(pArray) {

    var coordArray = new Array();

    pArray.forEach(function (p) {
        coordArray.push(new Array(p.lon, p.lat));
    });


    coordArray.push(new Array(pArray[0].lon, pArray[0].lat)); //TODO methode de classe ou abandon du point.

    return new Array(coordArray);
}

function ArrayasPolygon(pArray) {

    var coordArray = new Array();

    //TODO clone
    pArray.forEach(function (p) {
        coordArray.push(p);
    });

    coordArray.push(pArray[0]);


    //coordArray.push( new Array(pArray[0].lon, pArray[0].lat) ); //TODO methode de classe ou abandon du point.

    return new Array(coordArray);
}

function ringBuilder(p1, p2) {

    var coordArray = new Array();

//verif sens
    coordArray.push(new Array(p1.lon, p1.lat));
    coordArray.push(new Array(p1.lon, p2.lat));
    coordArray.push(new Array(p2.lon, p2.lat));
    coordArray.push(new Array(p2.lon, p1.lat));
    coordArray.push(new Array(p1.lon, p1.lat));


    return new Array(coordArray);
}

function geomBuilder(pa, pb) {
    console.log("ringBuilder")
    console.log([[[pa, [pa[0], pb[1]], pb, [pb[0], pa[1]], pa]]]);
    console.log(new ol.geom.Polygon([[[pa, [pa[0], pb[1]], pb, [pb[0], pa[1]], pa]]]));

    //return new ol.geom.Polygon([[[pa,[pa[0],pb[1]],pb,[pb[0],pa[1]],pa]]]);
    return new ol.geom.Polygon(pOktmp);

};


//function getTileURL(lon, lat, zoom) {
//    //$log.debug("inputGetURl [lat :"+lat+" lon :"+lon+" zoom : "+zoom+" ]");
//
//    var xtile = parseInt(Math.floor((lon + 180) / 360 * (1 << zoom)));
//    var ytile = parseInt(Math.floor((1 - Math.log(Math.tan(lat.toRad()) + 1 / Math.cos(lat.toRad())) / Math.PI) / 2 * (1 << zoom)));
//
//    tileUrl = {"z": zoom, "x": xtile, "y": ytile}; //objet pour manipuler les coord de tuile z/x/y
//    //TODO faire un vrai objet avec de proto compare
//    //TODO etudier les objets  JS
//    return tileUrl;
//}


/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function () {
        return this * Math.PI / 180;
    }
}


function toGeoJson(f) {
    return new ol.format.GeoJSON().writeFeatures(f.getFeatures().getArray());
}

function atoGeoJson(s) {
    console.log(s.getFeatures().length)
    if (s.getFeatures().length > 1) {
        return new ol.format.GeoJSON().writeFeatures(s.getFeatures());
    }else {
        return [new ol.format.GeoJSON().writeFeatures(s.getFeatures())];
    }
}

//
//me.layersTreeIterator = function(sirsDef, leafCallBack, NodeCallBack){
//
//
//
//    var recFunc = function(itemArray, glen){
//
//        angular.forEach(itemArray, function(item) {
//            if (item.hasOwnProperty("children")) {
//                recFunc(item.children);
//                if(NodeCallBack != null) NodeCallBack(item);
//            }else{
//                glen-1;
//                if(leafCallBack != null) leafCallBack(item);
//            };
//        });
//        if(one) $log.debug(sirsDef);
//    }
//
//
//    recFunc(sirsDef, sirsDef.length);
//}

var ARRAY_DEF_ZOOM_LVL = [
    {lvl: 0, deg: 360, ratio: 156412},

    {lvl: 1, deg: 180, ratio: 78206},
    {lvl: 2, deg: 90, ratio: 39103},

    {lvl: 3, deg: 45, ratio: 19551},
    {lvl: 4, deg: 22.5, ratio: 9776},

    {lvl: 5, deg: 11.25, ratio: 4888},
    {lvl: 6, deg: 5.625, ratio: 2444},
    {lvl: 7, deg: 2.813, ratio: 1222},
    {lvl: 8, deg: 1.406, ratio: 610},
    {lvl: 9, deg: 0.703, ratio: 305},
    {lvl: 10, deg: 0.352, ratio: 153},

    {lvl: 11, deg: 0.176, ratio: 76},

    {lvl: 12, deg: 0.088, ratio: 38},

    {lvl: 13, deg: 0.044, ratio: 19},
    {lvl: 14, deg: 0.022, ratio: 9.547},
    {lvl: 15, deg: 0.011, ratio: 4.773},
    {lvl: 16, deg: 0.005, ratio: 2.387},
    {lvl: 17, deg: 0.003, ratio: 1.193},
    {lvl: 18, deg: 0.001, ratio: 0.596},
    {lvl: 19, deg: 0.0005, ratio: 0.298}
]

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}