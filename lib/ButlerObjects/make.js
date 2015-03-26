makeButlerObject = function(object,name){
    if(object === undefined){
      return {}
    }
    if(object.constructor === query){
      return new butlerCursor(object);
    }
    if(typeof object === "number"){
    	return new butlerCollection(object);
    }
    var collectionName = name;
    var collectionNumber = ಠ_ಠ.ಠ_ಠ(name);
    //there are many type of butler documents
    //different butler documents have different functions for relational data retriving
    return new butlerDocumentPrototypes[collectionNumber](object,collectionNumber,collectionName);   
}
