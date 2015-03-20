Tinytest.add('init & insert',function(test){
    if(Meteor.is_server) {
        var col = DB_Butler.prepare("books");
      col.allow({
        'insert': function (userId,doc) {
          /* user and doc checks ,
          return true to allow insert */
          return true; 
        }
      });
    }
    if(Meteor.is_client) {
        var col = DB_Butler.prepare("books");
        var result = DB_Butler.insert({"author":"Archy"});
        console.log(result);
    }
    //test.equal();
});