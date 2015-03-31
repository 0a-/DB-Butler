Tinytest.add('upsert & remove', function(test){
  var results = DBButler.get({a:0});
  var selectors = [];
  for(key in results){
    if(results.hasOwnProperty('key')){
      results.push({_id:results[key]._id});
    }
  }
  DBButler.remove(selectors);
  DBButler.upsert({_id:123},{$set:{a:0}});
  var id = 123;
  test.equal(DBButler.count({a:0}),1);
  DBButler.remove({_id:id});
  test.equal(DBButler.count({a:0}),0);
  id = DBButler.insert({a:0});
  test.equal(DBButler.count({a:0}),1);
  DBButler.upsert({_id:id},{$set:{a:0}});
  test.equal(DBButler.count({a:0}),1);
  DBButler.remove({_id:id});
});


Tinytest.add('edit, update, increase after find', function(test){
   var id = DBButler.insert({a:"bac"})
   var start = DBButler.count({a:"lol"});
   DBButler.find({_id:id}).edit({a:"lol"});
   test.equal(DBButler.count({a:"lol"}),start+1);
    DBButler.find({_id:id}).update({$set:{a:1}});
    test.equal(DBButler.getOne({_id:id}).a,1);
    DBButler.find({_id:id}).increase({a:1});
    test.equal(DBButler.getOne({_id:id}).a,2);
});
