/**
 * Created by roch dardie on 28/05/15.
 */


/**
 * @constructor for TMS
 * @param {id admin, psw admin,  ip or url , base de donnée cible }
 *
 */
//TODO expand
function oUrlCouchDb(id,psw,adress,port,db ){
    this.id= id;
    this.psw= psw;
    this.adress= adress;
    this.port =port;
    this.db= db;
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

