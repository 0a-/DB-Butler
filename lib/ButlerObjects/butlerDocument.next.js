"use strict" //harmony at works;

//here document means the data entry in a mongo collection
export var butlerDocumentPrototypes = [];

export var addDocuementPrototype = function(number,relations){
  butlerDocumentPrototypes[number] = makeButlerDocumentConstructor();
  butlerDocumentPrototypes[number].prototype = new documentStandardPrototype();
  butlerDocumentPrototypes[number].constructor = butlerDocumentPrototypes[number];
}

//this returns a constructor for butler object, used in addDocuementPrototype() for butlerDocumentPrototypes[n]
var makeButlerDocumentConstructor = function(){
  return function(entity,colNumber,colName){
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
}

//documentStandardPrototype is the standard butlerDocument prototype.
//butlerDocuments are created based on different butlerDocumentPrototypes
//and butlerDocumentPrototypes are created based on this very documentStandardPrototype
function documentStandardPrototype (){}

documentStandardPrototype.prototype.of = function(relationName,arg1,relationType){
  if(typeof arg1 === "string"){
    //this means selector is not  the id;
    return;
  }
  var selector = arg1;
  //retrivel relation data
}
documentStandardPrototype.prototype.addRelationFn = function(relation){
  this.constructor[relation] = function(arg0){
    return this.of(relation,arg0);
  }
}
documentStandardPrototype.prototype.ofMany = function(relationName,arg1){
  return this.of(this,relationName,0);
}
documentStandardPrototype.prototype.ofOne = function(relationName,arg1){
  return tthis.of(this,relationName,1);
}
documentStandardPrototype.prototype.oneToMany = function(query,relation,number){
  return this.xToX(query,relation,number,0);
}
documentStandardPrototype.prototype.manyToOne = function(query,relation,number){
  return this.xToX(query,relation,number,1);
}
documentStandardPrototype.prototype.manyToMany = function(query,relation,number,x){
  var key = x===1 ? "a": "b";
  var selector = {};
  selector[key] = this._id;
  query.addSelector(selector);
  return DBButler.find(query);
}
documentStandardPrototype.prototype.xToX = function(selector,relation,number,x){
  //if x is 1, it is many to one (we find the entry in B based on A's foreignKey: get one record with matching id in B)
  //if x is 0, it is one to many (we find the entry in B based on A's id: get mutliple records with matching foreignKey in B)
  var foreignKey = r[number].collectionName.foreignKey;
  var xx = [foreignKey,"id"];
  var selector = {};
  selector[xx[x]] = this[xx[1-x]];
  query.addSelector(selector);
  return DBButler.find(query);
}
//these are all based on .find
//o is defined in & exported from DBOperations/*.js
for(let 口 of ["get","count","getOne", "insert","update","updateOne","upsert","edit","increase","remove"]){
   documentStandardPrototype.prototype[口] = function(){ return o[口].apply(this,arguments); }
}