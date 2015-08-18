
angular.module('module_app.controllers.menus.tribord.desordreDetail', [])

    .controller('cDesordreDetail', function cDesordreDetail($log,$ionicScrollDelegate, $cordovaToast, sContext,sPouch) {

        var self = this;

        self.activeTab = 'description';

        self.document = sContext.selectedDocument;
        self.abstract={}
        self.updateAbstract=function(){
            self.abstract={}

            pattern = /.*Id$/;

            angular.forEach(   self.document, function(value, key) {
                $log.debug(key)
                if(pattern.test(key)){
                    $log.debug(key)
                         sPouch.localDb.get(value).then(function(doc){
                            self.abstract[key.substr(0,key.length-2)]= doc.libelle;

                                 $log.debug("self.abstract");
                                 $log.debug(self.abstract);
                        }).catch(function(err){
                                 $log.error(err)
                             }

                    );

                }
            });


        }

        self.updateAbstract();



        self.setActiveTab = function(name) {
            if (name !== self.activeTab) {
                self.activeTab = name;
                $ionicScrollDelegate.$getByHandle('disorderScroll').scrollTop(false);
            }
        };

        self.backToDisorderList = function() {
            sContext.tribordView.active = 'desordreSlct';
        };

        self.openObservationDetails = function() {
            onGetObservationSuccess(); // TODO -> load observation details
        };


        function onGetObservationSuccess() {
            sContext.tribordView.active = 'observationDetail';
        }

        function onGetObservationError() {
            $cordovaToast.showLongBottom('Une erreur s\'est produite.');
        }
    });