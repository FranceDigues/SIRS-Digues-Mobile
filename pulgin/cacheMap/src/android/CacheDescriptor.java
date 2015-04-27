import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
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

    public CacheDescriptor(JSONObject jsonCache){
        this.path="";
try{
        this.setNom(jsonCache.getString("nom"));
        this.setSource(jsonCache.getString("source"));
        this.setTypeSource(jsonCache.getString("type"));
        this.setUrlSource(jsonCache.getString("url"));
        this.setzMin(jsonCache.getInt("zMin"));
        this.setzMax(jsonCache.getInt("zMax"));

        JSONArray aBbox= jsonCache.getJSONArray("bbox");

        GeoPoint tmpMin = new GeoPoint(aBbox.getJSONArray(0).getDouble(0), aBbox.getJSONArray(0).getDouble(1) );
        GeoPoint tmpMax = new GeoPoint(aBbox.getJSONArray(1).getDouble(0), aBbox.getJSONArray(1).getDouble(1) );


        tmpMin.maxwell(tmpMax);

        this.setpBg(tmpMin);
        this.setpHd(tmpMax);

    } catch (JSONException e) {
        e.printStackTrace();
    }

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


    //TODO filtre sur les revision uniqement?


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CacheDescriptor that = (CacheDescriptor) o;

        if (zMax != that.zMax) return false;
        if (zMin != that.zMin) return false;
        if (Source != null ? !Source.equals(that.Source) : that.Source != null) return false;
        if (nom != null ? !nom.equals(that.nom) : that.nom != null) return false;
        if (pBg != null ? !pBg.equals(that.pBg) : that.pBg != null) return false;
        if (pHd != null ? !pHd.equals(that.pHd) : that.pHd != null) return false;
        if (typeSource != null ? !typeSource.equals(that.typeSource) : that.typeSource != null)
            return false;
        if (urlSource != null ? !urlSource.equals(that.urlSource) : that.urlSource != null)
            return false;

        return true;
    }

//
//    @Override
//    public boolean equals(CacheDescriptor that) {
//        if (this == that) return true;
//
//        if (zMax != that.zMax) return false;
//        if (zMin != that.zMin) return false;
//        if (Source != null ? !Source.equals(that.Source) : that.Source != null) return false;
//        if (nom != null ? !nom.equals(that.nom) : that.nom != null) return false;
//        if (pBg != null ? !pBg.equals(that.pBg) : that.pBg != null) return false;
//        if (pHd != null ? !pHd.equals(that.pHd) : that.pHd != null) return false;
//        if (typeSource != null ? !typeSource.equals(that.typeSource) : that.typeSource != null)
//            return false;
//        if (urlSource != null ? !urlSource.equals(that.urlSource) : that.urlSource != null)
//            return false;
//
//        return true;
//    }

    @Override
    public int hashCode() {
        int result = nom != null ? nom.hashCode() : 0;
        result = 31 * result + (Source != null ? Source.hashCode() : 0);
        result = 31 * result + (typeSource != null ? typeSource.hashCode() : 0);
        result = 31 * result + (urlSource != null ? urlSource.hashCode() : 0);
        result = 31 * result + zMin;
        result = 31 * result + zMax;
        result = 31 * result + (pBg != null ? pBg.hashCode() : 0);
        result = 31 * result + (pHd != null ? pHd.hashCode() : 0);
        return result;
    }


    public ArrayList<Tile> getDiff(CacheDescriptor caDeNew){
        //FIXME include?
        ArrayList<Tile> resultante = new ArrayList<Tile>();
        ArrayList<Tile> baseZone = this.firstLvlTileFromBb_TMS();
        ArrayList<Tile> novelZone = caDeNew.firstLvlTileFromBb_TMS();

        for(Tile t : novelZone){

            if(! baseZone.contains(t)) resultante.add(t);
        }

         return resultante;
    }

    //todo controle de la présence de tout les fichier
    public boolean checkIntegrity(){
      return true;
    };

}
