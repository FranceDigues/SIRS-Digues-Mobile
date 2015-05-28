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
    return new ol.format.GeoJSON().writeFeatures(s.getFeatures());
}
