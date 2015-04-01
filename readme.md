## What is DBButler? ##

DBButler manages your Mongo Collections in Meteor. It is basically a library that provides flexible ODM (Object-documenet mapping), hooks, a bunch of useful functional programming helpers, and better coding convention.

It is designed in a way that it's flexible for humans to use, the same time can also be seamlessly integrated into <a target="_blank" href="http://archy.io">Archy</a>, a Meteor app that builds Meteor apps for you.


## Why uses DBButler? ##

It is written in vanilla JavaScript (I'm pretty anti-coffeeScript :D ) with closures & prototypes. It does not pretend to be class-based OO. 

And it is super easy to use!

Check out the docs <a target="_blank" href="http://butler.archy.io/api">here</a> and tutorial <a target="_blank" href="http://butler.archy.io/tutorial">here</a>.


## Quickstart ##

```
meteor add arch:db-butler
```

##1. Create a collection & Insert a document ##

To create a collection (with `prepare()`) and insert a record (with `insert()`):

```javascript
DBButler.prepare("book"); //this creates a new Mongo.Collection("book")
DBButler.insert({"title":"on anarchism"}); 
//this line above will insert into the latest collection DBButler interacted with
//in this case it is the "book" collection.
```

## 2. Edit some document in a collection ##

To edit a field of some documents in your collection, you can use `.edit()`.
```javascript
DBButler.edit("cat",{"name":"nyanCat"},{"furColor":"white"}); 
//this would change the furColor to "white" for the documents in "cat" collections that have name "nyanCat".
```
Or simply do this (if the last collection we interacted was "cat")

```javascript
DBButler.edit({"name":"nyanCat"},{"furColor":"white"}); 
```

Read the docs on flexiablity <a>here</a> to learn more about how you can utilize it.

## 3. Declaring One-to-many / Many-to-one Relation + inserting ##

For one-to-many: use `.hasMany()`. To insert a document with relation: use `.find().insert()`.

```javascript
DBButler.prepare("author").hasMany("book");
var NoamChomskyId = DBButler.insert({name:"Noam Chomsky"});
DBButler.find("author",NoamChomskyId).insert("book",{"title":"on anarchism"}); 
//this will wait until "book" is prepared and then
//insert {"title":"on anarchism"} into "book" with foreign key "authorId"
//if there is no Noam Chomsky in "author", the default behavior is to throw an error
DBButler.prepare("book");
```

>Note: Unlike `Mongo.collection.find`, `DBButler.find` does not return a cursor; DBButler.find does not do any db operations, what it does is just to prepare an object that has relational-mapping functions like `.insert`, which is different from `DBButler.insert`.


For many-to-one, which is just the reverse, use `.hasOne()`
```javascript
DBButler.prepare("book").hasOne("author");
```

>For many-to-one/one-to-many relation, By default we take the approach of normalizing data: so foreginKey for referencing would be used. 

If you want to store the "many" as an array for a key in the "one":

```javascript
DBButler.prepare("book").hasOne("author",{denormalizing:true});
```


## 4. Getting or updating relational data ##

Get an array of books whose author is Noam Chomsky:

```javascript
DBButler.find("author",NoamChomskyId).get("book");
//or
DBButler.find("author",NoamChomskyId).book(); 
```

Update Noam Chomsky's books:

```javascript
DBButler.find("author",NoamChomskyId).edit("book",{"awesome":true});
//or
DBButler.find("author",NoamChomskyId).book("edit",{"awesome":true}); 
```

##5. One-to-one Relation ##

```javascript
DBButler.prepare("user").oneToOne("profile");
```

>For one-to-one relation, by default we take the approach of denormalizing data: so profile would just be a key of user docuement:  there would only be 1 collection. In the case above, `DBButler.prepare("profile")` would not do anything.

To minimize data redundancy & store "user" and "profile" in separate collections"

```javascript
DBButler.prepare("user").ontToOne("profile",{denormalizing:true});
```


## 6. ManyToMany Relation ##

For all many to many relation, a junction collection is created by default.

```javascript
DBButle.prepare("programmer").manyToMany("languages"); //this would not only create programmer collection, but programmer_langauges collection (that works as a junction table)
var archyID = DBButler.insert({"name":"Archy"});
DBButler.find("programmer",archyID).insert("languages",
    [{name: "Javascript",OO:"prototype-based"},
    {name: "Haskell",functional:"purely"},
    {name: "PHP", OO:"class-based"},
    {name: "Ruby", OO:"class-based"},
    {name: "Obj-C", OO:"class-based"},
    {name: "HTML", declarative:true}]);
); 
//this would insert 6 docuements into languages collections
//and the same time 6 docuements about the relation into programmer_langauges collection
DBButle.prepare("languages"); 

//note: the insert statement would not insert anything to "languages" if we just pass an array of languages id as the 2nd arguement like this:
DBButler.find("programmer",archyID).insert("languages", ["asdasd231","sxzsc23"]);
//this would simply insert 2 docuements about the realtion into programmer_langauges collection if docuements with id "asdasd231","sxzsc23" exist in languages collection
```

This behavior can once again be altered by passing `{denormalizing:"weak"}` or `{denormalizing:"strong"}` to the 2nd parameter (default value for denormalizing for many-to-many relation is `false`).

Read the doc to learn more.

## 7. Hooks ##

Hooks are pretty straightforward. They are functions to be called before or after some DBButler event, with `.before()` and `.after()`.


```javascript
DBButler.assigned("cats");
DBButler.after("find",function(){
    //call after every cats find event
}).before("insert",function(){
    //call before every cats insert event
});
```
You can be more detailed on when the function should be called:

```javascript
DBButler.assigned("cats");
DBButler.after("find",{"name":"NyanCat"},function(){
    //call only when finding docuement with name as "NyanCat".
});
```

>Note: since `.get()` uses `.find()`. function attaching to "find" would be called for "get" event as well.

