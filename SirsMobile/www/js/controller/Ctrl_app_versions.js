angular.module('app.controllers.app_versions', ['app.services.context', 'app.services.context'])
    .controller('VersionsMenu', VersionMenu);
function VersionMenu($http, SidePanelService) {
    var self = this;
    self.versions = {};
    self.setVersions = function () {
        $http.get('/android_asset/www/js/data/version.json').
            success(function (data, status, headers, config) {
                self.versions = data;
            }).
            error(function (data, status, headers, config) {
                console.error('an error occured during the recuparation of versions');
            });
    }

    self.setVersions();

    self.backToMenu = function () {
        SidePanelService.setBabordView('menu');
    };

}