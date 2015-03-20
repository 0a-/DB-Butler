"user strict"

query.prototype.addSelector = function(selector){
  if(!this.selector.isArray()){
    var selector;
    this.selector = deepMerge(this.selector,selector);
  }
}

queryWithOption.prototype = new query();
queryWithCB.prototype = new query();

queryWithOption = function(name,sel,options){
    this.name = name;
    this.selector = sel;
    if(options.isArray()){
        this.options = deepMergeOIA(options);
      }else{f
        this.options = options;
    }
}
queryWithCB = function(name,sel,callback){
  this.name = name;
    this.selector = sel;
    this.callback = callback;
}

queryWithOption.prototype.addOption = function(options){
    var option;
    if(options.isArray()){
      option = deepMergeOIA(options);
    }else{
      option = options;
    }
    this.options = deepMerge(this.options,option);
}

queryWithCB.prototype.addCB = function(callback){
  this.callback = function(){
    callback();
    this.callback();
  }
}

makesQuery = function(arg0,arg1,arg2){
    if(arg0.constructor!==query){
      if(typeof arg2 !== "function")
        return new queryWithOption(arg0,arg1,arg2);
      return new queryWithCB(arg0,arg1,arg2);
    }else{
      return arg0;
    }
}
