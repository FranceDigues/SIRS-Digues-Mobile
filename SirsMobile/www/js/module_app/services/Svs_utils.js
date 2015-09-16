angular.module('module_app.services.utils', ['module_app.services.utils'])

    .value('LocalStorageItem', function LocalStorageItem(key) {

        var self = this;

        var cached = undefined;

        self.get = function() {
            cached = cached || angular.fromJson(window.localStorage.getItem(key));
            return angular.copy(cached);
        };

        self.set = function(value) {
            cached = value;
            window.localStorage.setItem(key, angular.toJson(value));
        };

        self.clear = function() {
            cached = undefined;
            window.localStorage.removeItem(key);
        };

        self.isEmpty = function() {
            return angular.isUndefined(window.localStorage.getItem(key));
        };
    });