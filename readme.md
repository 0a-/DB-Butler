What is DBButler?
===================

```
meteor add arch:db-butler
```

DBButler manages your Mongo Collections in Meteor. It is basically a library that provides a flexible ORM (Object-relational mapping), hooks and collection schema.

It is designed in a way that it's flexible for humans to use, the same time can also be seamlessly integrated into <a href="http://archy.io">Archy.io.</a>

----------

Why uses DBButler?
===================

It is written in vanilla JavaScript (I'm pretty anti-coffeeScript :D ) with closures & prototypes. It does not pretend to be class-based OO. 

And it is super easy to use. 


Quickstart:
===================
Or you can read the <a>api</a> here. Tutorial can be found here too.

1. Create a collection & Insert a document
-------------

To create a collection (with `prepare()`) and insert a record (with `insert()`):

```javascript
DBButler.prepare("book"); //this creates a new Mongo.Collection("book")
DBButler.insert({"title":"on anarchism"}); 
//this line above will insert into the latest collection DBButler interacted with
//in this case it is the "book" collection.
```
You can also specify which collection you want to insert:
```javascript
DBButler.insert("book",{"title":"on anarchism"});
```

Or you can specify the collection with ".assigned".
```javascript
DBButler.assigned("cat");
DBButler.insert({"name":"nyanCat"}); // this would insert into "cat"
```


2. Create a collection with schema
-------
```javascript
DBButler.prepare({
colName:"book",
schema:{
    title:"string"
}
});
```
A schema can be useful later on (for validation, creating forms, giving users' permission, etc). But since we are using noSQL here, it is not really necessary to create a schema for every collection (in this sense it should be viewed as a "partial schema").

3. Edit some document in a collection
-------------

To edit a field of some documents in your collection, you can use `.edit()`.
```javascript
DBButler.edit("cat",{"name":"nyanCat"},{"furColor":"white"}); 
//this would change the furColor to "white" for the documents in "cat" collections that have name "nyanCat".
```
Or it can be simply done without passing "cat" (if it was the last collection DBButler interacted with).

```javascript
DBButler.edit({"name":"nyanCat"},{"furColor":"white"}); 
```
That's actually the same as doing this:
```javascript
DBButler.find({"name":"nyanCat"}).edit({"furColor":"white"}); 
```
And this is equivalent to doing an update with $set:
```javascript
DBButler.find({"name":"nyanCat"}).update({$set:{"furColor":"white"}}); 
```

Read the docs on flexiablity <a>here</a> to learn more about how you can utilize it.

4. ManyToOne / OneToMany Relation:
-------------

Now let's say you want to collection "book" to establish a "haveOne" relation with "author",  it can be easily done with `.ofOne()` 

```javascript
DBButler.prepare("book").ofOne("author");
```

Afterwards if you want to insert a document with relation, just uses `.of()`

```javascript
DBButler.insert({"title":"on anarchism"}).of("author","Noam Chomsky"); 
//this will insert {"title":"on anarchism"} into "book" with foreign key "authorId", and {authorName:"Noam Chomsky"} into "author" if there is no Noam Chomsky in "author"
DBButler.prepare("author"); 
//you can prepare "author" any time you want. The insert above will be executed as long as both collections ("books" & "author") are prepared.
```


This does basically the same thing as the code below. (The code below provides more degrees of freedom for configuring)
```javascript
DBButler.prepare({
    colName:"book",
    ofOne:[{
        colName:"author", 
        privateKey: "authorId", 
        relation:["author","book"]
    }]
});
DBButler.insert({"title":"on anarchism"}).of("author",{authorName: "Noam Chomsky"});
DBButler.prepare({colName:"author"});
```
or you can do it with `.hasMany()` too:
```javascript
DBButler.prepare("author").hasMany("book");
var chomsky = DBButler.insert({"authorName":"Noam Chomsky"}); 
//.inserts returns the _id of inserted docuement
DBButler.prepare({colName:"book"}).insert({"title":"on anarchism"}).author(chomsky); 
//.author is the same as .of("author",{_id:chomsky});
```

(You can read the docs <a href="">here</a> to learn more about it. There'd also be a simple tutorial.)

5. ManyToMany Relation
-------------
It can be easily achieved with  `.ofMany` or `.haveMany` (which are functionally equivalent).
```javascript
DBButler.prepare("cat").ofMany("awesomeness");
DBButler.insert({"name":"Noam Chomsky"}).of(
    ["lingustics","logician","anarcho-syndicalist"]
);
DBButler.prepare("awesomeness");
```
This would create a mongo collection named "cat_awesomeness_relation" with 4 fields: `_id`, `catId`, `awesomnessId` and `createdOn`.

To customize the schema of this collection, you can do this:

```javascript
DBButler.prepare("cat").ofMany("awesomeness",{
    a:"cat._id", //setting key
    b:"awesomeness._id", //setting key
    rating:"integer"
});
```

Or with a JSON object (which is what would be done in Archy.io):
```javascript
DBButler.prepare({
    colName:"cat",
    ManyToMany:[{
        colName: "cat_awesomeness_relation",
        relation: ["cat","awesomeness"],
        colSchema:{
            a:"cat._id", //setting key
            b:"awesomeness._id", //setting key
            rating:"integer"
        }
    }]
);
```

Docs <a>here</a>. Tutorial <a>here</a>.

6. Hooks
-------------
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

Note: since `.get()` uses `.find()`. function attaching to "find" would be called for "get" event as well.

7. More on basic database interactions
-------------

`.increase()` increases the value of a field by n.

```javascript
DBButler.find({"name":"nyanCat"}).increase("upvote",1); 
```
`.push()` adds some element to the end of an array.

```javascript
DBButler.find({"name":"nyanCat"}).push("catFriends",["GrumpyCat","Maru"]); 
```

`.find()` simply returns an cursor that not only has Meteor's Mongo.Cursor functions, but also ButlerCursor functions. Learn more <a>here</a>.

```javascript
DBButler.find({"name":"nyanCat"}); //this returns a cursor 
```

`.get()` gives you an object with numberical index of docuements found in the collection.

```javascript
var cats = DBButler.get({"name":"nyanCat"}); //this returns a cursor 
console.log(cats[0]); //the first cat object
```

`.getOne()` gives you the first docuement found.

```javascript
var first_cat = DBButler.getOne({"name":"nyanCat"});
console.log(first_cat[0]); //the first cat object
//it has the same properties as cats[0] but also some extra functions.
```

`.remove()` delete the docuements found.

```javascript
DBButler.remove({"name":"nyanCat"});
```

Read the full api <a>here</a> to learn how they work.
