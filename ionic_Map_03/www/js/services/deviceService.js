/**
 * Created by roch dardie on 03/04/15.
 */
angular.module('device.services', [])
    .service('sEventSuperviseur', function ($log, $rootScope) {

        var rscpEVS = $rootScope.$new();

        var me = this;

        //choper les calque dans un json
        me.event = {
            sideMenu: false,
            mapMove: false,
            mapDraw: true
        }

        //interaction Ol3
        me.draw = null;

        this.hardware = {
            GPS: false,
            camera: false,
            accel: false

        }

        me.toggleDraw = function () {
            if (this.draw.getActive()) {
                $log.debug("desactivation");
                this.draw.setActive(false);
                this.event.sideMenu = true;
                this.event.mapDraw = false;
            }
            else if (!this.draw.getActive()) {
                $log.debug("activation");
                this.draw.setActive(true);
                this.event.sideMenu = false;
                this.event.mapDraw = true;
            }
        }
//FIXME inverse car on bool av la reception de l'event
        me.toggleGPS = function () {
            if (!this.hardware.GPS) {
                $log.debug("desactivation GPS");
                $log.debug(this.hardware.GPS);
                $rootScope.$broadcast("disableGeoLoc");
            }
            else {
                $log.debug("activation GPS");
                $rootScope.$broadcast("enableGeoLoc");
            }
        }


        me.olInteract = {
            draw: {
                point: null,
                line: null,
                area: null
            },
            mesur: {
                line: null,
                area: null
            }
            //todo hyperviseur Control ol3

        }

    })
