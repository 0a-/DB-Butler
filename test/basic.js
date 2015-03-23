
Tinytest.add('count', function(test){
  var col = DBButler.prepare("books");
  DBButler.insert({a:"asd"});

  var c = DBButler.count("books",{});
  test.equal(col.find().count(),c);
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
  console.log(z[0],z1);
  test.equal(z[0].a,z1.a);
});

Tinytest.add('update', function(test){
   DBButler.insert({a:"b"});
  var start = DBButler.count({a:"x"});
  console.log(DBButler.getOne({a:"b"}));
  var id = DBButler.getOne({a:"b"})._id;
  var z2 = DBButler.edit({_id:id},{a:"x"});
  var end = DBButler.count({a:"x"});
  console.log(DBButler.getOne({_id:id}));
  test.equal(start+1,end);
});
