import android.util.Log;

import java.util.ArrayList;

/**
 * Created by harksin on 22/04/15.
 */
public class Tile {
    private int x;
    private int y;
    private int z;

    public Tile() {
    }


    public Tile(int z,int x, int y) {
        this.x = x;
        this.y = y;
        this.z = z;
    }


    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public int getZ() {
        return z;
    }

    public void setZ(int z) {
        this.z = z;
    }

    @Override
    public String toString() {
        return "Tile{" +
                "x=" + x +
                ", y=" + y +
                ", z=" + z +
                '}';
    }


//methode

    public ArrayList<Tile> subServientTile_TMS(){
        ArrayList<Tile> aTile = new ArrayList<Tile>();
        final int Z = this.getZ()+1;
        final int X = (this.getX())*2;
        final int Y = (this.getY())*2;

        aTile.add(new Tile(Z,X,Y));
        aTile.add(new Tile(Z,X+1,Y));
        aTile.add(new Tile(Z,X+1,Y+1));
        aTile.add(new Tile(Z,X,Y+1));


        Log.d("PluginRDE_debug_DL", "sous Arbre : " + aTile.toString());
        return aTile;


    }




}
