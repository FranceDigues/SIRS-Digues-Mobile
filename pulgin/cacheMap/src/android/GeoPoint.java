/**
 * Created by roch DARDIE on 22/04/15.
 */
public class GeoPoint {

    private double lat;
    private double lon;
    private String proj; //ToDo enum

    public GeoPoint(double la, double lo){
        this.lat = la;
        this.lon = lo;
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



    //methode

    //getlatLong array
    //getlongLat array
    //

    public void maxwell(GeoPoint p){
        double latmin =Math.min(p.getLat(), this.getLat());
        double lonmin =Math.min(p.getLon(), this.getLon());
        double latmax =Math.max(p.getLat(), this.getLat());
        double lonmax =Math.max(p.getLon(), this.getLon());

        this.setLat(latmin);
        this.setLon(lonmin);

        p.setLat(latmax);
        p.setLon(lonmin);

    }

    public Tile toTileTMS(int zoom){

        int xtile = (int)Math.floor( (lon + 180) / 360 * (1<<zoom) ) ;
        int ytile = (int)Math.floor( (1 - Math.log(Math.tan(Math.toRadians(lat)) + 1 / Math.cos(Math.toRadians(lat))) / Math.PI) / 2 * (1<<zoom) ) ;
        if (xtile < 0)  xtile=0;
        if (xtile >= (1<<zoom))
            xtile=((1<<zoom)-1);
        if (ytile < 0)ytile=0;
        if (ytile >= (1<<zoom)) ytile=((1<<zoom)-1);

       return new Tile(zoom,xtile,ytile);
    }



}
