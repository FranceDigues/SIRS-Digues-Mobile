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

import java.io.BufferedReader;
import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;


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



public class PointProximityPlugin extends CordovaPlugin {
    public static final String TAG = "Cache Map Plugin";


    private Pyromaniac flamethrower;


    /**
     * Constructor.
     */
    public PointProximityPlugin() {

    }

    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        Log.v(TAG,"Init CacheMapPlugin");
    }
    public boolean execute( String action, JSONArray args, CallbackContext callbackContext) throws JSONException {


        Log.d("PluginRDE","PlugCall");




        //construction de l'emetteur d'evenement :
        this.flamethrower = new Pyromaniac(callbackContext);


        if( action.equals("watchPointList") )
        {
            Log.d("PluginRDE_RUN","watchPointList");
            Log.d("PluginRDE", "parametre 0 : " + args.getJSONObject(0).toString());
            this.runToast("watchPointList :");


        }



        return true;
    };

//FIXME vider cette classe, et integrer la creation des Cade dans les asyncTask.


    //Methode
    private void runToast(final String a ){
        Log.d("PluginRDE_RUN","toast");
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





    private void initDlReceiver(){
        Log.d("PluginRDE_RUN","dlReceiver");
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

    private void closeReceiver(){

            }
        };

//        registerReceiver(receiver, new IntentFilter(
//                DownloadManager.ACTION_DOWNLOAD_COMPLETE));
    }









}
