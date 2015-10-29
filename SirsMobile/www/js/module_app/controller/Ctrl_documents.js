angular.module('module_app.controllers.documents', [])

    .controller('DocumentController', function DocumentController($q, $scope, $ionicPlatform, $cordovaFile) {

        var self = this;

        var directories = {};


        self.roots = [];

        self.children = function(node) {
            return analyseDirectory(node._entry);
        };

        self.select = function(node) {
            if (!node.isDirectory) {
                window.cordova.plugins.FileOpener.openFile(node._entry.nativeURL);
            }
        };


        $ionicPlatform.ready(function() {
            $cordovaFile.checkDir(window.cordova.file.externalDataDirectory, 'documents').then(function(directory) {
                analyseDirectory(directory).then(function(files) {
                    self.roots = files;
                });
            });
        });


        function analyseDirectory(directory) {
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

        function visitDocumentTree(directory, parentNode) {
            directory.createReader().readEntries(function(entries) {
                directories[directory.fullPath] = [];

                if (angular.isObject(parentNode)) {
                    parentNode.childCount = entries.length;
                }

                angular.forEach(entries, function(entry) {
                    var node = {
                        id: entry.fullPath,
                        label: entry.name,
                        childCount: 0,
                        isDirectory: entry.isDirectory
                    };
                    directories[directory.fullPath].push(node);

                    if (entry.isDirectory) {
                        visitDocumentTree(entry, node);
                    }

                    $scope.$digest();
                });
            });
        }
    });