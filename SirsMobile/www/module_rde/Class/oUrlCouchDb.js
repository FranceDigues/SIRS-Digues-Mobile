/**
 * Created by roch dardie on 28/05/15.
 */


/**
 * @constructor for TMS
 * @param {id admin, psw admin,  ip or url , base de donnée cible }
 *
 */
//TODO expand
//id,psw,adress,port,db
function oUrlCouchDb(param ){
    this.id= param.id;
    this.psw= param.psw;
    this.adress= param.adress;
    this.port =param.port;
    this.db= param.db;
}



/**
 * @constructor
 * @param {oWmsParams}
 *
 */

oUrlCouchDb.prototype.patch = function(obj){
    angular.extend(this,obj);
    //this.id= obj.id;
    //this.psw= obj.psw;
    //this.adress= obj.adress;
    //this.port =obj.port;
    //this.db= obj.db;
}



oUrlCouchDb.prototype.getUrlString = function(){
    return "http://"+this.id+":"+this.psw+"@"+this.adress+":"+this.port+"/"+this.db;
}

