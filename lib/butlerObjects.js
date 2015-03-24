//butler objects is used for retriving relational data

makeButlerObject = function(object,name){
    if(object === undefined){
      return {}
    }
    var collectionName = name;
    var collectionNumber = ಠ_ಠ.ಠ_ಠ(collectionName);
    if(object.constructor === Mongo.Cursor){
      return new butlerCursor(object,collectionNumber,collectionName);
    }
    return new butlerEntity(object,collectionNumber,collectionName);   
}


function butlerCursor(cursor,colNumber,colName){ //butler cursor: not your odinary cursor
  cloneMerge(this,cursor);
  this.colName = colName;
  this.colNumber = colNumber;
}


butlerCursor.prototype = new Mongo.Cursor();
butlerCursor.constructor = butlerCursor;

butlerCursor.prototype.find = function(arg0,arg1,arg2){
  //Don't forget this is a cursor! So we can't perform direct find on it
  var object = this.fetch();
  var bEntity = makeButlerObject(object,this.colName);
  return bEntity.find(arg0,arg1,arg2);
}

/** extra feature! we can update/delete records from cursor **/
butlerCursor.prototype.update = function(arg0,arg1,arg2){

}

butlerCursor.prototype.remove = function(arg0,arg1,arg2){

}


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
butlerEntity.prototype.get = function(arg0,arg1,arg2){
  return _get.apply(this,arguments);
}
butlerEntity.prototype.count = function(arg0,arg1,arg2){
  return _count.apply(this,arguments);
}
butlerEntity.prototype.getOne = function(arg0,arg1,arg2){
  return _getOne.apply(this,arguments);
}
