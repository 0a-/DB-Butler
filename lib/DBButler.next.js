"use strict" //harmony at works;

//these are all the objects that store objects.
export var ಠ_ಠ = {
    collections: [], //array of JSON representation of collections
    index : {}, //name: number <n-th in ಠ_ಠ.collections>
    current : 0,
    ಠ_ಠ : function(name){
        if(name!==undefined)
            ಠ_ಠ.current = ಠ_ಠ.index[name];
        return ಠ_ಠ.current;
    }
};
export var c = []; //array of actual Mongo.collection
export var s = []; //array of schema
export var r = []; //array of relations

export var ↂωↂ = function(){

  for(let 口 of ["prepare","find","count","get","getOne","insert","update","updateOne","upsert","edit","increase","remove"]){
    ↂωↂ[口] = function(){ return o[口].apply(ↂωↂ,arguments) };
  };
  ↂωↂ.assigned = function(name){ return ಠ_ಠ.ಠ_ಠ(name)} 
  //return actual collection
  ↂωↂ.collection = function(name){ return c[ಠ_ಠ.ಠ_ಠ(name)]}
  ↂωↂ._ = function(){ return ಠ_ಠ }

}





