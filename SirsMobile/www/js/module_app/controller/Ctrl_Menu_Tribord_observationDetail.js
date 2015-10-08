
angular.module('module_app.controllers.menus.tribord.observationDetail', [])

    .controller('cObservationDetail', function cObservationDetail(sContext) {

        var self = this;

        self.backToDisorderDetails = function() {
            sContext.tribordView.active = 'objectDetail';
        };
    });