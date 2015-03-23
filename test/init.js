Tinytest.add('init & insert',function(test){
    var col = DBButler.prepare("books");
    col.insert({xxx:"asdx"});
    test.equal(col.find().count()>0,true);
  col.allow({
    'insert': function (userId,doc) {
      return true; 
    },
    'update': function (userId,doc) {
      return true; 
    }
  });
});