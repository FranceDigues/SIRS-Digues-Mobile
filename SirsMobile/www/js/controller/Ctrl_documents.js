angular.module('app.controllers.documents', [])

    .controller('DocumentController', function DocumentController($q, $scope, $ionicPlatform, $cordovaFile, LocalDocument) {

        var self = this;

        var selected = undefined;


        self.roots = [];

        self.fileDoc = undefined;

        self.children = function(node) {
            return visitDirectory(node._entry);
        };

        self.select = function(node) {
            selected = node;

            self.fileDoc = undefined;
            if (!node.isDirectory) {
                var prefix = window.cordova.file.externalDataDirectory + 'documents/',
                    shortPath = node._entry.fullPath.substring(prefix.length);

                return LocalDocument.queryOne('Document/byPath', { key: shortPath, include_docs: false }).then(function(doc) {
                    self.fileDoc = angular.extend({
                        libelle: node._entry.name,
                        description: 'Pas de description.'
                    }, doc);
                });
            }
        };

        self.open = function() {
            window.cordova.plugins.FileOpener.openFile(selected._entry.nativeURL);
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