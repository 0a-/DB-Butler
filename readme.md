What is DBButler?
===================

DBButler manages your Mongo Collections in Meteor. It is basically a library that provides a flexible ORM (Object-relational mapping), hooks and  schema validation.

It is designed in a way that it is flexible for humans to use, the same time also can be seamlessly integrated into Archy.io.

----------

Why uses DBButler?
===================

It is written in vanilla JavaScript (I'm pretty anti-coffeeScript :D ) in closures & prototypes. It does not pretend to be class-based OO. 

And it is super easy to use.


Quickstart:
-------------
```
meteor add arch:db-butler
```

Create a collection & Insert a document
-------------

To create a collection and insert a record:

```javascript
DBButler.prepare("book"); //this creates a new Mongo.Collection("book")
DBButler.insert({"title":"on anarchism"}); //this will insert into the latest collection touched by DBButler
```
You can also specify which collection you want to insert into like this:
```javascript
DBButler.insert("book",{"title":"on anarchism"});
```

Create a collection with schema
-------
```javascript
DBButler.prepare({colName:"book",schema:{title:"string"});
```
A schema can be useful later on (to create forms, validation,  permission, etc). But it is not really necessary to create a schema for every collection.


Edit a collection
-------------

To edit a field in some documents in your collection, simply do this:
```javascript
DBButler.edit("cat",{"name":"nyanCat"},{"furColor":"white"}); //this would change the furColor to "white" for the documents in "cat" collections that have name "nyanCat".
```
You can simply this do if the last collection DBButler interacts with is "cat":
```javascript
DBButler.edit({"name":"nyanCat"},{"furColor":"white"}); 
```
And that's the same as doing this:
```javascript
DBButler.find({"name":"nyanCat"}).edit({"furColor":"white"}); 
```
And this is equivalent to doing an update with $set:
```javascript
DBButler.find({"name":"nyanCat"}).update({$set:{"furColor":"white"}}); 
```



ManyToOne / OneToMany Relation:
-------------

Now let's say you want to collection "book" to establish a "haveOne" relation with "author",  it can be easily done with `.ofOne()` 

```javascript
DBButler.prepare("book").ofOne("author");
```

Afterwards if you want to insert a document with relation, just uses `.of()`

```javascript
DBButler.insert({"title":"on anarchism"}).of("author","Noam Chomsky"); //this will insert {"title":"on anarchism"} into "book" with foreign key "authorId", and {authorName:"Noam Chomsky"} into "author" if there is no Noam Chomsky in "author"
DBButler.prepare("author"); //you can prepare "author" any time you want. The insert above will be executed as long as both collections ("books" & "author") are prepared.
```


This does basically the same thing as the code below. (The code below provides more degrees of freedom for configuring)
```javascript
DBButler.prepare({colName:"book",ofOne:[{colName:"author", privateKey: "authorId", relation:"author"}]);
DBButler.insert("book",{"title":"on anarchism"}).of("author",{authorName: "Noam Chomsky"});
DBButler.prepare({colName:"author"});
```
or you can do it with `.hasMany()` too:
```javascript
DBButler.prepare("author").hasMany("book");
var chomsky = DBButler.insert({"authorName":"Noam Chomsky"}); //this returns ._id
DBButler.prepare({colName:"book"}).insert({"title":"on anarchism"}).author(chomsky); //.author is the same as .of("author",{_id:chomsky});
```

(You can read the docs <a href="">here</a> to learn more about it. I will be writing a simple tutorial for it.)

ManyToMany Relation
-------------
It can be easily achieved with  `.ofMany` or `.haveMany` (which are functionally equivalent).
```javascript
DBButler.prepare("cat").ofMany("awesomeness");
DBButler.insert({"name":"Noam Chomsky"}).of(["lingustics","logician","anarcho-syndicalist"]);
DBButler.prepare("awesomeness");
```
This would create a mongo collection named "cat-awesomeness-relation" with 3 fields: catId, awesomnessId and createdOn.

To customize the schema of this collection, you can do this:
```javascript
DBButler.prepare("cat").ofMany("awesomeness",colSchema:{a:"cat._id",b:"awesomeness._id",rating:"integer"});
```

(You can read the docs <a href="">here</a> to learn more about it. I will be writing a simple tutorial for this too.)
