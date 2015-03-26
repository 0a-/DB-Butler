Tinytest.add('one owner to many cats', function(test){
    var start = DBButler.prepare("cat").ofOne("owner");
  	DBButler.insert({"name":"nyanCat"}).of("owner","Archy");
	DBButler.prepare("owner"); 

});
