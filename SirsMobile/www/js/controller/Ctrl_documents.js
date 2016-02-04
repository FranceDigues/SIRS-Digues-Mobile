angular.module('app.controllers.documents', [])

    .controller('DocumentController', function DocumentController($q, $scope, $ionicPlatform, $cordovaFile) {

        var self = this;


        self.roots = [];

        self.children = function(node) {
            return visitDirectory(node._entry);
        };

        self.select = function(node) {
            if (!node.isDirectory) {
                window.cordova.plugins.FileOpener.openFile(node._entry.nativeURL);
            }
        };


        function visitDirectory(directory) {
            var deferred = $q.defer();

            directory.createReader().readEntries(function(entries) {
                var files = [];
                angular.forEach(entries, function(entry) {
                    files.push({
                        id: entry.fullPath,
                        label: entry.name,
                        childCount: 0,
                        isDirectory: entry.isDirectory,
                        _entry: entry
                    });
                });
                deferred.resolve(files);
            });

            return deferred.promise;
        }


        $ionicPlatform.ready(function() {
            $cordovaFile.checkDir(window.cordova.file.externalDataDirectory, 'documents').then(function(directory) {
                visitDirectory(directory).then(function(files) {
                    self.roots = files;
                });
            });
        }); // fill root documents when the device is ready
    });