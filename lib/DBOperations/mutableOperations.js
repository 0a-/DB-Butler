var __ = {
//allows inserting multiple objects
insert : function(arg0,arg1,arg2){
    var query = makeQuery.apply(undefined,arguments);
    var selector = query.selector,
        cb = query.cb,
        collectionName = query.name;
    if(Array.isArray(query.selector)){
        var ids = [];
        returning = query.selector.forEach(function(){
            ids.push(c[ಠ_ಠ.ಠ_ಠ(collectionName)].insert(selector,cb));
        });
        return ids;
    }else{
        //console.log(c[ಠ_ಠ.ಠ_ಠ(collectionName)],selector,cb);
        return c[ಠ_ಠ.ಠ_ಠ(collectionName)].insert(selector,cb);
    }
},

update : function(arg0,arg1,arg2,arg3,arg4){
    var query1 = makeQuery.apply(undefined,[arg0,arg1,arg3]),
        query2 = makeQuery.apply(undefined,[arg1,arg2,arg4]);
    var collectionName = query1.name,
        selector = query1.selector,
        modifier = query2.selector,
        options = query1.options,
        cb = query2.callback;
    return c[ಠ_ಠ.ಠ_ಠ(collectionName)].update(selector,modifier,options,cb);
},

updateOne : function(arg0,arg1,arg2,arg3,arg4){
    deepMerge(arg3,{multi:false});
    return this.update(arg0,arg1,arg2,arg3,arg4);
},

upsert : function(arg0,arg1,arg2,arg3,arg4){
    deepMerge(arg3,{upsert:true});
    return this.update(arg0,arg1,arg2,arg3,arg4);
},

edit : function(arg0,arg1,arg2){
    var query = makeQuery.apply(undefined,arguments);
    return this.update(query.selector,{$set:query.options});
},

increase : function(arg0,arg1,arg2){
    var query = makeQuery.apply(undefined,arguments);
    return this.update(query.selector,{$inc:query.options});
},

remove : function(arg0,arg1,arg2,isDemolishing){
    var query = makeQuery.apply(undefined,arguments);
    if(isDemolishing){
        query.addCB(function(){
            //remove relational data
        });
    }
    return c[ಠ_ಠ.ಠ_ಠ(collectionName)].remove(query.selector,{$inc:query.options});
}

}; cloneMerge(_,__); //so now _ also has all the mutable operations