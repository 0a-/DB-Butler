//allows inserting multiple objects
insert = function(arg0,arg1,arg2){
    var query = makeQuery.call(undefined,arguements);
    var selector = query.selector,
        cb = query.cb,
        collectionName = query.name;
    if(query.selector.isArray()){
        var ids = [];
        returning = query.selector.forEach(function(){
            ids.push(c[ಠ_ಠ.ಠ_ಠ(collectionName)].insert(selector,selector,cb));
        });
        return ids;
    }else{
        return c[ಠ_ಠ.ಠ_ಠ(collectionName)].insert(selector,selector,cb);
    }
}

update = function(arg0,arg1,arg2,arg3,arg4){
    var query1 = makeQuery.call(undefined,[arg0,arg1,arg3]),
        query2 = makeQuery.call(undefined,[arg1,arg2,arg4]);
    var collectionName = query1.name,
        selector = query1.selector,
        modifier = query2.selector,
        options = query1.options,
        cb = quer2.callback;
    return c[ಠ_ಠ.ಠ_ಠ(collectionName)].update(selector,modifier,options,cb);
}