/**
 * Created by roch  DARDIE on 05/05/15.
 */
public final class SingletonCoordinateConvertion {

    private static CoordinateConversion instance = null;

    private SingletonCoordinateConvertion() {
        // La présence d'un constructeur privé supprime le constructeur public par défaut.
        // De plus, seul le singleton peut s'instancier lui-même.
        super();
    }

    /**
     * Méthode permettant de renvoyer une instance de la classe Singleton
     * @return Retourne l'instance du singleton.
     */
    public final static CoordinateConversion getInstance() {
        //Le "Double-Checked Singleton"/"Singleton doublement vérifié" permet
        //d'éviter un appel coûteux à synchronized,
        //une fois que l'instanciation est faite.
        if (SingletonCoordinateConvertion.instance == null) {
            // Le mot-clé synchronized sur ce bloc empêche toute instanciation
            // multiple même par différents "threads".
            // Il est TRES important.
            synchronized(SingletonCoordinateConvertion.class) {
                if (SingletonCoordinateConvertion.instance == null) {
                    SingletonCoordinateConvertion.instance = new CoordinateConversion();
                }
            }
        }
        return SingletonCoordinateConvertion.instance;
    }


}

