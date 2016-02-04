angular.module('app.services.utils', [])

    .value('LocalStorageItem', function LocalStorageItem(key) {

        this.read = function() {
            return angular.fromJson(window.localStorage.getItem(key));
        };

        this.write = function(value) {
            window.localStorage.setItem(key, angular.toJson(value));
        };

        this.clear = function() {
            window.localStorage.removeItem(key);
        };
    });