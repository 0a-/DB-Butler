deepMerge = function(a,b,clone){
  if(clone!==undefined){
    var z = deepMerge({},a);
  }else{
    var z = a;
  }
  for (var property in b) {
    if (b.hasOwnProperty(property)) {
      if(z[property]!==undefined){
          if((typeof z[property] === "object")){
            deepMerge(z[property],b[property]);
          }else{
            z[property] = b[property];
          }
      }else{
        //overwriting
        z[property] = b[property];
      }
    }
  }
  return z;
}

//OIA == object in array
deepMergeOIA = function(array){
  var result = array[0];
    for(var a = 1; a<array.length; a++){
      result = deepMerge(result,array[a],true);
    }
    return result;
}