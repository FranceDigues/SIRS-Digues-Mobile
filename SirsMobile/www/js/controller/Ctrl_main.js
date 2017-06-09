angular.module('app.controllers.main', ['app.services.context','app.services.dao'])

    .controller('MainController', function MainController($location, $ionicSideMenuDelegate,
                                                          sirsDoc, AuthService, SidePanelService,
                                                          $scope,$rootScope, $ionicLoading, AppLayersService, $interval,
                                                          EditionService,MapManager,$cordovaToast,
                                                          $ionicPlatform, GeolocationService, $window,PouchService) {

        var self = this;

        var plugins = Object.keys(sirsDoc.moduleDescriptions);

        proj4.defs(sirsDoc.epsgCode, sirsDoc.proj4);

        //proj4.defs('CRS:84', 'GEOGCS["WGS 84", DATUM["World Geodetic System 1984", SPHEROID["WGS 84", 6378137.0, 298.257223563]], PRIMEM["Greenwich", 0.0], UNIT["degree", 0.017453292519943295], AXIS["Longitude", EAST], AXIS["Latitude", NORTH], AUTHORITY["CRS", "84"]]');
        //proj4.defs('EPSG:3395', 'PROJCS["WGS 84 / World Mercator", GEOGCS["WGS 84", DATUM["World Geodetic System 1984", SPHEROID["WGS 84", 6378137.0, 298.257223563]], PRIMEM["Greenwich", 0.0], UNIT["degree", 0.017453292519943295], AXIS["Latitude", NORTH], AXIS["Longitude", EAST]], PROJECTION["Mercator_1SP", AUTHORITY["EPSG", "9804"]], PARAMETER["latitude_of_origin", 0.0], PARAMETER["central_meridian", 0.0], PARAMETER["scale_factor", 1.0], PARAMETER["false_easting", 0.0], PARAMETER["false_northing", 0.0], UNIT["meter", 1], AXIS["Easting", EAST], AXIS["Northing", NORTH], AUTHORITY["EPSG", "3395"]]');
        //proj4.defs('EPSG:3945', 'PROJCS["RGF93 / CC45", GEOGCS["RGF93", DATUM["Reseau Geodesique Francais 1993", SPHEROID["GRS 1980", 6378137.0, 298.257222101], TOWGS84[0.0, 0.0, 0.0]], PRIMEM["Greenwich", 0.0], UNIT["degree", 0.017453292519943295], AXIS["Latitude", NORTH], AXIS["Longitude", EAST]], PROJECTION["Lambert_Conformal_Conic_2SP", AUTHORITY["EPSG", "9802"]], PARAMETER["latitude_of_origin", 45.0], PARAMETER["central_meridian", 3.0], PARAMETER["standard_parallel_1", 44.25], PARAMETER["standard_parallel_2", 45.75], PARAMETER["false_easting", 1700000.0], PARAMETER["false_northing", 4200000.0], UNIT["meter", 1], AXIS["Easting", EAST], AXIS["Northing", NORTH], AUTHORITY["EPSG", "3945"]]');
        //proj4.defs('EPSG:2154', 'PROJCS["RGF93 / Lambert-93", GEOGCS["RGF93", DATUM["Reseau Geodesique Francais 1993", SPHEROID["GRS 1980", 6378137.0, 298.257222101], TOWGS84[0.0, 0.0, 0.0]], PRIMEM["Greenwich", 0.0], UNIT["degree", 0.017453292519943295], AXIS["Latitude", NORTH], AXIS["Longitude", EAST]], PROJECTION["Lambert_Conformal_Conic_2SP", AUTHORITY["EPSG", "9802"]], PARAMETER["latitude_of_origin", 46.5], PARAMETER["central_meridian", 3.0], PARAMETER["standard_parallel_1", 49.0], PARAMETER["standard_parallel_2", 44.0], PARAMETER["false_easting", 700000.0], PARAMETER["false_northing", 6600000.0], UNIT["meter", 1], AXIS["Easting", EAST], AXIS["Northing", NORTH], AUTHORITY["EPSG", "2154"]]');
        //proj4.defs('EPSG:4275', 'GEOGCS["NTF", DATUM["Nouvelle Triangulation Francaise", SPHEROID["Clarke 1880 (IGN)", 6378249.2, 293.4660212936269], TOWGS84[-168.0, -60.0, 320.0]], PRIMEM["Greenwich", 0.0], UNIT["degree", 0.017453292519943295], AXIS["Latitude", NORTH], AXIS["Longitude", EAST], AUTHORITY["EPSG", "4275"]]');
        //proj4.defs('EPSG:4807', 'GEOGCS["NTF (Paris)", DATUM["Nouvelle Triangulation Francaise (Paris)", SPHEROID["Clarke 1880 (IGN)", 6378249.2, 293.4660212936269]], PRIMEM["Paris", 2.33722917], UNIT["grade", 0.015707963267948967], AXIS["Latitude", NORTH], AXIS["Longitude", EAST], AUTHORITY["EPSG", "4807"]]');
        //proj4.defs('EPSG:7400', 'COMPD_CS["NTF (Paris) + NGF IGN69 height", GEOGCS["NTF (Paris)", DATUM["Nouvelle Triangulation Francaise (Paris)", SPHEROID["Clarke 1880 (IGN)", 6378249.2, 293.4660212936269]], PRIMEM["Paris", 2.33722917], UNIT["grade", 0.015707963267948967], AXIS["Latitude", NORTH], AXIS["Longitude", EAST], AUTHORITY["EPSG", "4807"]], VERT_CS["NGF IGN69 height", VERT_DATUM["Nivellement General de la France - IGN69", 2005], UNIT["meter", 1], AXIS["Gravity-related height", UP], AUTHORITY["EPSG", "5720"]], AUTHORITY["EPSG", "7400"]]');
        //proj4.defs('EPSG:27562', 'PROJCS["NTF (Paris) / Lambert Centre France", GEOGCS["NTF (Paris)", DATUM["Nouvelle Triangulation Francaise (Paris)", SPHEROID["Clarke 1880 (IGN)", 6378249.2, 293.4660212936269]], PRIMEM["Paris", 2.33722917], UNIT["grade", 0.015707963267948967], AXIS["Latitude", NORTH], AXIS["Longitude", EAST]], PROJECTION["Lambert_Conformal_Conic_1SP", AUTHORITY["EPSG", "9801"]], PARAMETER["latitude_of_origin", 46.8], PARAMETER["central_meridian", 0.0], PARAMETER["scale_factor", 0.99987742], PARAMETER["false_easting", 600000.0], PARAMETER["false_northing", 200000.0], UNIT["meter", 1], AXIS["Easting", EAST], AXIS["Northing", NORTH], AUTHORITY["EPSG", "27562"]]');
        //proj4.defs('EPSG:27564', 'PROJCS["NTF (Paris) / Lambert Corse", GEOGCS["NTF (Paris)", DATUM["Nouvelle Triangulation Francaise (Paris)", SPHEROID["Clarke 1880 (IGN)", 6378249.2, 293.4660212936269]], PRIMEM["Paris", 2.33722917], UNIT["grade", 0.015707963267948967], AXIS["Latitude", NORTH], AXIS["Longitude", EAST]], PROJECTION["Lambert_Conformal_Conic_1SP", AUTHORITY["EPSG", "9801"]], PARAMETER["latitude_of_origin", 42.165], PARAMETER["central_meridian", 0.0], PARAMETER["scale_factor", 0.99994471], PARAMETER["false_easting", 234.358], PARAMETER["false_northing", 185861.369], UNIT["meter", 1], AXIS["Easting", EAST], AXIS["Northing", NORTH], AUTHORITY["EPSG", "27564"]]');
        //proj4.defs('EPSG:27561', 'PROJCS["NTF (Paris) / Lambert Nord France", GEOGCS["NTF (Paris)", DATUM["Nouvelle Triangulation Francaise (Paris)", SPHEROID["Clarke 1880 (IGN)", 6378249.2, 293.4660212936269]], PRIMEM["Paris", 2.33722917], UNIT["grade", 0.015707963267948967], AXIS["Latitude", NORTH], AXIS["Longitude", EAST]], PROJECTION["Lambert_Conformal_Conic_1SP", AUTHORITY["EPSG", "9801"]], PARAMETER["latitude_of_origin", 49.5], PARAMETER["central_meridian", 0.0], PARAMETER["scale_factor", 0.999877341], PARAMETER["false_easting", 600000.0], PARAMETER["false_northing", 200000.0], UNIT["meter", 1], AXIS["Easting", EAST], AXIS["Northing", NORTH], AUTHORITY["EPSG", "27561"]]');
        //proj4.defs('EPSG:27563', 'PROJCS["NTF (Paris) / Lambert Sud France", GEOGCS["NTF (Paris)", DATUM["Nouvelle Triangulation Francaise (Paris)", SPHEROID["Clarke 1880 (IGN)", 6378249.2, 293.4660212936269]], PRIMEM["Paris", 2.33722917], UNIT["grade", 0.015707963267948967], AXIS["Latitude", NORTH], AXIS["Longitude", EAST]], PROJECTION["Lambert_Conformal_Conic_1SP", AUTHORITY["EPSG", "9801"]], PARAMETER["latitude_of_origin", 44.1], PARAMETER["central_meridian", 0.0], PARAMETER["scale_factor", 0.999877499], PARAMETER["false_easting", 600000.0], PARAMETER["false_northing", 200000.0], UNIT["meter", 1], AXIS["Easting", EAST], AXIS["Northing", NORTH], AUTHORITY["EPSG", "27563"]]');
        //proj4.defs('EPSG:27571', 'PROJCS["NTF (Paris) / Lambert zone I", GEOGCS["NTF (Paris)", DATUM["Nouvelle Triangulation Francaise (Paris)", SPHEROID["Clarke 1880 (IGN)", 6378249.2, 293.4660212936269]], PRIMEM["Paris", 2.33722917], UNIT["grade", 0.015707963267948967], AXIS["Latitude", NORTH], AXIS["Longitude", EAST]], PROJECTION["Lambert_Conformal_Conic_1SP", AUTHORITY["EPSG", "9801"]], PARAMETER["latitude_of_origin", 49.5], PARAMETER["central_meridian", 0.0], PARAMETER["scale_factor", 0.999877341], PARAMETER["false_easting", 600000.0], PARAMETER["false_northing", 1200000.0], UNIT["meter", 1], AXIS["Easting", EAST], AXIS["Northing", NORTH], AUTHORITY["EPSG", "27571"]]');
        //proj4.defs('EPSG:27572', 'PROJCS["NTF (Paris) / Lambert zone II", GEOGCS["NTF (Paris)", DATUM["Nouvelle Triangulation Francaise (Paris)", SPHEROID["Clarke 1880 (IGN)", 6378249.2, 293.4660212936269]], PRIMEM["Paris", 2.33722917], UNIT["grade", 0.015707963267948967], AXIS["Latitude", NORTH], AXIS["Longitude", EAST]], PROJECTION["Lambert_Conformal_Conic_1SP", AUTHORITY["EPSG", "9801"]], PARAMETER["latitude_of_origin", 46.8], PARAMETER["central_meridian", 0.0], PARAMETER["scale_factor", 0.99987742], PARAMETER["false_easting", 600000.0], PARAMETER["false_northing", 2200000.0], UNIT["meter", 1], AXIS["Easting", EAST], AXIS["Northing", NORTH], AUTHORITY["EPSG", "27572"]]');
        //proj4.defs('EPSG:7421', 'COMPD_CS["NTF (Paris) / Lambert zone II + NGF IGN69 height", PROJCS["NTF (Paris) / Lambert zone II", GEOGCS["NTF (Paris)", DATUM["Nouvelle Triangulation Francaise (Paris)", SPHEROID["Clarke 1880 (IGN)", 6378249.2, 293.4660212936269]], PRIMEM["Paris", 2.33722917], UNIT["grade", 0.015707963267948967], AXIS["Latitude", NORTH], AXIS["Longitude", EAST]], PROJECTION["Lambert_Conformal_Conic_1SP", AUTHORITY["EPSG", "9801"]], PARAMETER["latitude_of_origin", 46.8], PARAMETER["central_meridian", 0.0], PARAMETER["scale_factor", 0.99987742], PARAMETER["false_easting", 600000.0], PARAMETER["false_northing", 2200000.0], UNIT["meter", 1], AXIS["Easting", EAST], AXIS["Northing", NORTH], AUTHORITY["EPSG", "27572"]], VERT_CS["NGF IGN69 height", VERT_DATUM["Nivellement General de la France - IGN69", 2005], UNIT["meter", 1], AXIS["Gravity-related height", UP], AUTHORITY["EPSG", "5720"]], AUTHORITY["EPSG", "7421"]]');
        //proj4.defs('EPSG:7411', 'COMPD_CS["NTF (Paris) / Lambert zone II + NGF Lallemand height", PROJCS["NTF (Paris) / Lambert zone II", GEOGCS["NTF (Paris)", DATUM["Nouvelle Triangulation Francaise (Paris)", SPHEROID["Clarke 1880 (IGN)", 6378249.2, 293.4660212936269]], PRIMEM["Paris", 2.33722917], UNIT["grade", 0.015707963267948967], AXIS["Latitude", NORTH], AXIS["Longitude", EAST]], PROJECTION["Lambert_Conformal_Conic_1SP", AUTHORITY["EPSG", "9801"]], PARAMETER["latitude_of_origin", 46.8], PARAMETER["central_meridian", 0.0], PARAMETER["scale_factor", 0.99987742], PARAMETER["false_easting", 600000.0], PARAMETER["false_northing", 2200000.0], UNIT["meter", 1], AXIS["Easting", EAST], AXIS["Northing", NORTH], AUTHORITY["EPSG", "27572"]], VERT_CS["NGF Lallemand height", VERT_DATUM["Nivellement General de la France - Lallemand", 2005], UNIT["meter", 1], AXIS["Gravity-related height", UP], AUTHORITY["EPSG", "5719"]], AUTHORITY["EPSG", "7411"]]');
        //proj4.defs('EPSG:27573', 'PROJCS["NTF (Paris) / Lambert zone III", GEOGCS["NTF (Paris)", DATUM["Nouvelle Triangulation Francaise (Paris)", SPHEROID["Clarke 1880 (IGN)", 6378249.2, 293.4660212936269]], PRIMEM["Paris", 2.33722917], UNIT["grade", 0.015707963267948967], AXIS["Latitude", NORTH], AXIS["Longitude", EAST]], PROJECTION["Lambert_Conformal_Conic_1SP", AUTHORITY["EPSG", "9801"]], PARAMETER["latitude_of_origin", 44.1], PARAMETER["central_meridian", 0.0], PARAMETER["scale_factor", 0.999877499], PARAMETER["false_easting", 600000.0], PARAMETER["false_northing", 3200000.0], UNIT["meter", 1], AXIS["Easting", EAST], AXIS["Northing", NORTH], AUTHORITY["EPSG", "27573"]]');
        //proj4.defs('EPSG:7422', 'COMPD_CS["NTF (Paris) / Lambert zone III + NGF IGN69 height", PROJCS["NTF (Paris) / Lambert zone III", GEOGCS["NTF (Paris)", DATUM["Nouvelle Triangulation Francaise (Paris)", SPHEROID["Clarke 1880 (IGN)", 6378249.2, 293.4660212936269]], PRIMEM["Paris", 2.33722917], UNIT["grade", 0.015707963267948967], AXIS["Latitude", NORTH], AXIS["Longitude", EAST]], PROJECTION["Lambert_Conformal_Conic_1SP", AUTHORITY["EPSG", "9801"]], PARAMETER["latitude_of_origin", 44.1], PARAMETER["central_meridian", 0.0], PARAMETER["scale_factor", 0.999877499], PARAMETER["false_easting", 600000.0], PARAMETER["false_northing", 3200000.0], UNIT["meter", 1], AXIS["Easting", EAST], AXIS["Northing", NORTH], AUTHORITY["EPSG", "27573"]], VERT_CS["NGF IGN69 height", VERT_DATUM["Nivellement General de la France - IGN69", 2005], UNIT["meter", 1], AXIS["Gravity-related height", UP], AUTHORITY["EPSG", "5720"]], AUTHORITY["EPSG", "7422"]]');
        //proj4.defs('EPSG:27574', 'PROJCS["NTF (Paris) / Lambert zone IV", GEOGCS["NTF (Paris)", DATUM["Nouvelle Triangulation Francaise (Paris)", SPHEROID["Clarke 1880 (IGN)", 6378249.2, 293.4660212936269]], PRIMEM["Paris", 2.33722917], UNIT["grade", 0.015707963267948967], AXIS["Latitude", NORTH], AXIS["Longitude", EAST]], PROJECTION["Lambert_Conformal_Conic_1SP", AUTHORITY["EPSG", "9801"]], PARAMETER["latitude_of_origin", 42.165], PARAMETER["central_meridian", 0.0], PARAMETER["scale_factor", 0.99994471], PARAMETER["false_easting", 234.358], PARAMETER["false_northing", 4185861.369], UNIT["meter", 1], AXIS["Easting", EAST], AXIS["Northing", NORTH], AUTHORITY["EPSG", "27574"]]');

        self.logout = AuthService.logout;

        self.setBabordView = SidePanelService.setBabordView;

        self.getBabordView = SidePanelService.getBabordView;

        self.setTribordView = SidePanelService.setTribordView;

        self.getTribordView = SidePanelService.getTribordView;

        self.menuDelegate = $ionicSideMenuDelegate;

        self.hasBergePlugin = hasPlugin.bind(self, 'plugin-berge');

        //@hb use an object reference to prevent the problem of the new scope generated by ng-include

        //@hb
        var visible = false;

        for (var i=0; i < AppLayersService.getFavorites().length; i++) {
            if(AppLayersService.getFavorites()[i].visible == true) {
                visible = true;
                break;
            }
        }

        if(angular.isUndefined($rootScope.loadingflag) && visible){
            $rootScope.loadingflag = true;
        }

        self.ionicLoading;
        // @hb
        $rootScope.$watch(function(){
            return $rootScope.loadingflag;
        }, function(){
                // var ionicLoading;
                if($rootScope.loadingflag){
                    self.ionicLoading = $ionicLoading.show({
                        template: 'Chargement...'
                    });
                }
                else {
                    $ionicLoading.hide();
                }
            });

        // @hb
        self.editionModeFlag = $rootScope.editionModeFlag;
            $rootScope.$watch(function(){
            return $rootScope.editionModeFlag;
        }, function(){
                self.editionModeFlag = $rootScope.editionModeFlag;
            });

        function hasPlugin(plugin) {
            return plugins.indexOf(plugin) !== -1;
        }

        self.gpsAccuracy=0;

        //@hb Watch the gps location

        GeolocationService.trackLocation().then(angular.noop, angular.noop, function (position) {
            self.gpsAccuracy = Math.round(position.coords.accuracy);
        });

        // Add a handler for cordova event types
        // $ionicPlatform.on();

        /** Add listener to the pause event
         * The pause event fires when the native platform puts the application into the background,
         * typically when the user switches to a different application.
         */


        //@hb add an Event listener for the online/offline events

        var offlineHandler = function() {
                $rootScope.$apply(function() {
                    $rootScope.online = false;
                    $cordovaToast
                        .showLongTop('La connexion est échoué');
                });
            };

        var onlineHandler = function() {
            $rootScope.$apply(function() {
                $rootScope.online = true;
                $cordovaToast
                    .showLongTop('Connexion établie avec succès');
            });
        };

        $rootScope.online = navigator.onLine;

        $window.addEventListener("offline", offlineHandler, false);

        $window.addEventListener("online", onlineHandler, false);


        $ionicPlatform.on("pause",function (event) {
            GeolocationService.stop();
            $rootScope.online = undefined;
            $window.removeEventListener("offline", offlineHandler, false);
            $window.removeEventListener("online", onlineHandler, false);
        });

        $ionicPlatform.on("resume",function (event) {
            GeolocationService.start();
            $rootScope.online = navigator.onLine;
            $window.addEventListener("offline", offlineHandler, false);
            $window.addEventListener("online", onlineHandler, false);
        });

        //Handle the Hardware BackButton
        $ionicPlatform.onHardwareBackButton(function(event) {
            GeolocationService.stop();
            $rootScope.online = undefined;
            $window.removeEventListener("offline", offlineHandler, false);
            $window.removeEventListener("online", onlineHandler, false);
        });

        //@hb
        self.EditionService = EditionService;


    });