angular.module('app.controllers.observation_edit', [])

    .controller('ObservationEditController', function ObservationEditController($scope, $filter, $location, $ionicScrollDelegate,
                                                                                $ionicLoading, $ionicPlatform, $cordovaFile,
                                                                                $routeParams, GeolocationService, LocalDocument,
                                                                                EditionService, objectDoc, uuid4, $rootScope, contactList,
                                                                                urgenceList, orientationsList, cotesList, AuthService,
                                                                                MapManager, GlobalConfig, $cordovaToast, $q, PouchService,
                                                                                localStorageService) {

        var self = this;

        self.config = GlobalConfig.config;

        var wktFormat = new ol.format.WKT();

        self.showText = function (type) {
            return self.config.showText === type;
        };

        $rootScope.loadingflag = false;

        self.isNewObject = !$routeParams.obsId;

        self.objectType = objectDoc['@class']
            .substring(objectDoc['@class'].lastIndexOf('.') + 1);

        self.doc = self.isNewObject ? createNewObservation() : angular.copy(getTargetObservation());

        // Hack for borne fin data without borneFinId
        if (angular.isDefined(objectDoc.borne_fin_aval) && angular.isDefined(objectDoc.borne_fin_distance) && !objectDoc.borneFinId) {
            objectDoc.borneFinId = objectDoc.borneDebutId;
        }

        var author = AuthService.getValue();

        self.doc.author = author._id;

        self.flagLoading = function () {
            $rootScope.loadingflag = true;
        };

        self.objectDoc = objectDoc;

        self.showContent = true;

        self.loaded = {};

        self.troncons = [];

        self.troncons = localStorageService.get("AppTronconsFavorities");

        self.loadImage = function (photo) {
            var image_url = self.getPhotoPath(photo);
            $.ajax({
                url: image_url, type: 'HEAD',
                error: function () {
                    if (self.objectDoc._attachments) {
                        var keyAttachment = null;
                        var objAttachment;
                        angular.forEach(Object.keys(self.objectDoc._attachments), function (key) {
                            if (key.indexOf(photo.id) !== -1) {
                                keyAttachment = key;
                            }
                        });
                        objAttachment = self.objectDoc._attachments[keyAttachment];
                        if (objAttachment) {
                            LocalDocument.getAttachment(self.objectDoc._id, keyAttachment)
                                .then(function (blob) {
                                        var blobImage = blob;
                                        var fileName;
                                        if (keyAttachment.indexOf('.') != -1) {
                                            fileName = keyAttachment;
                                        } else {
                                            var ext;
                                            switch (objAttachment.content_type) {
                                                case "image/jpeg":
                                                    ext = ".jpg";
                                                    break;
                                                case "image/png":
                                                    ext = ".png";
                                                    break;
                                                case "image/gif":
                                                    ext = ".gif";
                                                    break;
                                                case "image/tiff":
                                                    ext = ".tif";
                                                    break;
                                            }
                                            fileName = keyAttachment + ext;
                                        }

                                        self.showContent = false;
                                        window.resolveLocalFileSystemURL(self.mediaPath, function (targetDir) {
                                            targetDir.getFile(fileName, {create: true}, function (file) {
                                                file.createWriter(function (fileWriter) {
                                                    fileWriter.write(blobImage);
                                                    window.setTimeout(function () {
                                                        self.loaded[photo.id] = true;
                                                        $scope.$apply();
                                                    }, 100);

                                                    setTimeout(function () {
                                                        self.showContent = true;
                                                        $scope.$apply();
                                                    }, 500);
                                                }, function () {
                                                    console.log('cannot write the data to the file');
                                                    self.loaded[photo.id] = true;
                                                });
                                            });
                                        });
                                    },
                                    function (err) {
                                        console.error(err);
                                    });
                        } else {
                            self.loaded[photo.id] = true;
                            console.log("no attachment exit to load image");
                        }
                    } else {
                        self.loaded[photo.id] = true;
                    }
                },
                success: function () {
                    window.setTimeout(function () {
                        window.setTimeout(function () {
                            self.loaded[photo.id] = true;
                            $scope.$apply();
                        }, 10);
                    }, 10);
                }
            });

        };

        // Navigation
        // -----------

        self.view = 'form';

        self.tab = 'medias';

        self.setTab = function (name) {
            if (name !== self.tab) {
                self.tab = name;
                $ionicScrollDelegate.$getByHandle('formScroll').scrollTop(false);
            }
        };

        self.setView = function (name) {
            if (name !== self.view) {
                self.view = name;
            }
        };

        self.backToForm = function () {
            self.setView('form');
        };

        self.contactList = contactList.filter(function (item) {
            return item.doc.prenom;
        });

        self.urgenceList = urgenceList.map(function (item) {
            item.value.id = parseInt(item.value.id.substring(item.value.id.lastIndexOf(":") + 1), 10);
            return item.value;
        });

        if (self.doc.urgenceId) {
            self.urgence = parseInt(self.doc.urgenceId.substring(self.doc.urgenceId.lastIndexOf(":") + 1), 10);
        }

        self.changeUrgence = function () {
            self.doc.urgenceId = "RefUrgence:" + self.urgence;
        };

        self.changeContact = function () {
            self.doc.observateurId = self.contact;
        };

        self.compareRef = function (obj1, obj2) {
            var a, b, comparison;
            comparison = 0;
            if (self.showText('fullName')) {
                a = obj1.libelle;
                b = obj2.libelle;
            } else {
                a = obj1.abrege ? obj1.abrege : obj1.designation;
                b = obj2.abrege ? obj2.abrege : obj2.designation;
            }

            if (a > b) {
                comparison = 1;
            } else if (a < b) {
                comparison = -1;
            }

            return comparison;
        };

        self.contact = self.doc.observateurId;

        //@hb
        self.orientations = orientationsList;
        //@hb
        self.cotes = cotesList;

        self.getApproximatePosition = function (borneId, borneAval, borneDistance, flag) {
            var deferred = $q.defer();
            var troncon = self.troncons.find(function (item) {
                return item.id === objectDoc.linearId;
            });

            PouchService.getLocalDB().query('byId', {
                key: troncon.systemeRepDefautId
            }).then(function (results) {
                var systemeReperage = results.rows.filter(function (item) {
                    return item.id === objectDoc.systemeRepId;
                })[0];

                PouchService.getLocalDB().query('getBornesIdsHB', {
                    keys: systemeReperage.value.systemeReperageBornes
                        .map(function (item) {
                            return item.borneId;
                        })
                }).then(function (res) {

                    angular.forEach(systemeReperage.value.systemeReperageBornes, function (item1) {
                        angular.forEach(res.rows, function (item2) {
                            if (item1.borneId === item2.id) {
                                item1.libelle = item2.value.libelle;
                                item1.borneGeometry = item2.value.geometry;
                            }
                        });
                    });

                    var index = systemeReperage.value.systemeReperageBornes.findIndex(function (item) {
                        return item.borneId === borneId;
                    });

                    var srb = systemeReperage.value.systemeReperageBornes[index];

                    // Calculate approximate position
                    var x = wktFormat.readGeometry(srb.borneGeometry).getCoordinates();
                    var y;

                    if (borneAval) {
                        y = (index === systemeReperage.value.systemeReperageBornes.length - 1)
                            ? wktFormat.readGeometry(systemeReperage.value.systemeReperageBornes[index].borneGeometry).getCoordinates()
                            : wktFormat.readGeometry(systemeReperage.value.systemeReperageBornes[index + 1].borneGeometry).getCoordinates();
                    } else {
                        y = (index === 0)
                            ? wktFormat.readGeometry(systemeReperage.value.systemeReperageBornes[index].borneGeometry).getCoordinates()
                            : wktFormat.readGeometry(systemeReperage.value.systemeReperageBornes[index - 1].borneGeometry).getCoordinates();
                    }

                    var v = glMatrix.vec2.sub([], y, x);

                    var vn = glMatrix.vec2.normalize(v, v);

                    var vs = glMatrix.vec2.scale(vn, vn, borneDistance);

                    var o = glMatrix.vec2.add([], x, vs);

                    objectDoc[flag] = 'POINT(' + o[0] + ' ' + o[1] + ')';

                    deferred.resolve();

                });

            });

            return deferred.promise;

        };

        self.save = function () {
            if (self.isNewObject) {
                if (angular.isUndefined(objectDoc.observations)) {
                    objectDoc.observations = [];
                }

                // Push the new observation.
                objectDoc.observations.push(self.doc);
            } else {
                // Apply modifications on target observation.
                angular.extend(getTargetObservation(), self.doc);
            }

            objectDoc.valid = false;

            objectDoc.editMode = true;

            objectDoc.dateMaj = new Date().toISOString().split('T')[0];

            delete objectDoc.prDebut;

            delete objectDoc.prFin;

            if (objectDoc.borneDebutId) {
                delete objectDoc.positionDebut;
                delete objectDoc.positionFin;
                delete objectDoc.geometry;

                /**
                 * Hack to calculate the approximate position when the object is aligned with bornes
                 */
                if (!objectDoc.approximatePositionDebut) {
                    $rootScope.loadingflag = true;
                    self.getApproximatePosition(objectDoc.borneDebutId,
                        objectDoc.borne_debut_aval,
                        objectDoc.borne_debut_distance, 'approximatePositionDebut')
                        .then(function () {
                            if (objectDoc.borneFinId && !objectDoc.approximatePositionFin) {
                                self.getApproximatePosition(objectDoc.borneFinId,
                                    objectDoc.borne_fin_aval,
                                    objectDoc.borne_fin_distance, 'approximatePositionFin')
                                    .then(function () {
                                        $rootScope.loadingflag = false;
                                        // Save document.
                                        EditionService.saveObject(objectDoc).then(function () {
                                            MapManager.syncAllAppLayer();
                                            $location.path('/main');
                                        });
                                    });
                            }
                        });
                } else {
                    EditionService.saveObject(objectDoc).then(function () {
                        MapManager.syncAllAppLayer();
                        $location.path('/main');
                    });
                }
            } else {
                // Save document.
                EditionService.saveObject(objectDoc).then(function () {
                    MapManager.syncAllAppLayer();
                    $location.path('/main');
                });
            }
        };

        function createNewObservation() {
            var newObj = {
                'id': uuid4.generate(),
                'date': $filter('date')(new Date(), 'yyyy-MM-dd'),
                'photos': [],
                'valid': false
            };

            switch (self.objectType) {
                case 'StationPompage':
                case 'ReseauHydrauliqueFerme':
                case  'OuvrageHydrauliqueAssocie':
                case  'ReseauHydrauliqueCielOuvert':
                case 'VoieAcces':
                case 'OuvrageFranchissement':
                case 'OuvertureBatardable':
                case 'VoieDigue':
                case 'OuvrageVoirie':
                case 'ReseauTelecomEnergie':
                case 'OuvrageTelecomEnergie':
                case 'OuvrageParticulier':
                case 'EchelleLimnimetrique':
                case 'Prestation':
                    newObj['@class'] = 'fr.sirs.core.model.Observation' + self.objectType;
                    return newObj;
                default :
                    newObj['@class'] = 'fr.sirs.core.model.Observation';
                    newObj.urgenceId = "RefUrgence:1";
                    newObj.nombreDesordres = 0;
                    return newObj;
            }
        }

        function getTargetObservation() {
            var i = objectDoc.observations.length;
            while (i--) {
                if (objectDoc.observations[i].id === $routeParams.obsId) {
                    return objectDoc.observations[i];
                }
            }
            throw new Error('No observation "' + $routeParams.obsId + '" found in disorder document.');
        }

        // Medias
        // ----------

        self.mediaPath = null;

        self.photos = self.doc.photos;

        self.recordAudio = function () {
            // TODO → to implement
        };

        self.takePhoto = function () {
            navigator.camera.getPicture(photoCaptureSuccess, photoCaptureError, {
                quality: 50,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                encodingType: navigator.camera.EncodingType.JPEG
            });
        };

        self.drawNote = function () {
            self.setView('note');
        };

        self.saveNote = savePicture;

        self.open = function (photo) {
            var url = self.getPhotoPath(photo);
            window.cordova.plugins.fileOpener2.open(
                decodeURI(url),
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

        self.getPhotoPath = function (photo) {
            var path = photo.id + photo.chemin.substring(photo.chemin.indexOf('.')).toLowerCase();
            var image_url = self.mediaPath + '/' + path;
            return image_url;
        };

        function photoCaptureSuccess(imageURI) {
            window.resolveLocalFileSystemURL(imageURI, savePicture);
        }

        function photoCaptureError() {
            // TODO → handle error
        }

        function savePicture(imageFile) {
            if (!self.mediaPath) {
                return;
            }
            window.resolveLocalFileSystemURL(self.mediaPath, function (targetDir) {
                var photoId = uuid4.generate(),
                    fileName = photoId + '.jpg';

                // Copy image file in its final directory.
                imageFile.copyTo(targetDir, fileName, function () {

                    // Store the photo in the object document.
                    self.photos.push({
                        'id': photoId,
                        '@class': 'fr.sirs.core.model.Photo',
                        'date': $filter('date')(new Date(), 'yyyy-MM-dd'),
                        'chemin': '/' + fileName,
                        'valid': false
                    });

                    var xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        var reader = new FileReader();
                        reader.onloadend = function () {
                            // Save the photo like attachment to the object
                            self.objectDoc._attachments[photoId] = {
                                content_type: 'image/jpeg',
                                data: reader.result.replace('data:image/jpeg;base64,', '')
                            };
                        };

                        reader.readAsDataURL(xhr.response);
                    };
                    xhr.open('GET', self.getPhotoPath(self.photos[self.photos.length - 1]));
                    xhr.responseType = 'blob';
                    xhr.send();

                    // Force digest.
                    $scope.$digest();
                });
            });
        }

        self.goToMedia = function () {
            self.setView('media');
        };

        $ionicPlatform.ready(function () {
            // Acquire the medias storage path when the device is ready.
            self.mediaPath = window.cordova.file.externalDataDirectory + 'medias';
        });

        $scope.$on("$destroy", function () {
            $rootScope.reloadMain = true;
        });

    })
    .controller('MediaObservationController', function ($window, SirsDoc, $ionicLoading, GeolocationService,
                                                        uuid4, $ionicPlatform, $scope, AuthService, $filter,
                                                        $cordovaToast, EditionService, MapManager) {
        var self = this;

        var dataProjection = SirsDoc.get().epsgCode;

        self.showText = $scope.c.showText;

        self.orientations = $scope.c.orientations;

        self.cotes = $scope.c.cotes;

        self.back = function () {
            $scope.c.setView('form');
        };

        self.save = function () {
            if (self.mediaOptions.id) {
                if (angular.isUndefined($scope.c.doc.photos)) {
                    $scope.c.doc.photos = [];
                }

                $scope.c.doc.photos.push(self.mediaOptions);
                if (self.importPhototData) {
                    if (angular.isUndefined($scope.c.objectDoc._attachments)) {
                        $scope.c.objectDoc._attachments = {};
                    }
                    // Save the photo like attachment to the object
                    $scope.c.objectDoc._attachments[self.mediaOptions.id] = {
                        content_type: 'image/jpeg',
                        data: self.importPhototData.replace('data:image/jpeg;base64,', '')
                    };

                    EditionService.saveObject($scope.c.objectDoc)
                        .then(function () {
                            $scope.c.setView('form');
                            MapManager.syncAllAppLayer();
                        });

                } else {
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        var reader = new FileReader();
                        reader.onloadend = function () {
                            if (angular.isUndefined($scope.c.objectDoc._attachments)) {
                                $scope.c.objectDoc._attachments = {};
                            }
                            // Save the photo like attachment to the object
                            $scope.c.objectDoc._attachments[self.mediaOptions.id] = {
                                content_type: 'image/jpeg',
                                data: reader.result.replace('data:image/jpeg;base64,', '')
                            };
                        };

                        reader.readAsDataURL(xhr.response);
                    };
                    xhr.open('GET', self.getPhotoPath($scope.c.doc.photos[$scope.c.doc.photos.length - 1]));
                    xhr.responseType = 'blob';
                    xhr.send();
                    $scope.c.setView('form');
                }
            }
        };

        self.selectPos = function () {
            self.setView('map');
        };

        //@hb
        self.mediaOptions = {
            id: '',
            chemin: '',
            designation: "",
            positionDebut: "",
            orientationPhoto: "",
            coteId: "",
            commentaire: "",
            author: AuthService.getValue()._id
        };

        self.setView = function (name) {
            if (name !== self.view) {
                self.view = name;
            }
        };

        self.view = 'form';

        self.handlePos = function (pos) {

            var coordinate = ol.proj.transform([pos.longitude, pos.latitude], 'EPSG:4326', dataProjection);
            self.mediaOptions.positionDebut = 'POINT(' + coordinate[0] + ' ' + coordinate[1] + ')';

        };

        self.backToForm = function () {
            self.setView('form');
        };

        self.takePhoto = function () {
            self.mediaOptions['id'] = '';
            self.mediaOptions['chemin'] = '';
            navigator.camera.getPicture(photoCaptureSuccess, photoCaptureError, {
                quality: 50,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                encodingType: navigator.camera.EncodingType.JPEG
            });
        };

        function calculateImageSize(base64String) {
            var padding, inBytes, base64StringLength;
            if (base64String.endsWith("==")) padding = 2;
            else if (base64String.endsWith("=")) padding = 1;
            else padding = 0;

            base64StringLength = base64String.length;
            inBytes = (base64StringLength / 4) * 3 - padding;
            return inBytes;
        }

        self.importMedia = function () {
            navigator.camera.getPicture(function (imageData) {
                if (calculateImageSize(imageData) > 1048576) {
                    $cordovaToast
                        .showLongTop("Veuillez choisir une photo de taille inférieure à 1,2 Mo");
                    return;
                }

                var photoId = uuid4.generate(),
                    fileName = photoId + '.jpg';

                // Store the photo in the object document.
                self.mediaOptions['id'] = photoId;
                self.mediaOptions['@class'] = 'fr.sirs.core.model.Photo';
                self.mediaOptions['date'] = $filter('date')(new Date(), 'yyyy-MM-dd');
                self.mediaOptions['chemin'] = '/' + fileName;
                self.mediaOptions['valid'] = false;

                self.importPhototData = 'data:image/jpeg;base64,' + imageData;
                // Force digest.
                $scope.$digest();

            }, function (error) {
                console.log(error);
            }, {
                quality: 50,
                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                destinationType: navigator.camera.DestinationType.DATA_URL,
                encodingType: navigator.camera.EncodingType.JPEG
            });
        };

        self.drawNote = function () {
            self.setView('note');
        };

        self.saveNote = savePicture;

        function photoCaptureSuccess(imageURI) {
            window.resolveLocalFileSystemURL(imageURI, savePicture);
        }

        self.getPhotoPath = function (photo) {
            var path = photo.id + photo.chemin.substring(photo.chemin.indexOf('.')).toLowerCase();
            var image_url = self.mediaPath + '/' + path;
            return image_url;
        };

        function photoCaptureError() {
            // TODO → handle error
        }

        function savePicture(imageFile) {
            //Check image size
            imageFile.file(function (fileObj) {
                if (fileObj.size > 1048576) {
                    $cordovaToast
                        .showLongTop("Veuillez choisir une photo de taille inférieure à 1,2 Mo");
                    imageFile.__proto__.remove();
                } else {
                    if (!self.mediaPath) {
                        return;
                    }
                    window.resolveLocalFileSystemURL(self.mediaPath, function (targetDir) {
                        self.importPhototData = null;
                        var photoId = uuid4.generate(),
                            fileName = photoId + '.jpg';
                        // Copy image file in its final directory.
                        imageFile.copyTo(targetDir, fileName, function () {
                            // Store the photo in the object document.
                            self.mediaOptions['id'] = photoId;
                            self.mediaOptions['@class'] = 'fr.sirs.core.model.Photo';
                            self.mediaOptions['date'] = $filter('date')(new Date(), 'yyyy-MM-dd');
                            self.mediaOptions['chemin'] = '/' + fileName;
                            self.mediaOptions['valid'] = false;
                            // Force digest.
                            $scope.$digest();
                        });
                    });
                }
            });

        }

        self.waitForLocation = function (locationPromise) {
            $ionicLoading.show({template: 'En attente de localisation...'});
            return locationPromise.then(function handleLocation(location) {
                self.handlePos(location.coords);
                $ionicLoading.hide();
            });
        };

        self.locateMe = function () {
            self.waitForLocation(GeolocationService.start()).then(GeolocationService.stop);
        };

        $ionicPlatform.ready(function () {
            // Acquire the medias storage path when the device is ready.
            self.mediaPath = window.cordova.file.externalDataDirectory + 'medias';
        });
    })
    .directive('pointsHandler', function () {
        return {
            restrict: 'A',
            priority: 100,
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                if (ngModel) {
                    ngModel.$parsers.push(function (value) {
                        return "RefUrgence:" + value;
                    });

                    ngModel.$formatters.push(function (value) {
                        return value.substring(value.lastIndexOf(":") + 1);
                    });
                }
            }
        };
    });
