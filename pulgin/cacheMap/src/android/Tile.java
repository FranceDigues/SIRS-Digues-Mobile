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






    //methode

    public ArrayList<Tile> subServientTile_TMS(){
        ArrayList<Tile> aTile = new ArrayList<Tile>();
        final int Z = this.getZ();
        final int X = (this.getZ())*Z;
        final int Y = (this.getZ())*Z;

        aTile.add(new Tile(Z+1,X,Y));
        aTile.add(new Tile(Z+1,X+1,Y));
        aTile.add(new Tile(Z+1,X+1,Y+1));
        aTile.add(new Tile(Z+1,X+1,Y+1));

        return aTile;


    }




}
