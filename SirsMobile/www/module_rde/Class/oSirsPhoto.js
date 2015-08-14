/**
 * Created by roch dardie on 13/08/15.
 */

function oSirsPhoto(param){
    this["@class"] = "fr.sirs.core.model.Photo";
    this.borne_debut_aval= null;
    this.borne_debut_distance= null;
    this.prDebut= false;
    this.borne_fin_aval= null;
    this.borne_fin_distance =null;
    this.prFin=null;

    this.valid = false;
    this.author = param.author;


    //this.id = param.id != null ? param.id : uuid4.generate();
    this.id = uuid4.generate();
    this.date = Date.now();



    this.designation = null;
    this.chemin =param.chemin !=null?param.chemin: this.id+".jpg"; //pour les nouvelle photo le chemin n'est autre que le nom de fichier
    this.commentaire =  param.commentaire;
    this.orientationPhoto = null;
    this.coteId = null;
    this.photographeId = null;
    this.positionDebut = null;
    this.positionFin = null;
    this.geometry = null;
}



//            {
//                "@class": "fr.sirs.core.model.Photo",
//                "borne_debut_aval": false,
//                "borne_debut_distance": 0,
//                "prDebut": 283.0174,
//                "borne_fin_aval": false,
//                "borne_fin_distance": 0,
//                "prFin": 283.0174,
//                "valid": true,
//                "designation": "3",
//                "longitudeMin": 4.589586845598048,
//                "longitudeMax": 4.589586845598048,
//                "latitudeMin": 43.688331794628915,
//                "latitudeMax": 43.688331794628915,
//                "chemin": "\\Photos\\2.JPG",
//                "commentaire": "Passage sur talus",
//                "orientationPhoto": "RefOrientationPhoto:7",
//                "coteId": "RefCote:2",
//                "photographeId": "dbf7020b90a871e68dd51ba99c001b84",
//                "positionDebut": "POINT (828183.4417727306 6288989.939847441)",
//                "positionFin": "POINT (828183.4417727306 6288989.939847441)",
//                "geometry": "LINESTRING (828183.2535037622 6288990, 828183.2535037622 6288990)",
//                "id": "76e6b9fc-4fe0-467c-b670-bf50ddf66549",
//                "date": "2006-12-15"
//            }