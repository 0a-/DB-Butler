"use strict" //harmony at works;

export var butlerCollection = function(number){ 
  this.collectionNumber = number;
  addDocuementPrototype(number); //fn in butlerDocument.js
}

butlerCollection.prototype.ofOne = function(relationName){
	butlerDocumentPrototypes[this.number].addRelation(relationName);
}

butlerCollection.prototype.hasMany = function(collectionName){
	butlerDocumentPrototypes[this.number].addRelation(relationName);
}
