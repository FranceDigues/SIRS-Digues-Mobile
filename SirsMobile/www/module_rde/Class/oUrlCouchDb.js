/**
 * Created by roch dardie on 28/05/15.
 */


/**
 * @constructor for TMS
 * @param {id admin, psw admin,  ip or url , base de donnée cible }
 *
 */
//TODO expand
function oUrlCouchDb(id,psw,adress,db ){
    this.id= id;
    this.psw= psw;
    this.adress= adress;
    this.db= db;
}



/**
 * @constructor
 * @param {oWmsParams}
 *
 */

oUrlCouchDb.prototype.patch = function(oUrlCouchDb){
    angular.extend(this,oUrlCouchDb);
}



oUrlCouchDb.prototype.getUrlString = function(){
    return "http://"+this.id+":"+this.psw+"@"+this.adress+"/"+this.db;
}

