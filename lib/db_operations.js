ಠ_ಠ = {
    collections: [], //array of JSON representation of collections
    index = {} //name: number <n-th in ಠ_ಠ.collections>
};

c = []; //array of Mongo.collection
s = []; //array of schema
r = []; //only contains oneToMany

prepares = function(json){
    var number = ಠ_ಠ.collections.length;
    ಠ_ಠ.index[json.name] = number;
    ಠ_ಠ.collections.push(json);
    
    var collectionName = json.name,
    schema = json.schema || {},
    relations = json.relations || {},
    options = json.options || {};
    
    c.push(new Mongo.Collection(name,options));
    s.push(schema);
    r.push(new xToManyRelations(relations,name));

    return number;
}


find = function(query){
    var collectionName = query.name, selector = query.selector,
    requirements = query.requirements;
    return c[ಠ_ಠ.collections[collectionName]].find(selector,requirements); //return cursor
}

count = function(arg0,arg1,arg2){
    var query = makesQuery.call(undefined,arguments);
    var cursor = this.finds.apply(this,query);
    return cursor.count(); 
}

get = function(arg0,arg1,arg2){
    var query = makesQuery.call(undefined,arguments);
    var cursor = this.finds.apply(this,query);
    return cursor.fetch();
}

getOne = function(arg0,arg1,arg2){
    var query = makesQuery.apply(undefined,arguments);
    var collectionName = query.name;
    var collectionNumber = ಠ_ಠ.index[collectionName];
    query.addOption({limit: 1});
    var object = this.gets.apply(this,query)[0];
    var virtualObject = virtualObject(collectionNumber,collectionName);
    deepMerge(virtualObject,object);
    return virtualObject;
}