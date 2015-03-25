//butler objects is used for retriving relational data
//& enabling syntax like .find().edit({});

export var makeButlerObject = function(object,name){
    if(object === undefined){
      return {}
    }
    if(object.constructor === query){
      return new butlerCursor(object);
    }
    var collectionName = name;
    var collectionNumber = ಠ_ಠ.ಠ_ಠ(collectionName);
    return new butlerEntity(object,collectionNumber,collectionName);   
}



function butlerCursor(query){ 
  //butler cursor: technically speaking, it is not a cursor
  this.query = query;
}

butlerCursor.prototype.makeCursor = function(){
    //this returns an actual Mongo.cursor
    return this.query.collection().find(this.query.selector,this.query.options);
}

var cursorPrototype = new Mongo.Cursor();

for (let key in cursorPrototype){
  if(typeof cursorPrototype[key] == "function")
    butlerCursor.prototype[key] = function(){return this.makeCursor()[key]()};
}


butlerCursor.prototype.find = function(arg0,arg1,arg2){
  var object = this.fetch();
  var bEntity = makeButlerObject(object,this.colName);
  return bEntity.find(arg0,arg1,arg2);
}

var operations = [
"update",
"updateOne",
"upsert",
"edit",
"increase",
"remove"
];

//these operations just make dev's life a lot easier :)
operations.forEach(function(name,index,arr){
  butlerCursor.prototype[name] = function(){
    var a = cloneMerge([],arguments); //TIL "arguments" is not an array.
    a.unshift(this.query.collectionNumber,this.query.selector);
    console.log(a);
    return DBButler[name].apply(DBButler,a); 
  }
});

function butlerEntity(entity,colNumber,colName){
    cloneMerge(this,entity);
    this.find =function(arg0,arg1,arg2){
      var query = makeQuery.call(undefined,arguments);
      var relation = r[colNumber].colName;
      if(relation==undefined){
        //it is either a ManyToOne relation or no relation
        var collectionNumber = ಠ_ಠ.ಠ_ಠ(query.name);
        realtion = r[collectionNumber].colName;
        if(relation!==undefined){
          if(realtion.manyToMany === true)
            return this.manyToMany(query,relation,relation.rCollection,1);
          return this.manyToOne(query,relation,collectionName);
        }else{
         //no relationship
        }
      }else{
        if(realtion.manyToMany === true)
          return this.manyToMany(query,relation,relation.rCollection,0);
        return this.oneToMany(query,relation,colNumber);
     }
  }
}

butlerEntity.prototype.oneToMany = function(query,relation,number){
  return this.xToX(query,relation,number,0);
}

butlerEntity.prototype.manyToOne = function(query,relation,number){
  return this.xToX(query,relation,number,1);
}

butlerEntity.prototype.manyToMany = function(query,relation,number,x){
  var key = x===1 ? "a": "b";
  var selector = {};
  selector[key] = this._id;
  query.addSelector(selector);
  return DBButler.find(query);
}

butlerEntity.prototype.xToX = function(query,relation,number,x){
  var foreignKey = r[number].collectionName.foreignKey;
  var xx = [foreignKey,"id"];
  var selector = {};
  selector[xx[x]] = this[xx[1-x]];
  query.addSelector(selector);
  return DBButler.find(query);
}

operations = [
"get",
"count",
"getOne",
"insert",
"update",
"updateOne",
"upsert",
"edit",
"increase",
"remove"];

operations.forEach(function(name,index,arr){
  butlerEntity.prototype[name] = function(){ return _[name].apply(this,arguments); }
});
