
Tinytest.add('count', function(test){
  DBButler.insert({a:"asd"});
  var c = DBButler.count("books",{});
  test.equal(DBButler.collection().find().count(),c);
  DBButler.insert([{a:"asd"},{a:"asd"},{a:"asd"}]);
  var d = DBButler.count();
  test.equal(d,c+3);
});

Tinytest.add('find & get', function(test){
  DBButler.insert({a:"b"});
  var t = DBButler.find({a:"b"}).fetch();
  var z = DBButler.get({a:"b"});
  test.equal(t[0],z[0]);
  z1 = DBButler.getOne({a:"b"});
   z1 = DBButler.getOne({a:"b"});
  test.equal(z[0].a,z1.a);
});

Tinytest.add('update', function(test){
  var id =DBButler.insert({a:"b"});
  var start = DBButler.count({a:"x"});
  var z2 = DBButler.edit({_id:id},{a:"x"});
  var end = DBButler.count({a:"x"});
  test.equal(start+1,end);
});
