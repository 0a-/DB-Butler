"use strict" //harmony at works;

//cloneMerge don't merge inner objects' properties: but keep their prototypes
export var cloneMerge = function(a={},b,clone){
   if(clone!==undefined){
    var z = deepMerge({},a);
  }else{
    var z = a;
  }
   for (var property in b) {
    if (b.hasOwnProperty(property)){
      z[property] = b[property];
    }
  }
  return z
}
//deepMerge merges inner objects' properties: but don't keep their prototypes
export var deepMerge = function(a={},b,clone){
  if(clone!==undefined){
    var z = deepMerge({},a);
  }else{
    var z = a;
  }
  for (var property in b) {
    if (b.hasOwnProperty(property)) {
      //console.log("b does have",property,b[property]);
      if(z[property]!==undefined){
        //console.log("z does have",property, z[property]);
          if((typeof b[property] === "object")){
            if(z[property] === null){
              z[property] = {};
            }
            deepMerge(z[property],b[property]);
          }else{
            //overwriting
            z[property] = b[property];
          }
      }else{
        //console.log("z doesn't have",property);
        //adding
        z[property] = b[property];
      }
    }
  }
  return z;
}
//OIA == object in array
export var deepMergeOIA = function(array){
  var result = array[0];
    for(var a = 1; a<array.length; a++){
      result = deepMerge(result,array[a],true);
    }
    return result;
}