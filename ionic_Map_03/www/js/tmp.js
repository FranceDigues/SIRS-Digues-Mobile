var p1=null;
var p2 = null;


$scope.$on('openlayers.map.singleclick', function(e, coord) {
    $scope.$apply(function() {
        if(p1 == null) {
            p1 = coord;
        }

        p2=coord;








        $scope.imageLoadingProgress = 0;


        //layer non angular
        $scope.vsCacheBox.clear();
        //var cbox =  new ol.geom.Polygon(asPolygon($scope.markers));
        //cbox.transform('EPSG:4326', 'EPSG:3857');


        $scope.vsCacheBox.addFeature(
            new ol.Feature({
                geometry:  $scope.ringBuilder(p1,p2);
    })
    );


});
});




$scope.ringBuilder= function(pa,pb){

    return new ol.geom.Polygon([[[pa,[pa[0],pb[1]],pb,[pb[0],pa[1]],pa]]]);

};/**
 * Created by harksin on 31/03/15.
 */






//var p1=null;
//var p2 = null;


//    $scope.$on('openlayers.map.pointermove', function(e, coord) {
//
//        $scope.$apply(function() {
//
//            $log.debug("pointerMove")
//            $log.debug(coord)
//
//            if(p1 != null){
//
//                p2=[Math.round(coord.lon*1000)/1000, Math.round(coord.lat*1000)/1000];
//
//                $scope.vsCacheBox.clear();
//                $scope.vsCacheBox.addFeature(
//                    new ol.Feature({ geometry:  ringBuilder(p1,p2)  })
//                );
//
//                $log.debug($scope.vsCacheBox.getFeature().asArray());
//            }
//            $log.debug([p1,p2]);
//
//    });
//});
//
//    $scope.$on('openlayers.map.singleclick', function(e, coord) {
//        $scope.$apply(function() {
//
//            $log.debug("pointerClick")
//            $log.debug(coord)
//
//
//            if(p1 == null){
//                p1 =coord;
//                p2=coord;
//
//                $scope.vsCacheBox.clear();
//                $scope.vsCacheBox.addFeature(
//                    new ol.Feature({ geometry: new ol.Geometry.Polygon( ringBuilder(p1,p2))  })
//                );
//            }
//            //else{
//            //    //save polygone
//            //    p2=[Math.round(coord.lon*1000)/1000, Math.round(coord.lat*1000)/1000];
//            //
//            //    $scope.vsCacheBox.clear();
//            //    $scope.vsCacheBox.addFeature(
//            //        new ol.Feature({ geometry:  ringBuilder(p1,p2) })
//            //    );
//            //
//            //    //erase build value
//            //    p1=null;
//            //    p2=null;
//            //
//            //
//            //}
//            $log.debug([p1,p2]);
//
//        });
//    });




