import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.ArrayList;

/**
 * Created by roch DARDIE on 22/04/15.
 */

//TODO ! pHd, pBg == > MIN MAX
public class CacheDescriptor {

    private int idf;
    private String nom;
    private String Source;
    private sourceType typeSource;
    private String urlSource;

    private ArrayList<String> layers;

    private int zMin;
    private int zMax;

    private GeoPoint pHg;
    private GeoPoint pBd;

    private String path;


    public CacheDescriptor(){
        this.path="";
        this.layers = new ArrayList<String>();

    }

    public CacheDescriptor(JSONObject jsonCache){
        this.path="";
        this.layers = new ArrayList<String>();

try{
        this.setIdf(jsonCache.getInt("idf"));
        this.setNom(jsonCache.getString("nom"));
        this.setSource(jsonCache.getString("source"));
        this.setTypeSource(sourceType.valueOf(jsonCache.getString("type")));
        this.setUrlSource(jsonCache.getString("url"));
        this.setzMin(jsonCache.getInt("zMin"));
        this.setzMax(jsonCache.getInt("zMax"));



        JSONArray aBbox= jsonCache.getJSONArray("bbox");

        GeoPoint tmpMin = new GeoPoint(aBbox.getJSONArray(0).getDouble(0), aBbox.getJSONArray(0).getDouble(1) );
        GeoPoint tmpMax = new GeoPoint(aBbox.getJSONArray(1).getDouble(0), aBbox.getJSONArray(1).getDouble(1) );


        tmpMin.maxwell(tmpMax);

        this.setpHg(tmpMin);
        this.setpBd(tmpMax);





    JSONArray aLayers= jsonCache.getJSONArray("layers");
    for(int i=0 ; i<aLayers.length();i++){
        this.layers.add(aLayers.getString(i));
    }



    } catch (JSONException e) {
        e.printStackTrace();
    }

    }

    public int getIdf() {
        return idf;
    }

    public void setIdf(int idf) {
        this.idf = idf;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public GeoPoint getpHg() {
        return pHg;
    }

    public void setpHg(GeoPoint pHg) {
        this.pHg = pHg;
    }

    public GeoPoint getpBd() {
        return pBd;
    }

    public void setpBd(GeoPoint pBd) {
        this.pBd = pBd;
    }

    public String getSource() {
        return Source;
    }

    public void setSource(String source) {
        Source = source;
    }

    public sourceType getTypeSource() {
        return typeSource;
    }

    public void setTypeSource(sourceType typeSource) {
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

    public ArrayList<String> getLayers() {
        return layers;
    }

    public void setLayers(ArrayList<String> layers) {
        this.layers = layers;
    }

    @Override
    public String toString() {
        return "CacheDescriptor{" +
                "nom='" + nom + '\'' +
                ", Source='" + Source + '\'' +
                ", typeSource=" + typeSource +
                ", urlSource='" + urlSource + '\'' +
                ", layers=" + layers +
                ", zMin=" + zMin +
                ", zMax=" + zMax +
                ", pHg=" + pHg +
                ", pBd=" + pBd +
                '}';
    }

//methode

    public ArrayList<Tile> firstLvlTileFromBb_TMS(){


        ArrayList<Tile> aTile = new ArrayList<Tile>();

        Log.d("PluginRDE_debug", "geoPoint Min : "+this.getpHg().toString());
        Log.d("PluginRDE_debug", "geoPoint Max : "+this.getpBd().toString());

        Tile tHg = this.getpHg().toTileTMS(this.getzMin());
        Tile tBd = this.getpBd().toTileTMS(this.getzMin());

        Log.d("PluginRDE_debug", "tile Hg : "+tHg.toString());
        Log.d("PluginRDE_debug", "tile Bd : "+tBd.toString());

        for (int x = tHg.getX();x<=tBd.getX();x++ ){
            for (int y = tHg.getY();y<=tBd.getY();y++ ) {
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

    //TODO include layers

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CacheDescriptor that = (CacheDescriptor) o;

        if (zMax != that.zMax) return false;
        if (zMin != that.zMin) return false;
        if (Source != null ? !Source.equals(that.Source) : that.Source != null) return false;
        if (nom != null ? !nom.equals(that.nom) : that.nom != null) return false;
        if (pHg != null ? !pHg.equals(that.pHg) : that.pHg != null) return false;
        if (pBd != null ? !pBd.equals(that.pBd) : that.pBd != null) return false;
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
//        if (pHg != null ? !pHg.equals(that.pHg) : that.pHg != null) return false;
//        if (pBd != null ? !pBd.equals(that.pBd) : that.pBd != null) return false;
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
        result = 31 * result + (pHg != null ? pHg.hashCode() : 0);
        result = 31 * result + (pBd != null ? pBd.hashCode() : 0);
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


    public String getWMSdescriptor(){
        //todo multilayers?
        return "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS="+this.layers.get(0);
    }

    //todo controle de la présence de tout les fichier
    public boolean checkIntegrity(){
      return true;
    };

}
