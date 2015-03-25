"use strict" //harmony at works;


var operations = [
"prepare",
"find",
"count",
"get",
"getOne",
"insert",
"update",
"updateOne",
"upsert",
"edit",
"increase",
"remove"];

export var ↂωↂ = function(){

  operations.forEach(function(name,index,array){
    ↂωↂ[name] = function(){ return _[name].apply(ↂωↂ,arguments) };
  });

  ↂωↂ._ = function(){ return ಠ_ಠ }

}


