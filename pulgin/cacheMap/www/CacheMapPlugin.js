/**
 * Created by roch dardie on 17/04/15.
 */
var exec = require('cordova/exec');

function CacheMapPlugin() {
    console.log("CacheMapPlugin.js: is created");
}




CacheMapPlugin.prototype._amplifier = function (info) {
    console.log("firset step");
    //if (info) {


    if(info.evType === "clearCacheProgress") {
        cordova.fireWindowEvent("clearCacheProgress", info);
        console.log("event recive from android");
        console.log(info);
    }


    //}

};



CacheMapPlugin.prototype.updateCache = function (cacheArray) {
    console.log("CacheMapPlugin.js: updateCache");
    exec(function (result) {

        //alert("result" + result);
    }, function (result) {
    //alert("Error" + result);
    }, "CacheMapPlugin", "updateCache", cacheArray);
};

CacheMapPlugin.prototype.clearCache = function () {
    console.log("CacheMapPlugin.js: initUserData");
    exec(cacheMapPlugin._amplifier, function () {
        console.log("ERROR");
        //alert("Error" + result);
    }, "CacheMapPlugin", "clearWay", []);
};











var cacheMapPlugin = new CacheMapPlugin();
//
//var Cache =
//{
//    updateCache : function( success, error )
//    {
//        exec(success, error, "Cache", "updateCache", [])
//
//    },
//    initUserData : function( success, error )
//    {
//        exec(success, error, "Cache", "initUserData", [])
//    }
//}



module.exports = cacheMapPlugin;
