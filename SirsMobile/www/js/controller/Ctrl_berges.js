/**
 * @ngdoc controller
 * @name BergeController
 *
 * @param {TrackerService} tracker
 * @param {Object} AuthService
 * @param {Object} LocalDocument
 * @param {Object} EditionService
 * @param {Object} SirsDoc
 * @this BergeController
 */
function BergeController(tracker, AuthService, LocalDocument, EditionService, SirsDoc) {

    var self = this;

    var dataProjection = SirsDoc.get().epsgCode;


    EditionService.getReferenceTypes().then(function(refs) {
        self.refs = refs;
    });


    self.tracking = (tracker.getStatus() === 'on');

    self.document = undefined;

    self.coordinates = [];

    self.refs = {};

    self.startTracking = startTracking;

    self.abortTracking = abortTracking;

    self.stopTracking = stopTracking;

    self.saveDocument = saveDocument;

    self.cancelDocument = cancelDocument;


    (function restoreTrackingState() {
        if (self.tracking) {
            self.coordinates = tracker.getCoordinates();
            tracker.getPromise().then(angular.noop, angular.noop, setCoordinates);
        }
    })();

    function startTracking() {
        self.coordinates = [];
        self.tracking = true;
        self.document = undefined;
        tracker.start().then(angular.noop, angular.noop, setCoordinates);
    }

    function abortTracking() {
        self.coordinates = [];
        self.tracking = false;
        tracker.stop();
    }

    function stopTracking() {
        self.tracking = false;
        self.document = {
            '@class': 'fr.sirs.core.model.TraitBerge',
            'auteur': AuthService.getValue()._id,
            'valid': false,
            'geometry': serializeCoordinates()
        };
        tracker.stop();
    }

    function saveDocument() {
        LocalDocument.create(self.document).then(function() {
            self.document = undefined;
        });
    }

    function cancelDocument() {
        self.document = undefined;
    }

    function setCoordinates(coordinates) {
        self.coordinates = coordinates;
    }

    function serializeCoordinates() {
        var geometry = (new ol.geom.LineString(self.coordinates)).transform(dataProjection, 'EPSG:3857');
        return (new ol.format.WKT()).writeGeometry(geometry);
    }
}

angular.module('app.controllers.berges', ['app.services.tracker'])
    .controller('BergeController', BergeController);