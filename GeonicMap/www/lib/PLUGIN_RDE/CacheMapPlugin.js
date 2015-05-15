/**
 * Created by roch dardie on 17/04/15.
 */
var exec = require('cordova/exec');

function CacheMapPlugin() {
    console.log("CacheMapPlugin.js: is created");
}
CacheMapPlugin.prototype.showToast = function (aString) {
    console.log("CacheMapPlugin.js: showToast");
    exec(function (result) {/*alert("OK" + reply);*/
    }, function (result) {/*alert("Error" + reply);*/
    }, "CacheMapPlugin", aString, []);
}
var coolPlugin = new CacheMapPlugin();
module.exports = coolPlugin;
