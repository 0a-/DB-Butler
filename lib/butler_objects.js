//butler objects is used for retriving relational data

function makeButlerObject(object,name){
    var collectionName = name;
    var collectionNumber = ಠ_ಠ.index[collectionName];
    if(object.constructor === "cursor")
      return new butlerCursor(object,collectionNumber,collectionName);
    return new butlerEntity(object,collectionNumber,collectionName);   
}


function butlerCursor(cursor,colNumber,colName){ //butler cursor: not your odinary cursor
  deepMerge(this,cursor);
  this.colName = colName;
  this.colNumber = colNumber;
}


butlerCursor.prototype = new cursor();
butlerCursor.constructor = butlerCursor;

butlerCursor.prototype.find(arg0,arg1,arg2){
  var object = this.fetch(); //Don't understand this line? Don't forget this is a cursor!
  var bEntity = makeButlerObject(object,this.colNumber,this.colName);
  return bEntity.find(arg0,arg1,arg2);
}

butlerCursor.prototype.get = function(arg0,arg1,arg2){
  return get.apply(this,arguments);
}
butlerCursor.prototype.count = function(arg0,arg1,arg2){
  return count.apply(this,arguments);
}
butlerCursor.prototype.getOne = function(arg0,arg1,arg2){
  return getOnze.apply(this,arguments);
}

/** extra feature! we can update/delete records from cursor **/
butlerCursor.prototype.updates = function(arg0,arg1,arg2){

}

butlerCursor.prototype.remove = function(arg0,arg1,arg2){

}


function butlerEntity(entity,colNumber,colName){
    deepMerge(this,entity);
    this.find =function(arg0,arg1,arg2){
      var query = makeQuery.call(undefined,arguments);
      var realtion = r[colNumber].collectionName;
      if(relation!=={}){
        if(realtion.manyToMany === true)
          return this.manyToMany(query,relation,relation.rCollection,0);
        return this.oneToMany(query,relation,colNumber);
        }
      }else{
        var collectionNumber = ಠ_ಠ.index[collectionName];
        realtion = r[collectionNumber].colName;
        if(relation!=={}){
          if(realtion.manyToMany === true)
            return this.manyToMany(query,relation,relation.rCollection,1);
          return this.manyToOne(query,relation,collectionName);
        }else{
          //no relationship
        }
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
  selector[key] = this.id;
  query.addSelector(selector);
  return DB_Bulter.find(query);
}

butlerEntity.prototype.xToX = function(query,relation,number,x){
  var foreignKey = r[number].collectionName.foreignKey;
  var xx = [foreignKey,"id"];
  var selector = {};
  selector[xx[x]] = this[xx[1-x]];
  query.addSelector(selector);
  return DB_Bulter.find(query);
}

butlerEntity.prototype.get = function(arg0,arg1,arg2){
  return get.apply(this,arguments);
}
butlerEntity.prototype.count = function(arg0,arg1,arg2){
  return count.apply(this,arguments);
}
butlerEntity.prototype.getOne = function(arg0,arg1,arg2){
  return getOne.apply(this,arguments);
}
