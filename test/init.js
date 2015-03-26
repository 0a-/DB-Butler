Tinytest.add('server init',function(test){
    if(Meteor.isServer===true){
      DBButler.prepare("books");
      DBButler.insert({z:"asdx"});
      test.equal(DBButler.count()>0,true);
       console.log(DBButler.collection());
    DBButler.collection().allow({
      'insert': function (userId,doc) {
        return true; 
      },
      'update': function (userId,doc) {
        return true; 
      },
      'remove': function (userId,doc) {
        return true; 
      }
    });
  }
});

Tinytest.add('client init',function(test){
  if(Meteor.isClient===true){
      DBButler.prepare("books");
   }
});