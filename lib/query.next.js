"use strict" //harmony at works;

export var query = function(){};

query.prototype.addSelector = function(selector){
  if(!Array.isArray(this.selector)){
    //this.selector is array iff it is an insert statement of mutli records
    this.selector = deepMerge(this.selector,selector);
  }
};

export var queryWithOption = function(name,sel,options = {}){
  this.name = name;
  this.selector = sel;
  if(Array.isArray(options)){
      this.options = deepMergeOIA(options);
    }else{
      this.options = options;
  }
}
export var queryWithCB = function(name,sel,callback){
  this.name = name;
  this.selector = sel;
  this.callback = callback;
}

queryWithOption.prototype = new query();
queryWithCB.prototype = new query();

queryWithOption.prototype.addOption = function(options = {}){
    var option;
    if(Array.isArray(options)){
      option = deepMergeOIA(options);
    }else{
      option = options;
    }
    this.options = deepMerge(this.options,option);
}

queryWithCB.prototype.addCB = function(callback = new Function()){
  this.callback = function(){
    callback();
    this.callback();
  }
}

export var makeQuery = function(arg0 = {},arg1,arg2){
    if(arg0.constructor!==query){
      if(typeof arg0 === "object") // this means colectionName is not specified
        return new queryWithOption(undefined,arg0,arg1);
      if(typeof arg2 !== "function")
        return new queryWithOption(arg0,arg1,arg2);
      return new queryWithCB(arg0,arg1,arg2);
    }
      return arg0;
  }
