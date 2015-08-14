/**
 * Created by roch Dardie on 10/08/15.
 */


/**
 * @constructor for TMS
 * @param {ol.SourceType, URI }
 *
 */

function oSirsDesordre(param){
    this["@class"] ="fr.sirs.core.model.Desordre";
    this.state= {valide:false, ended:false,closed:false};

    this.author=param.author;
    this.date = Date.now();
    //this.observations = param.observations !=null ? param.observations : new oSirsObs();
    this.observations = new oSirsObs();
}

