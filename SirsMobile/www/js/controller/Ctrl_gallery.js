angular.module('app.controllers.gallery', [])
    .controller('GalleryController', GalleryController);

function GalleryController($q, $scope, $ionicPlatform, $cordovaFile, LocalDocument, PouchService, $ionicPopup, $rootScope) {
    var self = this;

    self.activeTab = 'documents';

    self.setActiveTab = function (tab) {
        self.activeTab = tab;
        self.fileDoc = undefined;
        self.initDirectory();
    };

    var selected = undefined;

    self.availableFiles = [];

    self.fileDoc = undefined;

    self.downloadRemoteDocuments = function () {
        LocalDocument.query('getAllFilesAttachments', {attachments: true}).then(function (results) {
            results.forEach(function (item) {
                angular.forEach(item.value.attachments, function (value, key) {
                    if (!value.content_type.startsWith("image/")) {
                        $.ajax({
                            url: window.cordova.file.externalDataDirectory + 'documents' + '/' + item.value.chemin.substring(item.value.chemin.lastIndexOf('/') + 1),
                            type: 'HEAD',
                            error: function () {
                                PouchService.getLocalDB().getAttachment(item.id, key, function (err, blob) {
                                    window.resolveLocalFileSystemURL(window.cordova.file.externalDataDirectory + 'documents', function (targetDir) {
                                        targetDir.getFile(item.value.chemin.substring(item.value.chemin.lastIndexOf('/') + 1), {create: true}, function (file) {
                                            file.createWriter(function (fileWriter) {
                                                fileWriter.write(blob);
                                                window.setTimeout(function () {
                                                    $cordovaFile.checkDir(window.cordova.file.externalDataDirectory, 'documents').then(function (directory) {
                                                        visitDirectory(directory).then(function (files) {
                                                            self.availableFiles = files;
                                                        });
                                                    });
                                                    $scope.$digest();
                                                }, 10);
                                            }, function () {
                                                console.log('cannot write the data to the file');
                                            });
                                        });
                                    });
                                });
                            }
                        });


                    }
                });

            });
        });
    };

    self.select = function (node) {
        selected = node;

        self.fileDoc = undefined;
        if (!node.isDirectory) {
            // var prefix = window.cordova.file.externalDataDirectory + 'documents/',
            //     shortPath = node._entry.fullPath.substring(prefix.length);

            // return LocalDocument.queryOne('Document/byPath', { key: shortPath, include_docs: false })
            //     .then(function(doc) {
            //             self.fileDoc = angular.extend({
            //                 libelle: node._entry.name,
            //                 description: 'Pas de description.'
            //             }, doc);
            //         });

            self.fileDoc = {
                libelle: node._entry.name,
                description: 'Pas de description.'
            };
        }
    };

    self.deleteFile = function () {
        return $ionicPopup.confirm({
            title: 'Suppression d\'un fichier',
            template: 'Voulez vous vraiment supprimer ce fichier ?'
        }).then(function (confirmed) {
            if (confirmed) {
                selected._entry.remove(function () {
                    console.log('The file has been removed succesfully');
                    self.fileDoc = undefined;
                    self.initDirectory();
                }, function (error) {
                    console.log('Error deleting the file');
                }, function () {
                    console.log("The file doesn't exist");
                });
            }
            return confirmed;
        });
    };

    self.deleteAllFiles = function () {
        return $ionicPopup.confirm({
            title: 'Suppression tous les fichiers',
            template: 'Voulez vous vraiment supprimer tous les fichiers de ce répertoire ?' +
            'NB: Cette operation ne supprime pas les fichiers dans la base de données.'
        }).then(function (confirmed) {
            if (confirmed) {
                $rootScope.loadingflag = true;
                var promises = [];
                angular.forEach(self.availableFiles, function (file) {
                    promises.push(file._entry.remove());
                });
                $q.all(promises).then(function (values) {
                    console.log('The files has been removed succesfully');
                    self.fileDoc = undefined;
                    self.initDirectory();
                    $rootScope.loadingflag = false;
                });

            }
            return confirmed;
        });
    };

    self.open = function () {
        window.cordova.plugins.fileOpener2.open(
            decodeURI(selected._entry.nativeURL),
            'image/jpeg',
            {
                error: function (e) {
                    console.log('Error ' + e);
                },
                success: function () {
                    console.log('file opened successfully');
                }
            }
        );
    };

    self.getPhotoPath = function () {
        return selected ? decodeURI(selected._entry.nativeURL) : '';
    };

    function visitDirectory(directory) {
        var deferred = $q.defer();

        directory.createReader().readEntries(function (entries) {
            var files = [];
            angular.forEach(entries, function (entry) {
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

    self.initDirectory = function () {
        $cordovaFile.checkDir(window.cordova.file.externalDataDirectory, self.activeTab)
            .then(function (directory) {
                visitDirectory(directory).then(function (files) {
                    self.availableFiles = files;
                });
            });
    };

    $ionicPlatform.ready(function () {
        self.initDirectory();
    }); // fill root documents when the device is ready

}


