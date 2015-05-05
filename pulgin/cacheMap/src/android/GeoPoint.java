/**
 * Created by roch DARDIE on 22/04/15.
 */

//import com.jhlabs.map.*;
import android.util.Log;

import com.rde.geodroid.ersatz.PointD;
import com.rde.geodroid.ersatz.RectD;

import com.jhlabs.map.proj.Projection;
import com.jhlabs.map.proj.ProjectionFactory;

public class GeoPoint {

    private double lat;
    private double lon;
    private String proj; //ToDo enum

    public GeoPoint(double lati, double lo){
        this.lat = lati;
        this.lon = lo;
    }

    public GeoPoint(PointD p){
        this.lat = p.x;
        this.lon = p.y;
    }

    public PointD getPointD(){
        return new PointD(this.getLat(),this.getLon());
    }



    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLon() {
        return lon;
    }

    public void setLon(double lon) {
        this.lon = lon;
    }

    public String getProj() {
        return proj;
    }

    public void setProj(String proj) {
        this.proj = proj;
    }

    @Override
    public String toString() {
        return "GeoPoint{" +
                "lat=" + lat +
                ", lon=" + lon +
                ", proj='" + proj + '\'' +
                '}';
    }


//methode

    //getlatLong array
    //getlongLat array
    //

    public void maxwell(GeoPoint p){ //I AM MIN, and P = MAX
        //FIXME  CONTROL

//        if(p.lat> 0){
//            double latmin =Math.min(p.getLat(), this.getLat());
//            double latmax =Math.max(p.getLat(), this.getLat());
//
//        }
//        if(p.lat< 0){
//            double latmin =Math.max(p.getLat(), this.getLat());
//            double latmax =Math.min(p.getLat(), this.getLat());
//        }

//        if(p.lon> 0){
//            double lonmin =Math.min(p.getLon(), this.getLon());
//            double lonmax =Math.max(p.getLon(), this.getLon());
//
//        }
//        if(p.lon< 0){
//            double lonmin =Math.max(p.getLon(), this.getLon());
//            double lonmax =Math.min(p.getLon(), this.getLon());
//        }

        double latmin =Math.min(p.getLat(), this.getLat());
        double latmax =Math.max(p.getLat(), this.getLat());
        double lonmin =Math.min(p.getLon(), this.getLon());
        double lonmax =Math.max(p.getLon(), this.getLon());



        this.setLat(latmax); //INVERSION GOOGLE
        this.setLon(lonmin);

        p.setLat(latmin); //INVERTION GOOGLE
        p.setLon(lonmax);

    }

    public Tile toTileTMS(int zoom){

        int xtile = (int)Math.floor( (lon + 180) / 360 * (1<<zoom) ) ;
        int ytile = (int)Math.floor( (1 - Math.log(Math.tan(Math.toRadians(lat)) + 1 / Math.cos(Math.toRadians(lat))) / Math.PI) / 2 * (1<<zoom) ) ;
        Log.d("PluginRDE_debug", "tile en cours de calcul :  [ x: "+xtile+", y : "+ytile+" ]");

        if (xtile < 0)  xtile=0;
        if (xtile >= (1<<zoom))
            xtile=((1<<zoom)-1);
        if (ytile < 0)ytile=0;
        if (ytile >= (1<<zoom)) ytile=((1<<zoom)-1);

       return new Tile(zoom,xtile,ytile);
    }




//TODO: externalisé l'appel de la projection
//    public GeoPoint toESPG3857() {
//        // Create a new SWEREF99 TM projection
////        Projection projection = ProjectionFactory.getNamedProjection("ESPG:3857");
//        Projection destProj = ProjectionFactory.getNamedPROJ4CoordinateSystem("3857");
////        Projection projection = ProjectionFactory.getNamedPROJ4CoordinateSystem("2000");
//        Projection sourceProj = ProjectionFactory.getNamedPROJ4CoordinateSystem("4326");
//
//
//
////        Log.d("PluginRDE_debug", "proj NAME  : " + projection.getName());
////        Log.d("PluginRDE_debug", "description " + projection.getPROJ4Description());
//
////        Projection projection = ProjectionFactory.fromPROJ4Specification(new String[] {
////                "+proj=merc",
////                "+a=6378137",
////                "+b=6378137,",
////                "+lat_ts=0.0",
////                "+lon_0=0.0",
////                "+x_0=0.0",
////                "+y_0=0 ",
////                "+k=1.0",
////                "+units=m ",
////                "+nadgrids=@null",
////                "+no_defs"
//////
//////
//////                "+proj=tmerc",
//////                "+zone=33",
//////                "+ellps=GRS80",
//////                "+towgs84=0,0,0,0,0,0,0",
//////                "+units=m",
//////                "+no_defs"
////        });
//
//        // Convert the long-lat coordinate to a Point2D.Double
////        PointD longlatPoint = new PointD(this.getLat(), this.getLon());
////        // Get the location as a SWEREF99 TM Point2D.Double
////        PointD  sweref99TMPoint = projection.transform(this.getPointD(), new PointD());
//
//        // Convert the Point2D.Double to a Coordinate and return it
//        Log.d("PluginRDE_debug", "ponit Initial " +  this.toString());
//        PointD g = sourceProj.transform(this.getPointD(), new PointD());
//        Log.d("PluginRDE_debug", "ponit proj " +  g.toString());
//
//
//
//
////        CoordinateConversion c = SingletonCoordinateConvertion.getInstance();
////        c.latLon2UTM(this.getLat(),this.getLon())
////        Log.d("PluginRDE_debug", "IBM : " +  c.latLon2UTM(this.getLat(),this.getLon()).toString());
//
//        return  SingletonCoordinateConvertion.getInstance().latLon2UTM(this.getLat(), this.getLon());
//    }

    public GeoPoint toESPG3857(){

        double φ = Math.toRadians(this.getLat());
        double λ = Math.toRadians(this.getLon());


        double y = R*Math.log(Math.tan(Math.PI/4 + 0.5*φ));
        double x= R*λ;


        return new GeoPoint(y,x);
    }



public static final double R= 6378137;
//    public static final double LINEAR_TOLERANCE = 0.01;
//    public static final double ANGULAR_TOLERANCE = LINEAR_TOLERANCE / (NAUTICAL_MILE * 60);
//    public static final double NAUTICAL_MILE = 1852;
//    public static final double POSITIVE_INFINITY = 1.0 / 0.0;

}
