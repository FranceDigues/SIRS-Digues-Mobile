angular.module('app.controllers.documents', [])

    .controller('DocumentController', function DocumentController($q, $scope, $ionicPlatform, $cordovaFile, LocalDocument, $rootScope) {

        var self = this;

        var selected = undefined;

        self.roots = [];

        self.fileDoc = undefined;

        self.downloadRemoteDocuments = function(){
            $rootScope.loadingflag = true;
            LocalDocument.query('getAllFilesAttachments').then(function(results) {
                results.forEach(function (item) {
                    angular.forEach(item.value.attachments,function (value, key) {
                        if(!value.content_type.startsWith("image/")){
                        $.ajax({url:window.cordova.file.externalDataDirectory + 'documents'+'/'+item.value.chemin.substring(item.value.chemin.lastIndexOf('/')+1),
                            type:'HEAD',
                            error : function () {
                                LocalDocument.getAttachment(item.id,key).then(function (blob) {
                                    window.resolveLocalFileSystemURL(window.cordova.file.externalDataDirectory + 'documents', function(targetDir) {
                                        targetDir.getFile(item.value.chemin.substring(item.value.chemin.lastIndexOf('/')+1), {create:true}, function(file) {
                                            file.createWriter(function(fileWriter) {
                                                fileWriter.write(blob);
                                                window.setTimeout(function () {
                                                    $scope.$digest();
                                                },10);
                                            }, function(){
                                                console.log('cannot write the data to the file');
                                            });
                                        });
                                    });
                                },function (error) {
                                    console.log(error);
                                });
                            }
                        });


                        }
                    });

                });
                $rootScope.loadingflag = false;
            });
        };

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