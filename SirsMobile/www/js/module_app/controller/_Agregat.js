/**
 * Created by roch dardie on 12/06/15.
 */


angular.module('module_app.controllers',
    [
        'module_app.controllers.loader',
        'module_app.controllers.map',
        'module_app.controllers.menus.home',
        'module_app.controllers.menus.init',
        'module_app.controllers.menus.sideLeft',
        'module_app.controllers.menus.signIn',
        'module_app.controllers.menus.tab',

        'module_app.controllers.menus.hud',



        'module_app.controllers.menus.babord.appLayerMgmt',
        'module_app.controllers.menus.babord.globalSettings',
        'module_app.controllers.menus.babord.helpMe',
        'module_app.controllers.menus.babord.menu',
        'module_app.controllers.menus.babord.newObjectSummary',
        'module_app.controllers.menus.babord.porteDoc',
        'module_app.controllers.menus.babord.backLayerMgmt',




        'module_app.controllers.menus.tribord.desordreMgmt',
        'module_app.controllers.menus.tribord.closableDesordre',
        'module_app.controllers.menus.tribord.editableLayer',

    ])