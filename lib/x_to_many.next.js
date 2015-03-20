"user strict" //harmony at works; looks like it has to 'use strict'

var r_queue = []; //manyToOne would be queued until it can be added to r

global.xToManyRelations = function (relations,collectionName){
    this.fromQueue(collectionName);
    this.fromArray(relations.oneToMany);
    this.fromArray(relations.manyToOne,collectionName,false);
    this.fromManyToMany(relations.manyToMany,collectionName);
}

xToManyRelations.prototype.fromArray = function(array = [], Bname = undefined, isOneToMany = true){
    array.forEach(function(ele){
        if(typeof ele === "string"){
            foreignKey = ele+"_id";
            AName = ele;
            relationName = ele;
        }else{
            foreignKey = ele.foreignKey;
            BName = isOneToMany? ele.collectionName : Bname;
            relationName = ele.relationName || collectionName;
        }

        if(isOneToMany){
            this[relationName] = {
                foreignKey:foreignKey,
                collectionName:BName
            };
        }else{
            //it is manyToOne relation.
            r_queue.push({
                relationName:relationName,
                foreignKey:foreignKey,
                AName: ele.collectionName,
                BName: BName
            });
        }
    });
}

xToManyRelations.prototype.fromQueue = function(AName){
    r_queue.forEach(function(ele){
        if(ele.AName === AName){
            this[ele.relationName] = {
                foreignKey:ele.foreignKey,
                collectionName:ele.BName
            }
        }
    });
}

xToManyRelations.prototype.fromManyToMany = function(array = [],AName){
    array.forEach(function(ele){
        var schema = {}, BName = ele.collectionName;
        var key1 = ele.selfKey || AName+"Id", 
        key2 = ele.foreignKey || BName+"Id";
        if(key1 === key2) key2+="2";
        schema[key1] = "string";
        schema[key2] = "string"
        schema.created_on = "time";
        var relationCollection = ele.collection || {
            name: "manyToMany_"+AName+BName,
            schema: schema
        };
        var relationCollectionNumber = DB_Butler.prepare(relationCollection);
        this[ele.relationName] = {
            manyToMany: true,
            rCollection:relationCollectionNumber,
            a: ele.selfKey,
            b: ele.foreignKey
        }
    });
}

