"use strict" //harmony at works;

export var query = function(name,sel,modifier = {},options = {},callback = new Function()){
  this.collectionNumber = Number.isInteger(name) ? name : ಠ_ಠ.ಠ_ಠ(name); 
  this.selector = sel;
  this.modifier = modifier;
  this.callback = callback;
  if(Array.isArray(options)){ //options can be an array
    this.options = deepMergeOIA(options);
  }else{
    this.options = options;
  }
}
query.prototype.addSelector = function(selector){
  if(!Array.isArray(this.selector))
    deepMerge(this.selector,selector);
  //this.selector is array iff it is an insert or remove statement of mutli records
  //in which case we would do nothing for now
};
query.prototype.collection = function(){
  return c[this.collectionNumber];
}
query.prototype.addOption = function(options = {}){
    var option;
    if(Array.isArray(options)){
      option = deepMergeOIA(options);
    }else{
      option = options;
    }
    this.options = deepMerge(this.options,option);
}
query.prototype.addCB = function(callback = new Function()){
  this.callback = function(){
    callback();
    this.callback();
  }
}
export var makeQuery = function(arg0 = {},arg1 = {},arg2,arg3,arg4,isUpdate){ //arg0 can be "string" (when it is a collectionName)
    if(arg0.constructor!==query){
      //reason for the line above:
      //1. "arguemnts" is not an array; can't splice. Elegant solution: use deepClone(), but no point in doing that because ... (see reason 2)
      //2. sadly "arguments" doesn't take the default values; so here arguemnts[0] is still undefined although arg0's defualt value is {}
      var a = [arg0,arg1,arg2,arg3,arg4];
      //now manipuate value positions according to 
      //query = function(name,sel,modifier,options,callback)
      if(!(typeof a[0] === "string" || typeof a[0] === "number")){ 
        //this means name is not specified
        a.unshift(undefined);
      }
      if(typeof a[4] === "function"){ 
        //everything is alright :D
      }else if(typeof a[2] === "function"){ 
        //push function to last arguement
        a.splice(2, 0, undefined,undefined);
      }else if(isUpdate!==true){
        //that means there is no modifier
        //option should go to 3;
        a.splice(2, 0, undefined);
      }
      a.unshift(null); //pass null for the first arguement in .apply
      if(isUpdate){
        console.log("update");
       console.log(JSON.stringify(new (Function.prototype.bind.apply(query,a))));
      }
      return new (Function.prototype.bind.apply(query,a));
    }
      return arg0;
  }
//update query is more speical because it takes in 5 parameters
export var makeUpdateQuery = function(arg0 = {},arg1 = {},arg2,arg3,arg4){
  return makeQuery.apply(null,[arg0,arg1,arg2,arg3,arg4,true]);
}