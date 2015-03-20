"user strict" //harmony at works; looks like it has to 'use strict'

global.ↂωↂ = function(){

  ↂωↂ.prepares = function(json){ return prepare.call(undefined,arguments) }

  ↂωↂ.finds = function(query){ return find.call(ↂωↂ,arguments) }

  ↂωↂ.counts = function(arg0,arg1,arg2){ return count.call(ↂωↂ,arguments) }

  ↂωↂ.gets = function(arg0,arg1,arg2){ return get.call(ↂωↂ,arguments) }

  ↂωↂ.getsOne = function(arg0,arg1,arg2){ return getOne.call(ↂωↂ,arguments) }

  ↂωↂ.inserts = function(arg0,arg1,arg2){ return insert.call(ↂωↂ,arguments) }

  ↂωↂ.updates = function(arg0,arg1,arg2,option,callback){ return update.call(ↂωↂ,arguments) }

  ↂωↂ.updatesOne = function(){

  }

  ↂωↂ.upserts = function(){

  }

  ↂωↂ.upsertsOne = function(){

  }

  ↂωↂ.changes = function(){ //a simplified version of updates

  }

  ↂωↂ.increases = function(){

  }

  ↂωↂ.removes = function(arg0,arg1,arg2,isDemolishing,callBack = 'a'){

    if(isDemolishing){
      //remove hasMany relation objects too?
    }else{
      //if not, sir, what should I do with relational objects?
      callBack();
    }
  }

  ↂωↂ._ = function(){ return ಠ_ಠ }

}


