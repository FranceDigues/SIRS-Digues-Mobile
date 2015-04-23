import android.util.Log;

import java.util.ArrayList;

/**
 * Created by roch DARDIE on 22/04/15.
 */
public class CacheDescriptor {

    private String nom;
    private String Source;
    private String typeSource;
    private String urlSource;

    private int zMin;
    private int zMax;

    private GeoPoint pBg;
    private GeoPoint pHd;

    private String path;


    public CacheDescriptor(){
        this.path="";

    }


    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public GeoPoint getpBg() {
        return pBg;
    }

    public void setpBg(GeoPoint pBg) {
        this.pBg = pBg;
    }

    public GeoPoint getpHd() {
        return pHd;
    }

    public void setpHd(GeoPoint pHd) {
        this.pHd = pHd;
    }

    public String getSource() {
        return Source;
    }

    public void setSource(String source) {
        Source = source;
    }


    public String getTypeSource() {
        return typeSource;
    }

    public void setTypeSource(String typeSource) {
        this.typeSource = typeSource;
    }

    public String getUrlSource() {
        return urlSource;
    }

    public void setUrlSource(String urlSource) {
        this.urlSource = urlSource;
    }

    public int getzMin() {
        return zMin;
    }

    public void setzMin(int zMin) {
        this.zMin = zMin;
    }

    public int getzMax() {
        return zMax;
    }

    public void setzMax(int zMax) {
        this.zMax = zMax;
    }

    @Override
    public String toString() {
        return "CacheDescriptor{" +
                "nom='" + nom + '\'' +
                ", Source='" + Source + '\'' +
                ", typeSource='" + typeSource + '\'' +
                ", urlSource='" + urlSource + '\'' +
                ", zMin=" + zMin +
                ", zMax=" + zMax +
                ", pBg=" + pBg +
                ", pHd=" + pHd +
                ", path='" + path + '\'' +
                '}';
    }

//methode

    public ArrayList<Tile> firstLvlTileFromBb_TMS(){


        ArrayList<Tile> aTile = new ArrayList<Tile>();

        Log.d("PluginRDE_debug", "geoPoint Bg : "+this.getpBg().toString());
        Log.d("PluginRDE_debug", "geoPoint Hd : "+this.getpHd().toString());

        Tile tBg = this.getpBg().toTileTMS(this.getzMin());
        Tile tHd = this.getpHd().toTileTMS(this.getzMin());

        Log.d("PluginRDE_debug", "tile Bg : "+tBg.toString());
        Log.d("PluginRDE_debug", "tile Hd : "+tHd.toString());

        for (int x = tBg.getX();x<=tHd.getX();x++ ){
            for (int y = tBg.getY();y<=tHd.getY();y++ ) {
                Tile tmp = new Tile(this.getzMin(),x,y);
                Log.d("PluginRDE_debug", "tile en cours : "+tmp.toString());
                aTile.add(tmp);
            }

        }


        return aTile;

    }


    public String getDirPath(){
        Log.d("PluginRDE_debug", this.path);
        if (this.path ==""){
            this.path = "Tile/"+this.getSource() + "/" + this.getNom() + "/";
        }
        Log.d("PluginRDE_debug", this.path);
        return this.path ;
    }
}
