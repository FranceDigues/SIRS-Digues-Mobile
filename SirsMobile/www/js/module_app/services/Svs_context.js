angular.module('module_app.services.context', ['module_app.services.utils'])

    .constant('defaultContext', {
        path: '/',              // the $location#path() result
        search: {},             // the $location#search() result
        sideMenu: {
            open: null,         // the open menu ("left" or "right")
            left: null,         // the left view name
            right: null         // the right view name
        },
        geolocStatus: false     // the state of geolocation
    })

    // -------------------------------------------------------------------------
    //  DAOs
    // -------------------------------------------------------------------------

    .factory('ContextStorage', function ContextStorage(LocalStorageItem) {
        return new LocalStorageItem('appContext');
    })

    // -------------------------------------------------------------------------
    //  BOs
    // -------------------------------------------------------------------------

    .service('ContextService', function ContextService($rootScope, $location, ContextStorage, defaultContext) {

        function get() {
            return ContextStorage.get() || defaultContext;
        }

        function apply(func) {
            var context = get();
            func(context);
            ContextStorage.set(context);
        }


        this.get = get;

        this.apply = apply;


        $rootScope.$on('$locationChangeSuccess', function() {
            apply(function(context) {
                context.path = $location.path();
                context.search = $location.search();
            });
        });
    });