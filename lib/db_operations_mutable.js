//allows inserting multiple objects
_insert = function(arg0,arg1,arg2){
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
}

_update = function(arg0,arg1,arg2,arg3,arg4){
    var query1 = makeQuery.apply(undefined,[arg0,arg1,arg3]),
        query2 = makeQuery.apply(undefined,[arg1,arg2,arg4]);
    var collectionName = query1.name,
        selector = query1.selector,
        modifier = query2.selector,
        options = query1.options,
        cb = query2.callback;
    return c[ಠ_ಠ.ಠ_ಠ(collectionName)].update(selector,modifier,options,cb);
}