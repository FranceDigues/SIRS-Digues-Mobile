
function WatchableModel(model) {

    var self = this;

    this._watchers_ = [];

    angular.forEach(model, function(value, property) {
        Object.defineProperty(this, property, {
            get: function getProperty() {
                return model[property];
            },
            set: function setProperty(value) {
                if (value !== model[property]) {
                    self._onPropertyChanged_(property, model[property], (model[property] = value));
                }
            }
        });
    }, this);
}

WatchableModel.prototype.constructor = WatchableModel;

WatchableModel.prototype.watch = function(callback, context) {
    return this.watchProperty('*', callback, context);
};

WatchableModel.prototype.watchProperty = function(property, callback, context) {
    if (angular.isString(property) && angular.isFunction(callback)) {
        this._watchers_.push({ property: property, callback: callback, context: context });
    }
    return this;
};

WatchableModel.prototype._onPropertyChanged_ = function(property, oldValue, newValue) {
    angular.forEach(this._watchers_, function(watcher) {
        if (watcher.property === property) {
            watcher.callback.call(watcher.context, newValue, oldValue);
        } else if (watcher.property === '*') {
            watcher.callback.call(watcher.context, property, newValue, oldValue);
        }
    });
};