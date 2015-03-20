ಠ_ಠ = {
    collections: [], //array of JSON representation of collections
    index : {}, //name: number <n-th in ಠ_ಠ.collections>
    current : 0,
    ಠ_ಠ : function(name){
        if(name!=undefined)
            ಠ_ಠ.current = ಠ_ಠ.index[name];
        return ಠ_ಠ.collections[ಠ_ಠ.current];
    }
};

c = []; //array of Mongo.collection
s = []; //array of schema
r = []; //only contains oneToMany

prepares = function(json){
    ಠ_ಠ.current = ಠ_ಠ.collections.length;
    ಠ_ಠ.index[json.name] = ಠ_ಠ.current;
    ಠ_ಠ.collections.push(json);
    var collectionName = json.name,
    schema = json.schema || {},
    relations = json.relations || {},
    options = json.options || {};
    
    c.push(new Mongo.Collection(name,options));
    s.push(schema);
    r.push(new xToManyRelations(relations,name));

    return ಠ_ಠ.current;
}


find = function(query){
    var selector = query.selector,
        requirements = query.options,
        collectionName = query.name;
    var cursor = c[ಠ_ಠ.ಠ_ಠ(collectionName)].find(selector,requirements);
    return makeButlerObject(cursor,query.name);
}

count = function(arg0,arg1,arg2){
    var query = makesQuery.call(undefined,arguments);
    var cursor = this.finds.apply(this,query);
    return cursor.count(); 
}

get = function(arg0,arg1,arg2){
    var query = makesQuery.call(undefined,arguments);
    var cursor = this.finds.apply(this,query);
    var object = cursor.fetch();
    return makeButlerObject(object,query.name);
}

getOne = function(arg0,arg1,arg2){
    var query = makesQuery.apply(undefined,arguments);
    query.addOption({limit: 1});
    var object = this.gets.apply(this,query)[0];
    return makeButlerObject(object,query.name);
}