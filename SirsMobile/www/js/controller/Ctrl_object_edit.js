angular.module('app.controllers.object_edit', [])

    .filter('lonlat', function ($filter) {
        return function (coordinate, fallback) {
            if (coordinate) {
                return $filter('number')(coordinate[0], 3) + ', ' + $filter('number')(coordinate[1], 3);
            }
            return fallback;
        }
    })

    .service('PositionMapManager', function PositionMapManager($rootScope, BackLayerService, featureCache,
                                                               currentView, AppLayersService, LocalDocument, DefaultStyle) {

        var self = this;

        var wktFormat = new ol.format.WKT();

        function createAppFeatureModel(featureDoc) {
            // featureDoc = featureDoc.value || featureDoc;
            featureDoc = featureDoc.doc || featureDoc.value; // depending on "include_docs" option when querying docs

            var dataProjection = angular.isUndefined(SirsDoc.get().epsgCode) ? "EPSG:2154" : SirsDoc.get().epsgCode;

            var projGeometry = featureDoc.geometry ? wktFormat.readGeometry(featureDoc.geometry).transform(dataProjection, 'EPSG:3857') : undefined;

            if (projGeometry instanceof ol.geom.LineString && projGeometry.getCoordinates().length === 2 &&
                projGeometry.getCoordinates()[0][0] === projGeometry.getCoordinates()[1][0] &&
                projGeometry.getCoordinates()[0][1] === projGeometry.getCoordinates()[1][1]) {
                projGeometry = new ol.geom.Point(projGeometry.getCoordinates()[0]);
            }

            var realGeometry = featureDoc.positionDebut ?
                wktFormat.readGeometry(featureDoc.positionDebut).transform(dataProjection, 'EPSG:3857') : undefined;

            if (realGeometry && featureDoc.positionFin && featureDoc.positionFin !== featureDoc.positionDebut) {
                realGeometry = new ol.geom.LineString([
                    realGeometry.getFirstCoordinate(),
                    wktFormat.readGeometry(featureDoc.positionFin).transform(dataProjection, 'EPSG:3857').getFirstCoordinate()
                ]);
            }

            return {
                id: featureDoc.id || featureDoc._id,
                rev: featureDoc.rev || featureDoc._rev,
                designation: featureDoc.designation,
                title: featureDoc.libelle,
                projGeometry: projGeometry,
                realGeometry: realGeometry,
                archive: featureDoc.date_fin ? true : false
            };

        }

        function createAppFeatureInstances(featureModels, layerModel) {
            var features = [];
            // get each feature from the featureModel
            angular.forEach(featureModels, function (featureModel) {
                if ((layerModel.realPosition && featureModel.realGeometry) || (!layerModel.realPosition && featureModel.projGeometry)) {
                    if ($rootScope.archiveObjectsFlag) {
                        // Show all the objects
                        var feature = new ol.Feature();
                        if (layerModel.realPosition) {
                            feature.setGeometry(featureModel.realGeometry);
                            feature.setStyle(RealPositionStyle(layerModel.color, featureModel.realGeometry.getType(), featureModel, layerModel));
                        } else {
                            feature.setGeometry(featureModel.projGeometry);
                            feature.setStyle(DefaultStyle(layerModel.color, featureModel.projGeometry.getType(), featureModel, layerModel));
                        }
                        feature.set('id', featureModel.id);
                        feature.set('categories', layerModel.categories);
                        feature.set('rev', featureModel.rev);
                        feature.set('designation', featureModel.designation);
                        feature.set('title', featureModel.libelle);
                        features.push(feature);
                    } else {
                        //Show only not archived objects
                        if (!featureModel.archive) {
                            var feature = new ol.Feature();
                            if (layerModel.realPosition) {
                                feature.setGeometry(featureModel.realGeometry);
                                feature.setStyle(RealPositionStyle(layerModel.color, featureModel.realGeometry.getType(), featureModel, layerModel));
                            } else {
                                feature.setGeometry(featureModel.projGeometry);
                                feature.setStyle(DefaultStyle(layerModel.color, featureModel.projGeometry.getType(), featureModel, layerModel));
                            }
                            feature.set('id', featureModel.id);
                            feature.set('categories', layerModel.categories);
                            feature.set('rev', featureModel.rev);
                            feature.set('designation', featureModel.designation);
                            feature.set('title', featureModel.libelle);
                            features.push(feature);
                        }
                    }
                }
            });
            return features;
        }

        self.buildConfig = function () {
            var layerModel = BackLayerService.getActive(),
                source = angular.copy(layerModel.source),
                extent;

            // Override the source if the layer is available from cache.
            if (angular.isObject(layerModel.cache)) {
                extent = layerModel.cache.extent;
                source.type = 'XYZ';
                source.url = layerModel.cache.url;
            }

            // Create layer instance.
            var olLayer = new ol.layer.Tile({
                name: layerModel.title,
                extent: extent,
                model: layerModel,
                source: new ol.source[source.type](source)
            });

            // Tronçon / Borne layers

            var appLayers = new ol.layer.Group({
                name: 'Objects',
                layers: AppLayersService.getFavorites().filter(function (layerModel) {
                    return layerModel.title === 'Bornes' || layerModel.title === 'Tronçons';
                }).map(function (layerModel) {
                    if (layerModel.filterValue === "fr.sirs.core.model.BorneDigue") {
                        //@hb Change the layer Source to Cluster source
                        var olLayer = new ol.layer.Image({
                            name: layerModel.title,
                            visible: layerModel.visible,
                            model: layerModel,
                            source: new ol.source.ImageVector({
                                style: function (feature, resolution) {
                                    var features = feature.get("features");
                                    var styles = [];

                                    if (angular.isArray(features) && features.length > 0) {
                                        angular.forEach(features, function (_feature) {
                                            var style = _feature.getStyle();
                                            if (typeof style === "function") {
                                                style = style.call(_feature, _feature, resolution);
                                            } else if (style instanceof ol.style.Style) {
                                                style = [].concat(style);
                                            }

                                            if (angular.isArray(style)) {
                                                angular.forEach(style, function (_style) {
                                                    _style.setGeometry(_feature.getGeometry());
                                                    if (_style.getText() !== undefined && _style.getText() !== null) {
                                                        _style.getText().setText(undefined);
                                                    }
                                                    styles.push(_style);
                                                });
                                            }
                                        });

                                        var style = features[0].getStyle();
                                        if (typeof style === "function") {
                                            style = style.call(feature, feature, resolution);
                                        } else if (style instanceof ol.style.Style) {
                                            style = [].concat(style);
                                        }


                                        if (angular.isArray(style)) {
                                            angular.forEach(style, function (_style) {
                                                styles.push(new ol.style.Style({
                                                    zIndex: _style.getZIndex(),
                                                    text: _style.getText()
                                                }));
                                            });
                                        }
                                    }
                                    return styles;
                                },
                                source: new ol.source.Cluster({
                                    distance: 24,
                                    source: new ol.source.Vector({useSpatialIndex: true})
                                })
                            })
                        });
                    } else {
                        var olLayer = new ol.layer.Image({
                            name: layerModel.title,
                            visible: layerModel.visible,
                            model: layerModel,
                            source: new ol.source.ImageVector({
                                source: new ol.source.Vector({useSpatialIndex: false})
                            })
                        });
                    }

                    if (layerModel.visible === true) {
                        var layerModel = olLayer.get('model');

                        if (layerModel.filterValue === "fr.sirs.core.model.BorneDigue") {
                            var olSource = olLayer.getSource().getSource().getSource();
                        } else {
                            var olSource = olLayer.getSource().getSource();
                        }

                        // Try to get the promise of a previous query.
                        var promise = featureCache.get(layerModel.title);

                        if (angular.isUndefined(promise)) {
                            if (layerModel.filterValue !== "fr.sirs.core.model.BorneDigue"
                                && layerModel.filterValue !== "fr.sirs.core.model.TronconDigue") {
                                //Get all the favorites tronçons ids
                                var favorites = localStorageService.get("AppTronconsFavorities");
                                var keys = [];
                                if (favorites !== null && favorites.length !== 0) {
                                    angular.forEach(favorites, function (key) {
                                        keys.push([layerModel.filterValue, key]);
                                    });

                                    promise = LocalDocument.query('ElementSpecial', {
                                        keys: keys
                                    }).then(
                                        function (results) {
                                            return results.map(createAppFeatureModel);
                                        },
                                        function (error) {
                                            // TODO → handle error
                                        });
                                } else {
                                    var deferred = $q.defer();
                                    promise = deferred.promise.then(
                                        function () {
                                            return [].map(createAppFeatureModel);
                                        });
                                    deferred.resolve();
                                }
                            } else if (layerModel.filterValue === "fr.sirs.core.model.TronconDigue") {
                                promise = LocalDocument.query('TronconDigue/streamLight', {
                                    keys: localStorageService.get("AppTronconsFavorities") === null ? [] : localStorageService.get("AppTronconsFavorities")
                                }).then(
                                    function (results) {
                                        return results.map(createAppFeatureModel);
                                    },
                                    function (error) {
                                        console.log(error);
                                    });
                            } else {
                                promise = LocalDocument.query('getBornesFromTronconID', {
                                    keys: localStorageService.get("AppTronconsFavorities") === null ? [] : localStorageService.get("AppTronconsFavorities")
                                }).then(
                                    function (results) {
                                        return LocalDocument.query('getBornesIdsHB', {
                                            keys: results.map(function (obj) {
                                                return obj.value;
                                            })
                                        }).then(
                                            function (results2) {
                                                return results2.map(createAppFeatureModel);
                                            });
                                    },
                                    function (error) {
                                        console.log(error);
                                    });
                            }


                            // Set and store the promise.
                            featureCache.put(layerModel.title, promise);
                        }

                        // Wait for promise resolution or rejection.
                        promise.then(
                            function onSuccess(featureModels) {
                                // @hb get the featureModels from the promise
                                olSource.addFeatures(createAppFeatureInstances(featureModels, layerModel));
                                $rootScope.loadingflag = false;
                            },
                            function onError(error) {
                                // TODO → handle error
                            });
                    }
                    return olLayer;
                })
            });

            return {
                view: currentView,
                layers: [olLayer, appLayers],
                controls: [],
                interactions: ol.interaction.defaults({
                    altShiftDragRotate: false,
                    shiftDragZoom: false
                })
            };
        };
    })
    .controller('ObjectEditController', function ObjectEditController($scope, $location, $ionicScrollDelegate,
                                                                      $ionicLoading, $ionicPlatform, $cordovaFile,
                                                                      $routeParams, GeolocationService, LocalDocument,
                                                                      EditionService, objectDoc, refTypes,
                                                                      uuid4, SirsDoc, $ionicModal, orientationsList, $filter,
                                                                      cotesList, $rootScope, listTroncons, MapManager, PouchService,
                                                                      $timeout, GlobalConfig) {

        var self = this;

        $rootScope.loadingflag = false;

        var dataProjection = SirsDoc.get().epsgCode;

        self.view = 'form';

        self.tab = 'fields';

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

        self.showContent = true;

        self.orientations = orientationsList;

        self.cotes = cotesList;

        self.type = $routeParams.type;

        self.doc = objectDoc;

        self.isNew = !$routeParams.id;

        self.isClosed = (!!objectDoc.positionFin || !!objectDoc.geometry);

        self.isLinear = (self.isNew || !self.isClosed || (objectDoc.positionDebut !== objectDoc.positionFin));

        self.refs = refTypes;

        self.linearPosEditionHandler = {
            startPoint: false,
            endPoint: false
        };

        self.config = GlobalConfig.config;

        self.showText = function (type) {
            return self.config.showText === type;
        };

        var listeCool = cleanTronconsListe(listTroncons);

        $scope.$watch(function () {
            return self.doc.positionDebut;
        }, function (newValue) {
            if (angular.isDefined(newValue)) {
                var troncons = calculateDistanceObjectTroncon(
                    newValue,
                    listeCool);
                self.troncons = troncons;
            }
        });

        function cleanTronconsListe(liste) {
            var listCool = [];
            // Get the indexes list of not validated Tronçons
            angular.forEach(liste, function (elt, ind) {
                if (elt.value.valid || angular.isDefined(elt.value.geometry)) {
                    listCool.push(elt);
                }
            });
            return listCool;
        }

        function calculateDistanceObjectTroncon(point, liste) {
            var nearTronconList = [];
            // geomatryPosition is instance of ol.geom.Point
            var geomatryPosition = new ol.format.WKT().readGeometry(point, {
                dataProjection: SirsDoc.get().epsgCode,
                featureProjection: 'EPSG:3857'
            });

            var positionCoord = geomatryPosition.getCoordinates();
            var geom, geomTronc;
            // Get of the LineStrings from the list of Troncons
            angular.forEach(liste, function (elt) {
                try {
                    geom = new ol.format.WKT().readGeometry(elt.value.geometry, {
                        dataProjection: SirsDoc.get().epsgCode,
                        featureProjection: 'EPSG:3857'
                    });
                } catch (e) {
                    console.log(e);
                }
                geomTronc = geom.getClosestPoint(positionCoord);
                // Calculate the distance between two point

                var wgs84Sphere = new ol.Sphere(6378137);
                // The distance
                var dist = wgs84Sphere.haversineDistance(ol.proj.transform(positionCoord, 'EPSG:3857', 'EPSG:4326'),
                    ol.proj.transform(geomTronc, 'EPSG:3857', 'EPSG:4326')) / 1000;
                if (dist <= 1) {
                    nearTronconList.push(elt.value);
                }
            });
            // The list of the nearest Troncons
            return nearTronconList;
        }

        self.setupRef = function (field, defaultRef, isMultiple) {
            if (angular.isDefined(objectDoc[field])) {
                return;
            }
            if (angular.isObject(defaultRef)) {
                objectDoc[field] = isMultiple ? [defaultRef.id] : defaultRef.id;
            } else {
                objectDoc[field] = isMultiple ? [] : undefined;
            }
        };

        self.createMeasure = function () {
            var defaultRef = self.refs.RefReferenceHauteur[0];
            return {
                '_id': uuid4.generate(),
                '@class': 'fr.sirs.core.model.MesureMonteeEaux',
                'date': new Date().toISOString(),
                'referenceHauteurId': defaultRef ? defaultRef.id : undefined,
                'hauteur': 0
            };
        };

        self.save = function () {
            //@hb Add the source of the Desordre
            if (objectDoc['@class'] === "fr.sirs.core.model.Desordre") {
                objectDoc["sourceId"] = "RefSource:4";
            }

            objectDoc.valid = false;
            // return to edit mode
            objectDoc.linearId = null;

            EditionService.saveObject(objectDoc).then(function () {
                MapManager.syncAllAppLayer();
                $location.path('/main');
            });
        };

        self.delete = function () {
            LocalDocument.remove(objectDoc).then(function () {
                $location.path('/main');
            });
        };

        self.changeObjectType = function () {
            if (self.isLinear) {
                delete objectDoc.positionFin;
            } else {
                objectDoc.positionFin = objectDoc.positionDebut;
            }
        };

        // Geolocation
        // ----------

        self.geoloc = undefined;

        self.locateMe = function () {
            $ionicLoading.show({template: 'En attente de localisation...'});
            navigator.geolocation.getCurrentPosition(function (position) {
                $timeout(function () {
                    self.handlePos(position.coords);
                    $ionicLoading.hide();
                });
            }, function (error) {
                alert('code: ' + error.code + '\n' +
                    'message: ' + error.message + '\n');
                $ionicLoading.hide();
            }, {
                maximumAge: 20000,
                timeout: 50000,
                enableHighAccuracy: true
            });
        };

        self.selectPos = function () {
            self.setView('map');
        };

        self.handlePos = function (pos) {
            delete objectDoc.systemeRepId;
            delete objectDoc.borne_debut_aval;
            delete objectDoc.borne_debut_distance;
            delete objectDoc.borneDebutId;
            delete objectDoc.borne_fin_aval;
            delete objectDoc.borne_fin_distance;
            delete objectDoc.borneFinId;

            var coordinate = ol.proj.transform([pos.longitude, pos.latitude], 'EPSG:4326', dataProjection);
            // Point case
            if (!self.isLinear) {
                objectDoc.positionDebut = 'POINT(' + coordinate[0] + ' ' + coordinate[1] + ')';
                objectDoc.positionFin = 'POINT(' + coordinate[0] + ' ' + coordinate[1] + ')';
            } else {
                // Linear case
                if (self.isNew) {
                    objectDoc.positionDebut = 'POINT(' + coordinate[0] + ' ' + coordinate[1] + ')';
                } else {
                    if (self.linearPosEditionHandler.startPoint) {
                        objectDoc.positionDebut = 'POINT(' + coordinate[0] + ' ' + coordinate[1] + ')';
                        self.linearPosEditionHandler.startPoint = false;
                    }

                    if (self.linearPosEditionHandler.endPoint) {
                        objectDoc.positionFin = 'POINT(' + coordinate[0] + ' ' + coordinate[1] + ')';
                        self.linearPosEditionHandler.endPoint = false;
                    }
                }
            }
        };

        self.getEndPointSR = function () {
            return objectDoc.systemeRepId || null;
        };

        self.handlePosByBorne = function (data) {
            delete objectDoc.positionDebut;
            delete objectDoc.positionFin;

            // Point case
            if (!self.isLinear) {
                objectDoc.systemeRepId = data.systemeRepId;
                objectDoc.borne_debut_aval = data.borne_aval === 'true';
                objectDoc.borne_debut_distance = data.borne_distance;
                objectDoc.borneDebutId = data.borneId;
                objectDoc.borne_fin_aval = data.borne_aval === 'true';
                objectDoc.borne_fin_distance = data.borne_distance;
                objectDoc.borneFinId = data.borneId;
            } else {
                // Linear case
                if (self.isNew) {
                    objectDoc.systemeRepId = data.systemeRepId;
                    objectDoc.borne_debut_aval = data.borne_aval === 'true';
                    objectDoc.borne_debut_distance = data.borne_distance;
                    objectDoc.borneDebutId = data.borneId;
                } else {
                    if (self.linearPosEditionHandler.startPoint) {
                        objectDoc.systemeRepId = data.systemeRepId;
                        objectDoc.borne_debut_aval = data.borne_aval === 'true';
                        objectDoc.borne_debut_distance = data.borne_distance;
                        objectDoc.borneDebutId = data.borneId;
                        self.linearPosEditionHandler.startPoint = false;
                    }

                    if (self.linearPosEditionHandler.endPoint) {
                        objectDoc.borne_fin_aval = data.borne_aval === 'true';
                        objectDoc.borne_fin_distance = data.borne_distance;
                        objectDoc.borneFinId = data.borneId;
                        self.linearPosEditionHandler.endPoint = false;
                    }
                }
            }
        };

        self.getStartPos = function () {
            return objectDoc.positionDebut ? parsePos(objectDoc.positionDebut) : undefined;
        };

        self.getEndPos = function () {
            return objectDoc.positionFin ? parsePos(objectDoc.positionFin) : undefined;
        };

        self.getStartPosBorne = function () {
            return objectDoc.borneDebutId ? objectDoc.borneDebutId : 'à definir';
        };

        self.getEndPosBorne = function () {
            return objectDoc.borneFinId ? objectDoc.borneFinId : 'à definir';
        };

        function parsePos(position) {
            var strings = position.substring(6, position.length - 1).split(' '),
                numbers = [parseFloat(strings[0]), parseFloat(strings[1])];
            return ol.proj.transform(numbers, dataProjection, 'EPSG:4326');
        }

        $ionicModal.fromTemplateUrl('borne-position.html', {
            scope: $scope,
            animation: 'slide-in-up',
            backdropClickToClose: false
        }).then(function (modal) {
            self.positionBySRModal = modal;
        });

        self.selectPosBySR = function () {
            self.positionBySRModal.show();
            // Create borne position
            if (!objectDoc.systemeRepId) {
                $rootScope.$broadcast("borneModalData", {
                    systemeRepId: '',
                    borne_aval: '',
                    borne_distance: '',
                    borneId: ''
                });
            }

            // Edit Debut
            if (objectDoc.systemeRepId && !self.linearPosEditionHandler.endPoint) {
                $rootScope.$broadcast("borneModalData", {
                    systemeRepId: objectDoc.systemeRepId,
                    borne_aval: objectDoc.borne_debut_aval ? 'true' : 'false',
                    borne_distance: objectDoc.borne_debut_distance,
                    borneId: objectDoc.borneDebutId
                });
            }
            // Edit fin
            if (objectDoc.systemeRepId && self.linearPosEditionHandler.endPoint) {
                $rootScope.$broadcast("borneModalData", {
                    systemeRepId: objectDoc.systemeRepId,
                    borne_aval: objectDoc.borne_fin_aval ? 'true' : 'false',
                    borne_distance: objectDoc.borne_fin_distance,
                    borneId: objectDoc.borneFinId
                });
            }

        };

        // Medias
        // ----------

        self.mediaPath = null;

        //@hb get the value of Orientation & Côté from the Data Base
        self.goToMedia = function () {
            self.setView('media');
        };

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

        self.loaded = {};

        window.b64toBlob = function (b64Data, contentType, sliceSize) {
            contentType = contentType || '';
            sliceSize = sliceSize || 512;

            var byteCharacters = atob(b64Data);
            var byteArrays = [];

            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);

                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);

                byteArrays.push(byteArray);
            }

            var blob = new Blob(byteArrays, {type: contentType});
            return blob;
        };

        self.loadImage = function (photo) {
            var image_url = self.getPhotoPath(photo);
            $.ajax({
                url: image_url, type: 'HEAD',
                error: function () {
                    if (self.doc._attachments) {
                        var keyAttachment = null;
                        var objAttachment;
                        angular.forEach(Object.keys(self.doc._attachments), function (key) {
                            if (key.indexOf(photo.id) != -1) {
                                keyAttachment = key;
                            }
                        });
                        objAttachment = self.doc._attachments[keyAttachment];
                        if (objAttachment) {
                            LocalDocument.getAttachment(self.doc._id, keyAttachment)
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
                                                    self.showContent = true;
                                                    $scope.$apply();
                                                }, 10);
                                            }, function () {
                                                console.log('cannot write the data to the file');
                                            });
                                        });
                                    });
                                });
                        } else {
                            console.log("no attachment exit to load image");
                        }
                    }
                },
                success: function () {
                    window.setTimeout(function () {
                        window.setTimeout(function () {
                            self.loaded[photo.id] = true;
                            $scope.$digest();
                        }, 100);
                    }, 10);
                }
            });
        };

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
                    objectDoc.photos = objectDoc.photos || [];

                    // Store the photo in the object document.
                    objectDoc.photos.push({
                        'id': photoId,
                        '@class': 'fr.sirs.core.model.Photo',
                        'date': $filter('date')(new Date(), 'yyyy-MM-dd'),
                        'chemin': '/' + fileName,
                        'valid': false
                    });

                    objectDoc._attachments = objectDoc._attachments || {};

                    var xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        var reader = new FileReader();
                        reader.onloadend = function () {
                            // Save the photo like attachment to the object
                            objectDoc._attachments[photoId] = {
                                content_type: 'image/jpeg',
                                data: reader.result
                            };
                        };

                        reader.readAsDataURL(xhr.response);
                    };
                    xhr.open('GET', self.getPhotoPath(objectDoc.photos[objectDoc.photos.length - 1]));
                    xhr.responseType = 'blob';
                    xhr.send();

                    // Force digest.
                    $scope.$digest();
                });
            });
        }

        $ionicPlatform.ready(function () {
            // Acquire the medias storage path when the device is ready.
            self.mediaPath = window.cordova.file.externalDataDirectory + 'medias';
        });
    })
    .controller('ObjectEditPosController', function (currentView) {

        var self = this;


        self.success = angular.noop;

        self.exit = angular.noop;


        self.setup = function (success, exit) {
            self.success = success;
            self.exit = exit;
        };

        self.validate = function () {
            var coordinate = ol.proj.transform(currentView.getCenter(), 'EPSG:3857', 'EPSG:4326');
            self.success({
                longitude: coordinate[0],
                latitude: coordinate[1],
                accuracy: -1
            });
            self.exit();
        }
    })
    .controller('ObjectEditPosByBorneController', function ($rootScope, $scope, $ionicPopup, currentView, PouchService, $timeout) {

        var self = this;

        self.data = {
            systemeRepId: '',
            borneId: '',
            borne_aval: '',
            borne_distance: ''
        };

        self.selectSR = function () {
            self.data.systemeRepId = self.systemeReperageId;
            self.systemeReperage = self.systemeReperageList.filter(function (item) {
                return item.id === self.data.systemeRepId;
            })[0].doc;


            PouchService.getLocalDB().query('getBornesIdsHB', {
                keys: self.systemeReperage.systemeReperageBornes
                    .map(function (item) {
                        return item.borneId;
                    })
            }).then(function (res) {
                angular.forEach(self.systemeReperage.systemeReperageBornes, function (item1) {
                    angular.forEach(res.rows, function (item2) {
                        if (item1.borneId === item2.id) {
                            item1.libelle = item2.value.libelle;
                        }
                    });
                });
            });
        };

        self.canValidate = function () {
            return self.data.systemeRepId
                && self.data.borneId
                && self.data.borne_aval
                && self.data.borne_distance;
        };

        $rootScope.loadingflag = true;

        PouchService.getLocalDB().query('Element/byClassAndLinear', {
            startkey: ['fr.sirs.core.model.SystemeReperage'],
            endkey: ['fr.sirs.core.model.SystemeReperage', {}],
            include_docs: true
        }).then(function (results) {
            $timeout(function () {
                $rootScope.loadingflag = false;
                self.systemeReperageList = results.rows;
            });
        }).catch(function (err) {
            console.log(err);
            $rootScope.loadingflag = false;
        });

        self.validate = function () {
            if (self.canValidate()) {
                $scope.c.handlePosByBorne(self.data);
                self.closeModal();
            } else {
                $ionicPopup.alert({
                    title: 'Validation',
                    template: 'Veuillez renseigner tous les champs obligatoires avant de valider'
                });
            }
        };

        self.closeModal = function () {
            $scope.c.positionBySRModal.hide();
        };

        $scope.$on("borneModalData", function (evt, data) {
            self.data = data;

            if (self.data.systemeRepId) {
                self.systemeReperageId = self.data.systemeRepId;
                if ($scope.c.linearPosEditionHandler.endPoint) {
                    self.endSR = $scope.c.getEndPointSR();
                } else {
                    self.endSR = null;
                }

                self.systemeReperage = self.systemeReperageList.filter(function (item) {
                    return item.id === self.data.systemeRepId;
                })[0].doc;

            }

            if (!self.data.systemeRepId) {
                self.systemeReperageId = null;
            }
        });
    })
    .controller('MediaController', function ($window, SirsDoc, $ionicLoading, $filter,
                                             uuid4, $ionicPlatform, $scope, GeolocationService, AuthService) {
        var self = this;

        var dataProjection = SirsDoc.get().epsgCode;

        self.showText = $scope.c.showText;

        self.orientations = $scope.c.orientations;

        self.cotes = $scope.c.cotes;

        self.back = function () {
            $scope.c.setView('form');
        };

        self.save = function () {
            if (angular.isUndefined($scope.c.doc.photos)) {
                $scope.c.doc.photos = [];
            }

            $scope.c.doc.photos.push(self.mediaOptions);

            $scope.c.doc._attachments = $scope.c.doc._attachments || {};

            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                var reader = new FileReader();
                reader.onloadend = function () {
                    // Save the photo like attachment to the object
                    $scope.c.doc._attachments[self.mediaOptions.id] = {
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

        self.drawNote = function () {
            self.setView('note');
        };

        self.saveNote = savePicture;

        function photoCaptureSuccess(imageURI) {
            window.resolveLocalFileSystemURL(imageURI, savePicture);
        }

        self.getPhotoPath = function (photo) {
            var path = photo.chemin.replace(/\\/g, '/');
            if (path.charAt(0) !== '/') {
                path = '/' + path;
            }
            return self.mediaPath + path;
        };

        function photoCaptureError() {
            // TODO → handle error
        }

        function savePicture(imageFile) {
            //Check image size
            imageFile.file(function (fileObj) {
                if (fileObj.size > 1048576) {
                    $cordovaToast
                        .showLongTop("S'il vous plaît, il faut choisir une image inférieure à 1,2 Mo");
                } else {
                    if (!self.mediaPath) {
                        return;
                    }
                    window.resolveLocalFileSystemURL(self.mediaPath, function (targetDir) {
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
    });
