/**
 * Created by roch dardie on 25/06/15.
 */




angular.module('module_rde.profiling', [
    'ionic'
])

    .service('sProf', function sProf ( $log, $timeout) {

        var me = this;

        //me.influxdb = new InfluxDB({host:"5.196.17.92", port:8086, username:'root', password:'loggingT1me', database:'profjs'});
        //
        //
        //me.activeLog={};
        //
        //
        //me.startLog=function(serie,TimeNow){
        //    $log.debug("start Log");
        //    $log.debug(serie);
        //    $log.debug(TimeNow);
        //    me.activeLog[serie]=TimeNow;
        //
        //
        //    $log.debug(me.activeLog);
        //}
        //
        //
        //me.stopLog=function(serie,TimeNow,numberItem,fst){
        //    $log.debug("stopLog");
        //
        //    if( me.activeLog[serie] != null){
        //        //calul function duration
        //        me.activeLog[serie]= TimeNow -  me.activeLog[serie];
        //        //
        //        //var fstime = false;
        //        //if( me.activeLog[serie]>5000) fstime=true;
        //        //export to influxdb
        //        me.influxdb.writePoint(serie, {first:fst, duration:me.activeLog[serie], ndItem:numberItem});
        //
        //
        //        //$log.debug({first:fst, duration:me.activeLog[serie], ndItem:numberItem});
        //        //remove log
        //        delete me.activeLog[serie];
        //    }
        //
        //}

    });