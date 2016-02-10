/**
 * @ngdoc controller
 * @name BergeController
 *
 * @param {TrackerService} tracker
 * @param {Object} AuthService
 * @param {Object} LocalDocument
 * @param {Object} EditionService
 * @this BergeController
 */
function BergeController(tracker, AuthService, LocalDocument, EditionService) {

    var self = this;


    EditionService.getReferenceTypes().then(function(refs) {
        self.refs = refs;
    });


    self.tracking = (tracker.getStatus() === 'on');

    self.document = undefined;

    self.refs = {};

    self.startTracking = startTracking;

    self.abortTracking = abortTracking;

    self.stopTracking = stopTracking;

    self.saveDocument = saveDocument;


    function startTracking() {
        tracker.start();
        self.tracking = true;
        self.document = undefined;
    }

    function abortTracking() {
        tracker.stop();
        self.tracking = false;
    }

    function stopTracking() {
        var coordinates = tracker.stop();
        self.tracking = false;
        self.document = {
            '@class': 'fr.sirs.core.model.TraitBerge',
            'auteur': AuthService.getValue()._id,
            'valid': false,
            'geometry': serializeCoordinates(coordinates)
        };
    }

    function saveDocument() {
        LocalDocument.save(self.document).then(function() {
            self.document = undefined;
        });
    }

    function serializeCoordinates(coordinates) {
        var geometry = (new ol.geom.LineString(coordinates)).transform('EPSG:2154', 'EPSG:3857');
        return (new ol.format.WKT()).writeGeometry(geometry);
    }
}

angular.module('app.controllers.berges', ['app.services.tracker'])
    .controller('BergeController', BergeController);