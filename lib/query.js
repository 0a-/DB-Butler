query = function(name,sel,requirements){
    this.name = name;
    this.selector = sel;
    if(requirements.isArray()){
        this.requirement = deepMergeOIA(requirements);
      }else{
        this.requirement = requirements;
    }
}

query.prototype.addOption = function(options){
    var option;
    if(options.isArray()){
      option = deepMergeOIA(options);
    }else{
      option = options;
    }
    this.requirements = deepMerge(this.requirements,option);
}

query.prototype.addSelector = function(selector){
    var selector;
    this.selector = deepMerge(this.selector,selector);
}

makesQuery = function(arg0,arg1,arg2){
    if(arg1!==undefined){
      return new query(arg0,arg1,arg2);
    }else{
      return arg0;
    }
}