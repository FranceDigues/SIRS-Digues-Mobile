import android.annotation.SuppressLint;
import android.app.DownloadManager;
import android.content.Context;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Environment;
import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.util.ArrayList;

/**
 * Created by harksin on 22/04/15.
 */
public class AsyncClear extends AsyncTask {
    private Context myContext;
    private String filePath;
    private Pyromaniac flamethrower;
    private int nbItem;
    private int pas;
    private int ix;


    //constructeur
    public AsyncClear(Context context, Pyromaniac eventTrigger,String FilePath )
    {

        this.myContext = context ;
        this.filePath=FilePath;
        this.flamethrower = eventTrigger;
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

        Log.d("PluginRDE_RUN","asyncTask Clear");


//        //ESSAI REPROJ
//        BBox b= new BBox(3.5134210456400266,2.8113711933311194,44.296875, 43.59375);
//        b.toESPG3857().toString();


        this.onProgressUpdate(0);
//        Log.d("PluginRDE_debug","path  : "+Environment.getExternalStorageDirectory()+Environment.);
//        String s = myContext.getExternalFilesDirs(this.filePath);
        File baseDir = myContext.getExternalFilesDir(this.filePath);
        Log.d("PluginRDE_debug","path  : "+baseDir.getPath());



        this.countPathElement(baseDir);
        this.pas = this.nbItem/10;
        int ix=0;
        this.DeleteRecursive(baseDir);

        this.onProgressUpdate(100);


        return null;

    }


    // Méthode exécutée à la fin de l'execution de la tâche asynchrone

    @Override
    protected void onPostExecute(Object result) {

        super.onPostExecute(result);

        //ToDo renvoyer un event pour informer l'ui de la disponibilité d'un cache


    }












    private void DeleteRecursive(File fileOrDirectory) {
        if (fileOrDirectory.isDirectory())
            for (File child : fileOrDirectory.listFiles())
                DeleteRecursive(child);

        fileOrDirectory.delete();


        try {
            this.ix++;
            Log.d("PluginRDE_PYRO", "event content   ::   "+"{\"evType\":\"clearCacheProgress\",\"global\":\""+this.nbItem+"\",\"ix\":\""+this.ix+"\"}");
            this.flamethrower.fire(new JSONObject("{\"evType\":\"clearCacheProgress\",\"global\":\""+this.nbItem+"\",\"ix\":\""+this.ix+"\"}"));
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private void countPathElement(File fileOrDirectory) {
        if (fileOrDirectory.isDirectory())
            for (File child : fileOrDirectory.listFiles())
                countPathElement(child);

       this.nbItem++;
    }
}
