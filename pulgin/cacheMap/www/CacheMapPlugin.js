/**
 * Created by roch dardie on 17/04/15.
 */
var exec = require('cordova/exec');

function CacheMapPlugin() {
    console.log("CacheMapPlugin.js: is created");
}

CacheMapPlugin.prototype.updateCache = function () {
    console.log("CacheMapPlugin.js: updateCache");
    exec(function (result) {/*alert("OK" + reply);*/
    }, function (result) {/*alert("Error" + reply);*/
    }, "CacheMapPlugin", "updateCache", []);
};

CacheMapPlugin.prototype.initUserData = function () {
    console.log("CacheMapPlugin.js: initUserData");
    exec(function (result) {/*alert("OK" + reply);*/
    }, function (result) {/*alert("Error" + reply);*/
    }, "CacheMapPlugin", "initUserData", []);
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
