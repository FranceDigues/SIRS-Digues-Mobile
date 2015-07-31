
angular.module('module_app.controllers.form', [])

    .controller('cForm', function cForm($ionicScrollDelegate) {

        var self = this;

        self.activeTab = 'description';

        self.setActiveTab = function(name) {
            if (name !== self.activeTab) {
                self.activeTab = name;
                $ionicScrollDelegate.$getByHandle('formScroll').scrollTop(false);
            }
        };
    });