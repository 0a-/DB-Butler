"use strict" //harmony at works; looks like it has to 'use strict'


export var ↂωↂ = function(){

  ↂωↂ.prepare = function(json){ return _prepare.apply(undefined,arguments) }

  ↂωↂ.find = function(query){ return _find.apply(ↂωↂ,arguments) }

  ↂωↂ.count = function(arg0,arg1,arg2){ return _count.apply(ↂωↂ,arguments) }

  ↂωↂ.get = function(arg0,arg1,arg2){ return _get.apply(ↂωↂ,arguments) }

  ↂωↂ.getOne = function(arg0,arg1,arg2){ return _getOne.apply(ↂωↂ,arguments) }

  ↂωↂ.insert = function(arg0,arg1,arg2){ return _insert.apply(ↂωↂ,arguments) }

  ↂωↂ.update = function(arg0,arg1,arg2,option,callback){ return _update.apply(ↂωↂ,arguments) }

  ↂωↂ.updateOne = function(){

  }

  ↂωↂ.upsert = function(){

  }

  ↂωↂ.upsertOne = function(){

  }

  ↂωↂ.change = function(){ //a simplified version of updates

  }

  ↂωↂ.increases = function(){

  }

  ↂωↂ.removes = function(arg0,arg1,arg2,isDemolishing,callback = 'a'){

    if(isDemolishing){
      //remove hasMany relation objects too?
    }else{
      //if not, sir, what should I do with relational objects?
      callback();
    }
  }

  ↂωↂ._ = function(){ return ಠ_ಠ }

}


