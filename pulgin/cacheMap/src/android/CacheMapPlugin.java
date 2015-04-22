/**
 * Created by roch dardie on 17/04/15.
 */



import android.app.DownloadManager;
import android.app.DownloadManager.Request;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
//import android.database.Cursor;
import android.net.Uri;


import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaInterface;

import android.util.Log;
import android.widget.Toast;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;










/**
 *
 * TODO :  test unitaire.,?
 *
 * TODO gestion des multi polygone
 *
 * TODO gestion WMS et autre
 *
 * TODO : ecrire la partie du rapport attenante + layus energie.
 *
 * TODO : profilage du systeme, et comparaison avec JS
 *
 * TODO test de fonctionement du systeme actuel
 *
 *
 *
 *
 *
 *
 * **/



public class CacheMapPlugin extends CordovaPlugin {
    public static final String TAG = "Cache Map Plugin";


    private int percent; //0-100
    private long enqueue;  //do Tableau
    private DownloadManager dm;
    private String StorageDrive;


    /**
     * Constructor.
     */
    public CacheMapPlugin() {

    }
    /**
     * Sets the context of the Command. This can then be used to do things like
     * get file paths associated with the Activity.
     *
     * @param cordova The context of the main Activity.
     * @param webView The CordovaWebView Cordova is running in.
     */
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        Log.v(TAG,"Init CacheMapPlugin");
    }
    public boolean execute( String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

        this.dm = (DownloadManager) this.cordova.getActivity().getSystemService(Context.DOWNLOAD_SERVICE);
//        this.StorageDrive = "file:///storage/emulated/0/Android/data/com.ionic.Map03/cache/OSM/essai/";
//        this.StorageDrive = "file://storage/emulated/0/Android/data/com.ionic.Map03/cache/OSM/essai/";
        //recuperé le stokage de cordova? moche..
//        StorageDrive =args[1];
        Log.d("PluginRDE","PlugCall");

        if( action.equals("updateCache") )
        {
            Log.d("PluginRDE","updateCache");
            this.runToast("updateCache :");

            /**
             * TODO for each cache desciptor  run build Cache
             *
             * TODO une seule fonction sufit?
             *
             * TODO : introduire une fonction d'interogation des calque dispo par lecture des .json
             * présent dans tile
             * */


            this.buildCache(args.getJSONObject(0));

            this.downloadTile("testUUID", "TestNom", 0,0, 0);

        }
        if( action.equals("initUserData") )
        {
            Log.d("PluginRDE","initUserData");
            this.runToast("initUserData :");
        }


        return true;
    }








    //Methode
    private void runToast(final String a ){
        final int duration = Toast.LENGTH_SHORT;
// Shows a toast
//        Log.v(TAG,"CacheMapPlugin received:"+ action);
        cordova.getActivity().runOnUiThread(new Runnable() {
            public void run() {
                Toast toast = Toast.makeText(cordova.getActivity().getApplicationContext(), a, duration);
                toast.show();


            }
        });

    }



    /**
     *
     *
     *
     *
     * TODO : structure Json a utilisé dans le Js, Objet de base pour les test :
     *
     *  {
     "nom":"essai",
     "source":"OSM",
     "type":"TMS",
     "zMin":"8",
     "zMax":"14",
     "url":"http://a.tile.openstreetmap.org",
     "bbox":[[3,43][4,44]]


     }
     *
     *
     *
     *
     *
     * */




    private boolean buildCache(JSONObject jsonCache){

//construction de l'objet java depuis le json
         CacheDescriptor caDes = new CacheDescriptor();

        try {
            caDes.setNom(jsonCache.getString("nom"));
            caDes.setSource(jsonCache.getString("source"));
            caDes.setTypeSource(jsonCache.getString("type"));
            caDes.setUrlSource(jsonCache.getString("url"));
            caDes.setzMin( jsonCache.getInt("zMin"));
            caDes.setzMax( jsonCache.getInt("zMax"));

            JSONArray aBbox= jsonCache.getJSONArray("bbox");

            GeoPoint tmpMin = new GeoPoint(aBbox.getJSONArray(0).getDouble(0), aBbox.getJSONArray(0).getDouble(1) );
            GeoPoint tmpMax = new GeoPoint(aBbox.getJSONArray(1).getDouble(0), aBbox.getJSONArray(1).getDouble(1) );


            tmpMin.maxwell(tmpMax);

            caDes.setpBg(tmpMin);
            caDes.setpHd(tmpMax);


        } catch (JSONException e) {
            e.printStackTrace();
        }


        //creation et lancement async task



            AsyncCacheBuilder asyncCbuilder = new AsyncCacheBuilder(this.cordova.getActivity(), caDes, this.dm);

            asyncCbuilder.execute();













return true;
    }



    private void initDlReceiver(){
        BroadcastReceiver receiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                String action = intent.getAction();
                if (DownloadManager.ACTION_DOWNLOAD_COMPLETE.equals(action)) {
                    long downloadId = intent.getLongExtra(
                            DownloadManager.EXTRA_DOWNLOAD_ID, 0);


                }
            }
        };

//        registerReceiver(receiver, new IntentFilter(
//                DownloadManager.ACTION_DOWNLOAD_COMPLETE));
    }









}
