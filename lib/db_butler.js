"user strict"

//DB_Bulter is in charge of database relation model & schema
DB_Bulter = function(){

  DB_Bulter.prepares = function(json){
   return prepare.call(undefined,arguments);
  }

  DB_Bulter.makesQuery = function(arg0,arg1,arg2){
    return makeQuery.call(undefined,arguments);
  }

  DB_Bulter.finds = function(query){
    return find.call(DB_Bulter,arguments);
  }

  DB_Bulter.counts = function(arg0,arg1,arg2){
    return count.call(DB_Bulter,arguments);
  }

  DB_Bulter.gets = function(arg0,arg1,arg2){
    return get.call(DB_Bulter,arguments);
  }

  DB_Bulter.getsOne = function(arg0,arg1,arg2){
    return getOne.call(DB_Bulter,arguments);
  }

  DB_Bulter.inserts = function(){

  }

  DB_Bulter._ = function(){
    return ಠ_ಠ;
  }

}
