/**
 * Created by harksin on 03/07/15.
 */


angular.module('module_rde.pipe,locManager', [])
    .service('sLoc', function sLoc ($ionicPlatform,sPouch, $log, $rootScope,$timeout) {
    var me = this;
        me.watchId
        me.enable=false;
        me.highAccuracy=true;
        me.geoloc= {
            lat: 43.5,
            lon: 3.5,
            zoom: 8,
            free:true,
            alt:0.0,
            accuracy:0,
            altAccuracy:0,
            heading:0,
            speed:0
        }


        me.updatePosition = function(position){

            if(me.geoloc.free === false) {
                me.geoloc.lat = position.coords.latitude ;
                me.geoloc.lon = position.coords.longitude;
                me.geoloc.accuracy = position.coords.accuracy;
                me.geoloc.alt = position.coords.altitude;
                me.geoloc.altAccuracy = position.coords.altitudeAccuracy;
                me.geoloc.heading = position.coords.heading;
                me.geoloc.speed = position.coords.speed;

            }

            $log.debug(me.geoloc)

        }

        me.startWatch=function(){
           me.watchId =  navigator.geolocation.watchPosition(
               me.updatePosition,
               function onError(error) {
                   $log.error('code: '    + error.code    + '\n' +
                       'message: ' + error.message + '\n');
               },
               { maximumAge: 1000, timeout: 30000, enableHighAccuracy: me.highAccuracy}); //todo  ctrl conf propagation

            //navigator.geolocation.getCurrentPosition( function onError(position) {
            //    $log.debug('get position')
            //    $log.debug(position);
            //},  function onError(error) {
            //    $log.error('code: '    + error.code    + '\n' +
            //        'message: ' + error.message + '\n');
            //});

        }
        me.stopWatch=function(){
            navigator.geolocation.clearWatch( me.watchId);
        }


        me.toggleEnable=function(){
            //$log.debug(me.enable);
            //me.enable = !me.enable;
            $log.debug("toggleGPS");
            $log.debug(me.enable);

            if(me.enable===true){
                me.startWatch();
                me.geoloc.free=false;
            }else{
                me.stopWatch();
                me.geoloc.free=true;
            }

        }






    })
