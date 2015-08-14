/**
 * Created by roch dardie on 13/08/15.
 */


function oSirsObs(param){
    this["@class"] = "fr.sirs.core.model.Observation";
    this.state= {valide:false, ended:false,closed:false};

    this.nombreDesordres= null;
    this.designation= null;
    this.valid= false;
    this.observateurId= null;
    this.author= param.author;
    this.photos =[];
    this.id=uuid4.generate();
    this.date = Date.now();



}

