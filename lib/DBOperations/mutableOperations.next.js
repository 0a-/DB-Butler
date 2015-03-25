"use strict" //harmony at works;

export var __ = {

insert : function(){
    var query = makeQuery.apply(undefined,arguments);
    if(Array.isArray(query.selector)){ //allows inserting multiple objects
        var ids = [];
        query.selector.forEach(function(){
            ids.push(query.collection().insert(query.selector,query.cb));
        });
        return ids; //return an array of all ids of inserted docuements
    }else{
        return query.collection().insert(query.selector,query.cb);
    }
},

update : function(){
    var query = makeUpdateQuery.apply(null,arguments);
    return query.collection().update(query.selector,query.modifier,query.options,query.callback);
},

updateOne : function(){
    var query = makeUpdateQuery.apply(null,arguments);
    deepMerge(query.options,{multi:false});
    return this.update.call(this,query);
},

upsert : function(){
    console.log(arguments);
    var query = makeUpdateQuery.apply(null,arguments);
    deepMerge(query.options,{upsert:true});
    console.log(query.options);
    return this.update.call(this,query);
},

edit : function(){
    var query = makeQuery.apply(null,arguments);
    return this.update.apply(this,[query.selector,{$set:query.options}]);
},

increase : function(){
    var query = makeQuery.apply(null,arguments);
    return this.update.apply(this,[query.selector,{$inc:query.options}]);
},

remove : function(){
    var query = makeQuery.apply(null,arguments);
    if(isDemolishing){
        query.addCB(function(){
            //remove relational data
        });
    }
    return query.collection().remove(query.selector,query.cb);
}

}; cloneMerge(_,__); //so now _ also has all the mutable operations