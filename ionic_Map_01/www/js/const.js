/**
 * Created by harksin on 18/03/15.
 */


var gjsonCbStart = '{"source": {' +
    ' "type": "GeoJSON",' +
    '        "geojson": {' +
    '        "object": {' +
    '            "type": "FeatureCollection",' +
    '                "features": [' +
    '            {' +
    '                "type": "Feature",' +
    '                "id": "cacheBox",' +
    '                "properties": {' +
    '                "name": "cacheBox"' +
    '            },' +
    '                "geometry": {' +
    '                "type": "Polygon",' +
    '                    "coordinates": [[';

var gjsonCbEnd = '  ]]' +
    '}' +
    '}]' +
    '},' +
    '"projection": "EPSG:3857"' +
    '}' +
    '},' +
    '"style": { ' +
    '   "fill": {' +
    '        "color": "rgba(255, 0, 0, 0.6)"' +
    '    }, ' +
    '   "stroke": {' +
    '        "color": "white",' +
    '            "width": 3' +
    '    }' +
    '},' +
    '"visible": true,' +
    '    "opacity": 1' +
    '}';

var tt = {"source": { "type": "GeoJSON",        "geojson": {        "object": {            "type": "FeatureCollection",                "features": [            {                "type": "Feature",                "id": "cacheBox",                "properties": {                "name": "cacheBox"            },                "geometry": {                "type": "Polygon",                    "coordinates": [[[-120.313,33.118],[-109.766,20.281],[-87.617,32.823],[-101.504,51.385],[-121.895,51.385],[-129.453,46.784],[-120.313,33.118]  ]]}}]},"projection": "EPSG:3857"}},"style": {    "fill": {        "color": "rgba(255, 0, 0, 0.6)"    },    "stroke": {        "color": "white",            "width": 3    }},"visible": true,    "opacity": 0.6};


var pititPath = "[[[-111.172,40.429],[-107.305,30.277],[-91.66,41.754],[-100.625,49.709]]]";
var pititPath2 = "[[[-111.172,40.429],[-107.305,30.277],[-91.66,41.754],[-100.625,49.709]]]";


var tt_ok0 = {"source":
{ "type": "GeoJSON",
    "geojson": {
        "object": {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "id": "cacheBox",
                    "properties": {
                        "name": "cacheBox"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates":[[
                            [-111.172,40.429],[-107.305,30.277],[-91.66,41.754],[-100.625,49.709],[-111.172,40.429]
                        ]]
                    }}]},"projection": "EPSG:3857"}},"style": {    "fill": {        "color": "rgba(255, 0, 0, 0.6)"    },    "stroke": {        "color": "white",            "width": 3    }},"visible": true,    "opacity": 1};

