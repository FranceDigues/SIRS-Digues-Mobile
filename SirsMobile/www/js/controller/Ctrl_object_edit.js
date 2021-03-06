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
                                        keys.push([layerModel.filterValue, key.id]);
                                    });

                                    promise = LocalDocument.query('ElementSpecial3', {
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
                                    keys: localStorageService.get("AppTronconsFavorities") === null ? [] : localStorageService
                                        .get("AppTronconsFavorities").map(function (item) {
                                            return item.id;
                                        })
                                }).then(
                                    function (results) {
                                        return results.map(createAppFeatureModel);
                                    },
                                    function (error) {
                                        console.log(error);
                                    });
                            } else {
                                promise = LocalDocument.query('getBornesFromTronconID', {
                                    keys: localStorageService.get("AppTronconsFavorities") === null ? [] : localStorageService
                                        .get("AppTronconsFavorities").map(function (item) {
                                            return item.id;
                                        })
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
    .service('DrawPolygonMapManager', function DrawPolygonMapManager($rootScope, BackLayerService, featureCache,
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
                                        keys.push([layerModel.filterValue, key.id]);
                                    });

                                    promise = LocalDocument.query('ElementSpecial3', {
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
                                    keys: localStorageService.get("AppTronconsFavorities") === null ? [] : localStorageService
                                        .get("AppTronconsFavorities").map(function (item) {
                                            return item.id;
                                        })
                                }).then(
                                    function (results) {
                                        return results.map(createAppFeatureModel);
                                    },
                                    function (error) {
                                        console.log(error);
                                    });
                            } else {
                                promise = LocalDocument.query('getBornesFromTronconID', {
                                    keys: localStorageService.get("AppTronconsFavorities") === null ? [] : localStorageService
                                        .get("AppTronconsFavorities").map(function (item) {
                                            return item.id;
                                        })
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

            var vectorSource = new ol.source.Vector({wrapX: false});

            var vectorLayer = new ol.layer.Vector({
                source: vectorSource
            });

            self.vectorLayer = vectorLayer;

            return {
                view: currentView,
                layers: [olLayer, appLayers, vectorLayer],
                controls: [],
                interactions: [new ol.interaction.DragPan(), new ol.interaction.Draw({
                    source: vectorSource,
                    type: 'Polygon'
                })]
            };
        };
    })
    .controller('ObjectEditController', function ObjectEditController($scope, $rootScope, $location, $ionicScrollDelegate,
                                                                      $ionicLoading, $ionicPlatform, $cordovaFile,
                                                                      $routeParams, GeolocationService, LocalDocument,
                                                                      EditionService, objectDoc, refTypes,
                                                                      uuid4, SirsDoc, $ionicModal, orientationsList, $filter,
                                                                      cotesList, MapManager, PouchService,
                                                                      $timeout, GlobalConfig, localStorageService, $q,
                                                                      $ionicPopup, $cordovaToast, BorneService) {

            var self = this;

            $rootScope.loadingflag = false;

            var dataProjection = SirsDoc.get().epsgCode;

            var wktFormat = new ol.format.WKT();

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

            self.dateWrapper = null;

            // Hack for borne fin data without borneFinId
            if (angular.isDefined(objectDoc.borne_fin_aval) && angular.isDefined(objectDoc.borne_fin_distance) && !objectDoc.borneFinId) {
                objectDoc.borneFinId = objectDoc.borneDebutId;
                objectDoc.borne_fin_aval = objectDoc.borne_debut_aval;
                objectDoc.borne_fin_distance = objectDoc.borne_debut_distance;
            }


            self.doc = objectDoc;

            self.isNew = !$routeParams.id;

            self.objectType = objectDoc['@class']
                .substring(objectDoc['@class'].lastIndexOf('.') + 1);

            self.isClosed = (!!objectDoc.positionFin || !!objectDoc.geometry || !!objectDoc.borneFinId);

            if (self.isNew) {
                self.isLinear = false;
            } else {
                if (objectDoc.positionDebut && objectDoc.positionFin && objectDoc.positionDebut === objectDoc.positionFin) {
                    self.isLinear = false;
                } else if (objectDoc.borneDebutId && objectDoc.borneFinId
                    && (objectDoc.borneDebutId === objectDoc.borneFinId
                        || objectDoc.borne_debut_aval === objectDoc.borne_fin_aval
                        || objectDoc.borne_debut_distance === objectDoc.borne_fin_distance)) {
                    self.isLinear = false;
                } else {
                    self.isLinear = true;
                }
            }

            self.refs = refTypes;

            self.isDependance = function () {
                return self.doc['@class'].toLowerCase().indexOf('dependance') > -1;
            };

            // Check if the object is dependences
            if (self.isDependance()) {
                delete self.doc.linearId;

                if (!self.doc.geometry) {
                    self.objDependanceType = 'point';
                } else {
                    if (self.doc.geometry.toUpperCase().indexOf('POLYGON') > -1 || self.doc.geometry.toUpperCase().indexOf('MULTIPOLYGON') > -1) {
                        self.objDependanceType = 'polygon';
                    } else if (self.doc.geometry.toUpperCase().indexOf('POINT') > -1 || self.doc.geometry.toUpperCase().indexOf('MULTIPOINT') > -1) {
                        self.objDependanceType = 'point';
                    } else {
                        self.objDependanceType = 'line';
                    }
                }


                if (self.doc['@class'] === 'fr.sirs.core.model.DesordreDependance') {
                    self.doc.dependanceId = null;
                    var promises = [];
                    promises.push(PouchService.getLocalDB().query('Element/byClassAndLinear', {
                            startkey: ['fr.sirs.core.model.CheminAccesDependance'],
                            endkey: ['fr.sirs.core.model.CheminAccesDependance', {}],
                            include_docs: true
                        }),
                        PouchService.getLocalDB().query('Element/byClassAndLinear', {
                            startkey: ['fr.sirs.core.model.OuvrageVoirieDependance'],
                            endkey: ['fr.sirs.core.model.OuvrageVoirieDependance', {}],
                            include_docs: true
                        }),
                        PouchService.getLocalDB().query('Element/byClassAndLinear', {
                            startkey: ['fr.sirs.core.model.AutreDependance'],
                            endkey: ['fr.sirs.core.model.AutreDependance', {}],
                            include_docs: true
                        }),
                        PouchService.getLocalDB().query('Element/byClassAndLinear', {
                            startkey: ['fr.sirs.core.model.AireStockageDependance'],
                            endkey: ['fr.sirs.core.model.AireStockageDependance', {}],
                            include_docs: true
                        })
                    );

                    $q.all(promises)
                        .then(function (results) {
                            $timeout(function () {
                                self.dependances = [];
                                results.map(function (item) {
                                    item.rows.map(function (elt) {
                                        self.dependances.push(elt);
                                    })
                                });
                                $rootScope.loadingflag = false;
                            }, 100);
                        }).catch(function (err) {
                        console.log(err);
                        $rootScope.loadingflag = false;
                    });
                }
            }

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

            self.linearPosEditionHandler = {
                startPoint: false,
                endPoint: false
            };

            self.config = GlobalConfig.config;

            self.showText = function (type) {
                return self.config.showText === type;
            };

            self.activatedPositionButton = function () {
                return self.doc && (self.doc.linearId || self.isDependance());
            };

            self.activatedGPSPositionButton = function () {
                return self.doc;
            };

            self.troncons = [];
            self.allTroncons = [];

            self.initTronconList = function () {
                self.troncons = localStorageService.get("AppTronconsFavorities");
                self.allTroncons = localStorageService.get("AppTronconsFavorities");
            };

            self.initTronconList();

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
                        geom = new ol.format.WKT().readGeometry(elt.geometry, {
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
                        nearTronconList.push(elt);
                    }
                });
                // The list of the nearest Troncons
                return nearTronconList;
            }

            $scope.$watch(function () {
                return self.doc.positionDebut;
            }, function (newValue) {
                if (angular.isDefined(newValue)) {
                    self.troncons = calculateDistanceObjectTroncon(
                        newValue,
                        self.allTroncons);
                } else {
                    self.troncons = self.allTroncons;
                }
            });

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
                if (!self.isDependance() && !self.doc.linearId) {
                    $cordovaToast
                        .showLongTop("Veuillez choisir un tronçon de rattachement pour cet objet");
                    return;
                }

                if ((!self.isDependance() && !objectDoc.positionDebut && !objectDoc.borneDebutId) || (self.isDependance() && !objectDoc.geometry)) {
                    $cordovaToast
                        .showLongTop("Veuillez choisir une position pour cet objet, avant de continuer");
                    return;
                }

                //@hb Add the source of the Desordre
                if (objectDoc['@class'] === "fr.sirs.core.model.Desordre") {
                    objectDoc["sourceId"] = "RefSource:4";
                }

                objectDoc.valid = false;

                objectDoc.dateMaj = new Date().toISOString().split('T')[0];

                objectDoc.editMode = true;

                delete objectDoc.prDebut;

                delete objectDoc.prFin;

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
                    delete objectDoc.approximatePositionFin;
                } else {
                    objectDoc.positionFin = objectDoc.positionDebut;
                    objectDoc.approximatePositionFin = objectDoc.approximatePositionDebut;
                }
            };

            self.changeObjectTypeDependance = function () {
                if (self.objDependanceType === 'line') {
                    delete objectDoc.positionFin;
                    delete objectDoc.approximatePositionFin;
                } else if (self.objDependanceType === 'point') {
                    objectDoc.positionFin = objectDoc.positionDebut;
                    objectDoc.approximatePositionFin = objectDoc.approximatePositionDebut;
                } else {
                    delete objectDoc.positionFin;
                    delete objectDoc.positionDebut;
                    delete objectDoc.approximatePositionFin;
                    delete objectDoc.approximatePositionDebut;
                }
                delete objectDoc.geometry;
            };

            self.drawPolygon = function () {
                $ionicPopup.confirm({
                    title: 'Localisation manuelle',
                    template: "Voulez vous localiser l'\objet manuellement ? Cette opération va écraser les anciennes valeurs de localisation"
                }).then(function (confirmed) {
                    if (confirmed) {
                        self.setView('drawMap');
                    }
                });
            };

            self.handleDrawPolygon = function (geometry) {
                objectDoc.geometry = geometry;
            };


// Geolocation
// ----------

            self.geoloc = undefined;

            self.locateMe = function () {
                $ionicLoading.show({template: 'En attente de localisation...'});
                navigator.geolocation.getCurrentPosition(function (position) {
                    $timeout(function () {
                        if (self.isDependance()) {
                            self.handlePosDependance(position.coords);
                        } else {
                            self.handlePos(position.coords);
                        }
                        $ionicLoading.hide();
                    });
                }, function (error) {
                    // alert('code: ' + error.code + '\n' +
                    //     'message: ' + error.message + '\n');
                    $ionicLoading.hide();
                }, {
                    maximumAge: 20000,
                    timeout: 50000,
                    enableHighAccuracy: true
                });
            };

            self.locateMeEnd = function () {
                $ionicLoading.show({template: 'En attente de localisation...'});
                navigator.geolocation.getCurrentPosition(function (position) {
                    $timeout(function () {
                        self.handlePosDependanceEnd(position.coords);
                        $ionicLoading.hide();
                    });
                }, function (error) {
                    // alert('code: ' + error.code + '\n' +
                    //     'message: ' + error.message + '\n');
                    $ionicLoading.hide();
                }, {
                    maximumAge: 20000,
                    timeout: 50000,
                    enableHighAccuracy: true
                });
            };

            self.selectPos = function () {
                $ionicPopup.confirm({
                    title: 'Localisation manuelle',
                    template: "Voulez vous localiser l'\objet manuellement ? Cette opération va écraser les anciennes valeurs de localisation"
                }).then(function (confirmed) {
                    if (confirmed) {
                        self.setView('map');
                    }
                });
            };

            self.selectPosEnd = function () {
                $ionicPopup.confirm({
                    title: 'Localisation manuelle',
                    template: "Voulez vous localiser l'\objet manuellement ? Cette opération va écraser les anciennes valeurs de localisation"
                }).then(function (confirmed) {
                    if (confirmed) {
                        self.setView('mapEnd');
                    }
                });
            };

            self.handlePos = function (pos) {
                delete objectDoc.systemeRepId;
                delete objectDoc.borne_debut_aval;
                delete objectDoc.borne_debut_distance;
                delete objectDoc.borneDebutId;
                delete objectDoc.borne_fin_aval;
                delete objectDoc.borne_fin_distance;
                delete objectDoc.borneFinId;
                delete objectDoc.borneDebutLibelle;
                delete objectDoc.borneFinLibelle;
                delete objectDoc.approximatePositionDebut;
                delete objectDoc.approximatePositionFin;

                objectDoc.editedGeoCoordinate = true;

                var coordinate = ol.proj.transform([pos.longitude, pos.latitude], 'EPSG:4326', dataProjection);
                // Point case
                if (!self.isLinear) {
                    objectDoc.positionDebut = 'POINT(' + coordinate[0] + ' ' + coordinate[1] + ')';
                    objectDoc.positionFin = 'POINT(' + coordinate[0] + ' ' + coordinate[1] + ')';
                } else {
                    // Linear case
                    if (self.linearPosEditionHandler.startPoint) {
                        objectDoc.positionDebut = 'POINT(' + coordinate[0] + ' ' + coordinate[1] + ')';
                        self.linearPosEditionHandler.startPoint = false;
                    }

                    if (self.linearPosEditionHandler.endPoint) {
                        objectDoc.positionFin = 'POINT(' + coordinate[0] + ' ' + coordinate[1] + ')';
                        self.linearPosEditionHandler.endPoint = false;
                        if (!objectDoc.positionDebut && objectDoc.positionFin) {
                            objectDoc.positionDebut = objectDoc.positionFin;
                        }
                    }
                }

            };

            self.handlePosDependance = function (pos) {
                delete objectDoc.systemeRepId;
                delete objectDoc.borne_debut_aval;
                delete objectDoc.borne_debut_distance;
                delete objectDoc.borneDebutId;
                delete objectDoc.borne_fin_aval;
                delete objectDoc.borne_fin_distance;
                delete objectDoc.borneFinId;
                delete objectDoc.borneDebutLibelle;
                delete objectDoc.borneFinLibelle;
                delete objectDoc.approximatePositionDebut;
                delete objectDoc.approximatePositionFin;
                delete objectDoc.positionDebut;
                delete objectDoc.positionFin;

                var coordinate = ol.proj.transform([pos.longitude, pos.latitude], 'EPSG:4326', dataProjection);
                // Point case
                if (self.objDependanceType === 'point') {
                    objectDoc.geometry = 'POINT(' + coordinate[0] + ' ' + coordinate[1] + ')';
                } else {
                    // Linear case
                    if (objectDoc.geometry && objectDoc.geometry.toUpperCase().indexOf('LINESTRING') > -1) {
                        var geometry = wktFormat.readGeometry(objectDoc.geometry);

                        geometry.setCoordinates([coordinate, geometry.getLastCoordinate()]);

                        objectDoc.geometry = wktFormat.writeGeometry(geometry);
                    } else {
                        objectDoc.geometry = 'LINESTRING(' + coordinate[0] + ' ' + coordinate[1] + ')';
                    }
                }

            };

            self.handlePosDependanceEnd = function (pos) {
                delete objectDoc.systemeRepId;
                delete objectDoc.borne_debut_aval;
                delete objectDoc.borne_debut_distance;
                delete objectDoc.borneDebutId;
                delete objectDoc.borne_fin_aval;
                delete objectDoc.borne_fin_distance;
                delete objectDoc.borneFinId;
                delete objectDoc.borneDebutLibelle;
                delete objectDoc.borneFinLibelle;
                delete objectDoc.approximatePositionDebut;
                delete objectDoc.approximatePositionFin;
                delete objectDoc.positionDebut;
                delete objectDoc.positionFin;

                var coordinate = ol.proj.transform([pos.longitude, pos.latitude], 'EPSG:4326', dataProjection);

                var geometry = wktFormat.readGeometry(objectDoc.geometry);

                geometry.setCoordinates([geometry.getFirstCoordinate(), coordinate]);

                objectDoc.geometry = wktFormat.writeGeometry(geometry);

            };

            self.getEndPointSR = function () {
                return objectDoc.systemeRepId || null;
            };

            self.handlePosByBorne = function (data) {
                delete objectDoc.positionDebut;
                delete objectDoc.positionFin;
                delete objectDoc.geometry;
                delete objectDoc.longitudeMin;
                delete objectDoc.longitudeMax;
                delete objectDoc.latitudeMin;
                delete objectDoc.latitudeMax;
                delete objectDoc.geometryMode;
                objectDoc.editedGeoCoordinate = false;
                objectDoc.foreignParentId = self.doc.linearId;


                // Point case
                if (!self.isLinear) {
                    objectDoc.systemeRepId = data.systemeRepId;
                    objectDoc.borne_debut_aval = data.borne_aval === 'true';
                    objectDoc.borne_debut_distance = data.borne_distance;
                    objectDoc.borneDebutId = data.borneId;
                    objectDoc.borne_fin_aval = data.borne_aval === 'true';
                    objectDoc.borne_fin_distance = data.borne_distance;
                    objectDoc.borneFinId = data.borneId;
                    objectDoc.borneDebutLibelle = data.borneLibelle;
                    objectDoc.borneFinLibelle = data.borneLibelle;
                    // Calculate the approximate position
                    objectDoc.approximatePositionDebut = data.approximatePosition;
                    objectDoc.approximatePositionFin = data.approximatePosition;
                    self.fillBorneDebutLabel();
                    self.fillBorneFinLabel();
                } else {
                    if (self.linearPosEditionHandler.startPoint || self.isNew) {
                        objectDoc.systemeRepId = data.systemeRepId;
                        objectDoc.borne_debut_aval = data.borne_aval === 'true';
                        objectDoc.borne_debut_distance = data.borne_distance;
                        objectDoc.borneDebutId = data.borneId;
                        self.linearPosEditionHandler.startPoint = false;
                        objectDoc.borneDebutLibelle = data.borneLibelle;
                        // Calculate the approximate position
                        objectDoc.approximatePositionDebut = data.approximatePosition;
                        self.fillBorneDebutLabel();
                    }
                    if (self.linearPosEditionHandler.endPoint) {
                        objectDoc.borne_fin_aval = data.borne_aval === 'true';
                        objectDoc.borne_fin_distance = data.borne_distance;
                        objectDoc.borneFinId = data.borneId;
                        self.linearPosEditionHandler.endPoint = false;
                        objectDoc.borneFinLibelle = data.borneLibelle;
                        // Calculate the approximate position
                        objectDoc.approximatePositionFin = data.approximatePosition;
                        self.fillBorneFinLabel();
                    }

                }
            };

            self.getStartPos = function () {
                return objectDoc.positionDebut ? parsePos(objectDoc.positionDebut) : undefined;
            };

            self.getStartPosDependance = function () {
                return objectDoc.geometry ? parsePos(objectDoc.geometry) : undefined;
            };

            self.getEndPosDependance = function () {
                return objectDoc.geometry ? parsePosEnd(objectDoc.geometry) : undefined;
            };

            self.getEndPos = function () {
                return objectDoc.positionFin ? parsePos(objectDoc.positionFin) : undefined;
            };

            self.startPosBorneLabel = '';

            self.getStartPosBorne = function () {
                return self.startPosBorneLabel;
            };

            self.endPosBorneLabel = '';
            self.getEndPosBorne = function () {
                return self.endPosBorneLabel;
            };

            function parsePos(position) {
                var geometry = wktFormat.readGeometry(position);
                return ol.proj.transform(geometry.getFirstCoordinate(), dataProjection, 'EPSG:4326');
            }

            function parsePosEnd(position) {
                var geometry = wktFormat.readGeometry(position);
                return ol.proj.transform(geometry.getLastCoordinate(), dataProjection, 'EPSG:4326');
            }

            $ionicModal.fromTemplateUrl('borne-position.html', {
                scope: $scope,
                animation: 'slide-in-up',
                backdropClickToClose: false
            }).then(function (modal) {
                self.positionBySRModal = modal;
            });

            self.selectPosBySR = function () {
                BorneService.context = self;
                self.positionBySRModal.show();
                // Create borne position
                if (!objectDoc.systemeRepId) {
                    $rootScope.$broadcast("borneModalData", {
                        systemeRepId: '',
                        borne_aval: '',
                        borne_distance: 0,
                        borneId: '',
                        borneLibelle: ''
                    });
                }

                // Edit Debut
                if (objectDoc.systemeRepId && !self.linearPosEditionHandler.endPoint) {
                    $rootScope.$broadcast("borneModalData", {
                        systemeRepId: objectDoc.systemeRepId,
                        borne_aval: objectDoc.borne_debut_aval ? 'true' : 'false',
                        borne_distance: objectDoc.borne_debut_distance,
                        borneId: objectDoc.borneDebutId,
                        borneLibelle: objectDoc.borneDebutLibelle || ''
                    });
                }
                // Edit fin
                if (objectDoc.systemeRepId && self.linearPosEditionHandler.endPoint) {
                    $rootScope.$broadcast("borneModalData", {
                        systemeRepId: objectDoc.systemeRepId,
                        borne_aval: objectDoc.borne_fin_aval ? 'true' : 'false',
                        borne_distance: objectDoc.borne_fin_distance,
                        borneId: objectDoc.borneFinId,
                        borneLibelle: objectDoc.borneFinLibelle || ''
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
                                                        $scope.$apply();
                                                    }, 100);
                                                    setTimeout(function () {
                                                        self.showContent = true;
                                                        $scope.$apply();
                                                    }, 500);
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
                                $scope.$apply();
                            }, 100);
                        }, 100);
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
                            '@class': 'fr.sirs.core.model' + (self.objectType === 'DesordreDependance' ? '.PhotoDependance' : '.Photo'),
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

            self.formatDate = function () {
                self.doc.date_fin = self.dateWrapper.toISOString().split('T')[0];
            };

            self.removePhoto = function (photo, index) {
                $ionicPopup.confirm({
                    title: 'Suppression d\'une photo',
                    template: 'Voulez vous vraiment supprimer cette photo ?'
                }).then(function (confirmed) {
                    if (confirmed) {
                        self.doc.photos.splice(index, 1);

                        if (self.doc._attachments) {
                            delete self.doc._attachments[photo.id];
                        }

                        self.doc.valid = false;

                        self.doc.dateMaj = new Date().toISOString().split('T')[0];

                        self.doc.editMode = true;

                        EditionService.saveObject(self.doc)
                            .then(function () {
                            });
                    }
                });
            };

            self.getApproximatePosition = function (borneId, borneAval, borneDistance, flag) {
                var deferred = $q.defer();
                var troncon = self.troncons.find(function (item) {
                    return item.id === self.doc.linearId;
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

                        if (!borneAval) {
                            // Aval object
                            y = (index === systemeReperage.value.systemeReperageBornes.length - 1)
                                ? wktFormat.readGeometry(systemeReperage.value.systemeReperageBornes[index].borneGeometry).getCoordinates()
                                : wktFormat.readGeometry(systemeReperage.value.systemeReperageBornes[index + 1].borneGeometry).getCoordinates();
                        } else {
                            // Amont object
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

            self.fillBorneDebutLabel = function () {
                if (objectDoc.borneDebutId) {
                    PouchService.getLocalDB().query('byId', {
                        key: objectDoc.borneDebutId
                    }).then(function (results) {
                        var libelle = results.rows && results.rows.length ? results.rows[0].value.libelle : '';
                        self.startPosBorneLabel = objectDoc.borneDebutId ? 'à ' + objectDoc.borne_debut_distance + ' m de la borne : ' +
                            libelle + ' en ' + (objectDoc.borne_debut_aval ? 'amont' : 'aval') : 'à definir';
                        $scope.$apply();

                    }, function (err) {
                        console.error(err);
                    });
                }
            };

            self.fillBorneDebutLabel();

            self.fillBorneFinLabel = function () {
                if (objectDoc.borneFinId) {
                    PouchService.getLocalDB().query('byId', {
                        key: objectDoc.borneFinId
                    }).then(function (results) {
                        var libelle = results.rows && results.rows.length ? results.rows[0].value.libelle : '';

                        self.endPosBorneLabel = objectDoc.borneFinId ? 'à ' + objectDoc.borne_fin_distance + ' m de la borne : ' +
                            libelle + ' en ' + (objectDoc.borne_fin_aval ? 'amont' : 'aval') : 'à definir';

                        $scope.$apply();

                    });
                }
            };

            self.fillBorneFinLabel();

            $ionicPlatform.ready(function () {
                // Acquire the medias storage path when the device is ready.
                self.mediaPath = window.cordova.file.externalDataDirectory + 'medias';

                /**
                 * Hack to make the old data the same model of the new objects
                 * @type {boolean}
                 */

                if (objectDoc.borneDebutId && !objectDoc.borneDebutLibelle) {
                    $rootScope.loadingflag = true;
                    PouchService.getLocalDB().query('byId', {
                        key: objectDoc.borneDebutId
                    }).then(function (results) {
                        objectDoc.borneDebutLibelle = results.rows && results.rows.length ? results.rows[0].value.libelle : '';
                        if (objectDoc.borneFinId && !objectDoc.borneFinLibelle) {
                            PouchService.getLocalDB().query('byId', {
                                key: objectDoc.borneFinId
                            }).then(function (results) {
                                objectDoc.borneFinLibelle = results.rows && results.rows.length ? results.rows[0].value.libelle : '';
                                /**
                                 * Hack to calculate the approximate position when the object is aligned with bornes
                                 */
                                if (objectDoc.borneDebutId && !objectDoc.approximatePositionDebut && !objectDoc.positionDebut) {
                                    self.getApproximatePosition(objectDoc.borneDebutId,
                                        objectDoc.borne_debut_aval,
                                        objectDoc.borne_debut_distance, 'approximatePositionDebut')
                                        .then(function () {
                                            if (objectDoc.borneFinId && !objectDoc.approximatePositionFin && !objectDoc.positionFin) {
                                                self.getApproximatePosition(objectDoc.borneFinId,
                                                    objectDoc.borne_fin_aval,
                                                    objectDoc.borne_fin_distance, 'approximatePositionFin')
                                                    .then(function () {
                                                        $rootScope.loadingflag = false;
                                                    });
                                            } else {
                                                $rootScope.loadingflag = false;
                                                $scope.$apply();
                                            }
                                        });
                                } else {
                                    $rootScope.loadingflag = false;
                                    $scope.$apply();
                                }
                            });
                        }
                    });
                }
            });

            $scope.$on("$destroy", function () {
                $rootScope.reloadMain = true;
            });

        }
    )
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
    .controller('ObjectDrawPolygonPosController', function (DrawPolygonMapManager) {

        var self = this;

        var wktFormat = new ol.format.WKT();

        self.success = angular.noop;

        self.exit = angular.noop;

        self.setup = function (success, exit) {
            self.success = success;
            self.exit = exit;
        };

        self.validate = function () {
            var features = DrawPolygonMapManager.vectorLayer.getSource().getFeatures();

            if (features.length === 0) {
                return;
            }

            self.success(wktFormat.writeGeometry(features[0].getGeometry()));
            self.exit();
        }
    })
    .controller('ObjectEditPosByBorneController', function ($rootScope, $scope, $ionicPopup, currentView, PouchService, BorneService) {

        var self = this;
        var wktFormat = new ol.format.WKT();

        self.data = {
            systemeRepId: '',
            borneId: '',
            borneLibelle: '',
            borne_aval: '',
            borne_distance: 0,
            approximatePosition: ''
        };

        self.selectSR = function () {
            self.data.systemeRepId = self.systemeReperageId;
            self.systemeReperage = self.systemeReperageList.filter(function (item) {
                return item.id === self.data.systemeRepId;
            })[0];


            PouchService.getLocalDB().query('getBornesIdsHB', {
                keys: self.systemeReperage.value.systemeReperageBornes
                    .map(function (item) {
                        return item.borneId;
                    })
            }).then(function (res) {
                angular.forEach(self.systemeReperage.value.systemeReperageBornes, function (item1) {
                    angular.forEach(res.rows, function (item2) {
                        if (item1.borneId === item2.id) {
                            item1.libelle = item2.value.libelle;
                            item1.borneGeometry = item2.value.geometry;
                        }
                    });
                });
                $rootScope.$apply();
            });
        };

        self.updateBorneLibelle = function () {
            self.data.borneId = self.borneId;

            var index = self.systemeReperage.value.systemeReperageBornes.findIndex(function (item) {
                return item.borneId === self.data.borneId;
            });

            var srb = self.systemeReperage.value.systemeReperageBornes[index];

            self.data.borneLibelle = srb.libelle;

        };

        self.calculateApproximatePosition = function () {
            var index = self.systemeReperage.value.systemeReperageBornes.findIndex(function (item) {
                return item.borneId === self.data.borneId;
            });

            var srb = self.systemeReperage.value.systemeReperageBornes[index];

            // Calculate approximate position
            var x = wktFormat.readGeometry(srb.borneGeometry).getCoordinates();
            var y;

            if (self.data.borne_aval === "true") {
                y = (index === self.systemeReperage.value.systemeReperageBornes.length - 1)
                    ? wktFormat.readGeometry(self.systemeReperage.value.systemeReperageBornes[index].borneGeometry).getCoordinates()
                    : wktFormat.readGeometry(self.systemeReperage.value.systemeReperageBornes[index + 1].borneGeometry).getCoordinates();
            } else {
                y = (index === 0)
                    ? wktFormat.readGeometry(self.systemeReperage.value.systemeReperageBornes[index].borneGeometry).getCoordinates()
                    : wktFormat.readGeometry(self.systemeReperage.value.systemeReperageBornes[index - 1].borneGeometry).getCoordinates();
            }

            var v = glMatrix.vec2.sub([], y, x);

            var vn = glMatrix.vec2.normalize(v, v);

            var vs = glMatrix.vec2.scale(vn, vn, self.data.borne_distance);

            var o = glMatrix.vec2.add([], x, vs);

            return 'POINT(' + o[0] + ' ' + o[1] + ')';
        };

        self.canValidate = function () {
            return self.data.systemeRepId
                && self.data.borneId
                && self.data.borne_aval
                && self.data.borne_distance > -1;
        };

        self.validate = function () {
            if (self.canValidate()) {
                self.data.approximatePosition = self.calculateApproximatePosition();
                BorneService.context.handlePosByBorne(self.data);
                self.closeModal();
            } else {
                $ionicPopup.alert({
                    title: 'Validation',
                    template: 'Veuillez renseigner tous les champs obligatoires avant de valider'
                });
            }
        };

        self.closeModal = function () {
            if (BorneService.context) {
                BorneService.context.positionBySRModal.hide();
                BorneService.context = null;
            }
        };

        $scope.$on("borneModalData", function (evt, data) {
            self.data = data;

            var troncon = $scope.c.troncons.find(function (item) {
                return item.id === $scope.c.doc.linearId;
            });

            $rootScope.loadingflag = true;

            PouchService.getLocalDB().query('byId', {
                key: troncon.systemeRepDefautId
            }).then(function (results) {
                self.systemeReperageList = results.rows;
                $rootScope.loadingflag = false;
                $rootScope.$apply();

                if (self.data.systemeRepId) {
                    self.systemeReperageId = self.data.systemeRepId;
                    self.borneId = self.data.borneId;
                    $rootScope.$apply();
                    if ($scope.c.linearPosEditionHandler.endPoint) {
                        self.endSR = $scope.c.getEndPointSR();
                    } else {
                        self.endSR = null;
                    }

                    self.systemeReperage = self.systemeReperageList.filter(function (item) {
                        return item.id === self.data.systemeRepId;
                    })[0];

                    $rootScope.$apply();

                    if (!self.systemeReperage) {
                        $rootScope.loadingflag = false;
                        return;
                    }

                    PouchService.getLocalDB().query('getBornesIdsHB', {
                        keys: self.systemeReperage.value.systemeReperageBornes
                            .map(function (item) {
                                return item.borneId;
                            })
                    }).then(function (res) {
                        angular.forEach(self.systemeReperage.value.systemeReperageBornes, function (item1) {
                            angular.forEach(res.rows, function (item2) {
                                if (item1.borneId === item2.id) {
                                    item1.libelle = item2.value.libelle;
                                    item1.borneGeometry = item2.value.geometry;
                                }
                            });
                        });
                        $rootScope.loadingflag = false;
                        $rootScope.$apply();
                    });
                }

                if (!self.data.systemeRepId) {
                    self.systemeReperageId = null;
                    self.borneId = null;
                    $rootScope.loadingflag = false;
                }


            }, function (reason) {
                console.log(reason);
                $rootScope.loadingflag = false;
                $rootScope.$apply();
            });

        });
    })
    .controller('MediaController', function ($window, SirsDoc, $ionicLoading, GeolocationService,
                                             uuid4, $ionicPlatform, $scope, AuthService, $filter,
                                             $cordovaToast, EditionService, MapManager, $ionicModal, $rootScope, BorneService) {
        var self = this;

        var dataProjection = SirsDoc.get().epsgCode;

        self.showText = $scope.c.showText;

        self.orientations = $scope.c.orientations;

        self.cotes = $scope.c.cotes;

        self.objectType = $scope.c.objectType;

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
                    if (angular.isUndefined($scope.c.doc._attachments)) {
                        $scope.c.doc._attachments = {};
                    }
                    // Save the photo like attachment to the object
                    $scope.c.doc._attachments[self.mediaOptions.id] = {
                        content_type: 'image/jpeg',
                        data: self.importPhototData.replace('data:image/jpeg;base64,', '')
                    };

                    EditionService.saveObject($scope.c.doc)
                        .then(function () {
                            $scope.c.setView('form');
                            MapManager.syncAllAppLayer();
                        });

                } else {
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        var reader = new FileReader();
                        reader.onloadend = function () {
                            if (angular.isUndefined($scope.c.doc._attachments)) {
                                $scope.c.doc._attachments = {};
                            }
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
                }
            }
        };

        self.selectPos = function () {
            self.setView('map');
        };

        $ionicModal.fromTemplateUrl('borne-position.html', {
            scope: $scope,
            animation: 'slide-in-up',
            backdropClickToClose: false
        }).then(function (modal) {
            self.positionBySRModal = modal;
        });

        self.selectPosBySR = function () {
            BorneService.context = self;
            self.positionBySRModal.show();
            // Create borne position
            if (!self.mediaOptions.systemeRepId) {
                $rootScope.$broadcast("borneModalData", {
                    systemeRepId: '',
                    borne_aval: '',
                    borne_distance: 0,
                    borneId: '',
                    borneLibelle: '',
                    media: true
                });
            }

            // Edit Debut
            if (self.mediaOptions.systemeRepId) {
                $rootScope.$broadcast("borneModalData", {
                    systemeRepId: self.mediaOptions.systemeRepId,
                    borne_aval: self.mediaOptions.borne_debut_aval ? 'true' : 'false',
                    borne_distance: self.mediaOptions.borne_debut_distance,
                    borneId: self.mediaOptions.borneDebutId,
                    borneLibelle: self.mediaOptions.borneDebutLibelle || '',
                    media: true
                });
            }

        };

        self.handlePosByBorne = function (data) {
            delete self.mediaOptions.positionDebut;
            self.mediaOptions.systemeRepId = data.systemeRepId;
            self.mediaOptions.borne_debut_aval = data.borne_aval === 'true';
            self.mediaOptions.borne_debut_distance = data.borne_distance;
            self.mediaOptions.borneDebutId = data.borneId;
            self.mediaOptions.borneDebutLibelle = data.borneLibelle;
        };

        //@hb
        self.mediaOptions = {
            id: '',
            chemin: '',
            designation: "",
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
                self.mediaOptions['@class'] = 'fr.sirs.core.model' + (self.objectType === 'DesordreDependance' ? '.PhotoDependance' : '.Photo');
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
                            self.mediaOptions['@class'] = 'fr.sirs.core.model' + (self.objectType === 'DesordreDependance' ? '.PhotoDependance' : '.Photo');
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
    .directive("refCategorie", RefCategorieDirective)
    .factory("BorneService", function () {
        return {
            context: null
        };
    });

function RefCategorieDirective($filter) {
    return {
        restrict: 'A',
        priority: 100,
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            if (ngModel) {
                ngModel.$parsers.push(function (value) {
                    // return (value | filter:{ categorieId: c.doc.categorieDesordreId }:true)[0]._id
                });

                ngModel.$formatters.push(function (value) {
                    return $filter('radToDeg')(value);
                });
            }
        }
    };
}
