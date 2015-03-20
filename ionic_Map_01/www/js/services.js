/**
 * Created by harksin on 04/03/15.
 */
angular.module('hybridService', [])

.service('dbService', function(pouchDB) {
    this.dbEssai = pouchDB('mobile_hybride');

        PouchDB.sync('mobile_hybride','http://192.168.1.185:5984/mobile_hybride');

        //return mydb;

});


/*
var dragBox = new ol.interaction.DragBox({
    condition: ol.events.condition.shiftKeyOnly,
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: [0, 0, 255, 1]
        })
    })
});
map.addInteraction(dragBox);


dragBox.on('boxend', function(e) {

    //recup jeux de coordonnée
    CoordList =  dragBox.getGeometry().getCoordinates();

 netoyage de la couche

    vectorSourceHZ.clear();

 ajout du rectangle

    vectorSourceHZ.addFeature(
        new ol.Feature({
            geometry: dragBox.getGeometry()

        })
    );



    //supression du tableau inutile
    CoordList =  CoordList[0];
    //supression des point inutile (rest 3 pts)
    CoordList.pop();
    CoordList.pop();
    console.log(CoordList);



});*/
