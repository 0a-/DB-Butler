Tinytest.add('init & insert',function(test,complete){
DB_Butler.prepare("books");
var result = DB_Butler.insert({"author":"Archy"});
console.log(result);
//test.equal();
complete();
});