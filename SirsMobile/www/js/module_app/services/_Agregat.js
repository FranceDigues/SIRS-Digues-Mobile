/**
 * Created by roch dardie on 12/06/15.
 */


angular.module('module_app.services',
    [
        'module_app.services.authentication',
        'module_app.services.context',
        'module_app.services.dao',
        'module_app.services.device',
        'module_app.data.services.applayer',
        'module_app.data.services.conf',
        'module_app.services.style.factory',
        'module_app.services.edition',
        'module_app.services.pipe.ref',
        'module_app.services.geolocation',
        'module_app.services.utils'
    ]);