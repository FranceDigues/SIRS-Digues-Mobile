import android.annotation.SuppressLint;
import android.app.DownloadManager;
import android.content.Context;
import android.net.Uri;
import android.os.AsyncTask;
import android.util.Log;

import java.util.ArrayList;

/**
 * Created by harksin on 22/04/15.
 */
public class AsyncCacheBuilder extends AsyncTask {
    private Context myContext;
    private CacheDescriptor caDe;
    private DownloadManager dm;

    //constructeur
    public AsyncCacheBuilder(Context context, CacheDescriptor c,DownloadManager d)
    {
        this.myContext = context ;
        this.caDe=c;
        this.dm =d;
    }





    // Méthode exécutée au début de l'execution de la tâche asynchrone
    @Override
    protected void onPreExecute() {
        super.onPreExecute();
    }




    //  @Override
    protected void onProgressUpdate(Integer... values){
        super.onProgressUpdate(values);

//        // Mise à jour de la ProgressBar
//
//        this.mProgressBar.setProgress(values[0]);
    }






    @SuppressLint("NewApi")
    @Override
    protected Object doInBackground(Object... params) {

        this.onProgressUpdate(0);

        /***
         *  Todo verification de l'existance du cache ds le .json du nom
         *  Todo Comparaison des emprise si existant
         *  Todo si Nouveau plus vaste alors rechargé la partie manquante
         *
         *
         */




        //chargement des tuiles

        if(this.caDe.getTypeSource().equals("TMS")){

                ArrayList<Tile> aTile = this.caDe.firstLvlTileFromBb_TMS();






        }
        //todo iplementer les autres type


        this.onProgressUpdate(80);
        /**
         * TODO ecriture du cache descriptor dans un fichier json.
         * Todo nomDeLaSource_NomDuCache.json
         *
         * TODO : NOTE : nom => source => id ??
         *
         */



        this.onProgressUpdate(100);


        return null;

    }


    // Méthode exécutée à la fin de l'execution de la tâche asynchrone

    @Override
    protected void onPostExecute(Object result) {

        super.onPostExecute(result);

        //ToDo renvoyer un event pour informer l'ui de la disponibilité d'un cache


    }















    private void aTileDownload(ArrayList<Tile> aTile){

        boolean borne = false;
        if(aTile.get(0).getZ()>= caDe.getzMax()) borne = true;

        for(Tile t  :aTile){

            this.launchTileDl(t);

            //recur : sur la sous tuile
            if(! borne){
                aTileDownload(t.subServientTile_TMS());
            }


        }




    }



    public long launchTileDl(Tile t) {



        Log.d("PluginRDE", "downloadTile");

        DownloadManager.Request request = new DownloadManager.Request( Uri.parse(this.caDe.getUrlSource() + "/" + t.getZ() + "/" + t.getX() + "/" + t.getY() + ".png"));
        Log.d("PluginRDE","http://a.tile.openstreetmap.org" + "/" + t.getZ() + "/" + t.getX() + "/" + t.getY() + ".png");

        //Restrict the types of networks over which this download may proceed.
        request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_WIFI | DownloadManager.Request.NETWORK_MOBILE);
        //Set whether this download may proceed over a roaming connection.
//        request.setAllowedOverRoaming(false);

        request.setDescription("MiseAJourDuCache");


        request.setDestinationInExternalFilesDir(myContext, this.caDe.getDirPath() + t.getZ() + "/" + t.getX()+"/" , t.getY()+".png");

        return dm.enqueue(request);

    }
}
