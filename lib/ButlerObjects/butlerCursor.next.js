"use strict" //harmony at works;

//butler objects is used for retriving relational data
//& enabling syntax like .find().edit({});

export function butlerCursor(query){ 
  //butler cursor: technically speaking, it is not a cursor
  this.query = query;
}

//make butlerCursor behaves like normal cursor without being a cursor
butlerCursor.prototype.makeCursor = function(){
    //this returns an actual Mongo.cursor
    return this.query.collection().find(this.query.selector,this.query.options);
}
var cursorPrototype = new Mongo.Cursor();
for (let 口 in cursorPrototype){
  if(typeof cursorPrototype[口] === "function"){ 
    butlerCursor.prototype[口] = function(){
      var cursor = this.makeCursor(); 
      return cursor[口].apply(cursor,arguments);
    }; 
  }
};

//this just makes dev's life so much easier
for (let 口 of ["update","updateOne","upsert","edit","increase","remove"]){
  butlerCursor.prototype[口] = function(){
    var args = cloneMerge([],arguments);
    args.unshift(this.query.collectionNumber,this.query.selector);
    return DBButler[口].apply(DBButler,args); 
    //TIL "arguments" is not an array.
  }
}

//enable relational mapping through cursor
butlerCursor.prototype.find = function(arg0,arg1,arg2){
  return makeButlerObject(this.fetch(),this.colName).find(arg0,arg1,arg2)
}



