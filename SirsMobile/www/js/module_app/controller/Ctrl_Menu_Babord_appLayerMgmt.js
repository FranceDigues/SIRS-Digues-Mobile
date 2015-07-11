/**
 * Created by roch dardie on 19/06/15.
 */



angular.module('module_app.controllers.menus.babord.appLayerMgmt', [])

    .controller('cAppLayerMgmt', function cAppLayerMgmt($scope, $state, $log, sContext, sAppLayer) {
        var me = this;

        me.sContext = sContext;
        me.sAppLayer = sAppLayer;
        me.activeBranch = me.sAppLayer.tree;
        me.modAct="";
        me.branchAct=null;
        me.displayStack=false;
        me.search=false

        me.modList=false;
        me.catList=false;

        me.displayModule=function(key){
            me.modAct=""+key;
            me.branchAct=sAppLayer.tree[me.modAct].layers;
        }

        me.deepBranch=function(node){

        }

        me.toggleMod= function(m){
           me.modAct= me.modAct != m ? m : "";
        }

        me.toggleFilter= function(){
           me.search= me.search == false ? true : false;
        }



    })
    .filter('ordinal', function() {

        // Create the return function
        // set the required parameter name to **number**
        return function(number) {

            // Ensure that the passed in data is a number
            if(isNaN(number) || number < 1) {

                // If the data is not a number or is less than one (thus not having a cardinal value) return it unmodified.
                return number;

            } else {

                // If the data we are applying the filter to is a number, perform the actions to check it's ordinal suffix and apply it.

                var lastDigit = number % 10;

                if(lastDigit === 1) {
                    return number + 'st'
                } else if(lastDigit === 2) {
                    return number + 'nd'
                } else if (lastDigit === 3) {
                    return number + 'rd'
                } else if (lastDigit > 3) {
                    return number + 'th'
                }

            }
        }
    });