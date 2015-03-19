//virtual object is used for retriving relational data
function virtualObject(selfNumber,selfName){
    this.finds =function(arg0,arg1,arg2){
      var query = makesQuery.apply(undefined,arguments);
      var realtion = r[selfNumber].collectionName;
      if(relation!=={}){
        if(realtion.manyToMany === true)
          return this.manyToMany(query,relation,relation.rCollection,0);
        return this.oneToMany(query,relation,selfNumber);
        }
      }else{
        var collectionNumber = ಠ_ಠ.index[collectionName];
        realtion = r[collectionNumber].selfName;
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

virtualObject.prototype.oneToMany = function(query,relation,number){
  return this.xToX(query,relation,number,0);
}

virtualObject.prototype.manyToOne = function(query,relation,number){
  return this.xToX(query,relation,number,1);
}

virtualObject.prototype.manyToMany = function(query,relation,number,x){
  var key = x===1 ? "a": "b";
  var selector = {};
  selector[key] = this.id;
  query.addSelector(selector);
  return DB_Bulter.finds(query);
}

virtualObject.prototype.xToX = function(query,relation,number,x){
  var foreignKey = r[number].collectionName.foreignKey;
  var xx = [foreignKey,"id"];
  var selector = {};
  selector[xx[x]] = this[xx[1-x]];
  query.addSelector(selector);
  return DB_Bulter.finds(query);
}

virtualObject.prototype.gets = function(arg0,arg1,arg2){
  return get.call(this,arguments);
}
virtualObject.prototype.counts = function(arg0,arg1,arg2){
  return count.call(this,arguments);
}
virtualObject.prototype.getsOne = function(arg0,arg1,arg2){
  return getOne.call(this,arguments);
}
