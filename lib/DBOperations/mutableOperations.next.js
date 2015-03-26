"use strict" //harmony at works;

function singleOrMultiOperation(query,operation){
    if(Array.isArray(query.selector)){ //allows inserting multiple objects
        var ids = [];
        query.selector.forEach(function(element){
            ids.push(query.collection()[operation](element,query.cb));
        });
        return ids; //return an array of all ids of inserted docuements
    }else{
        return query.collection()[operation](query.selector,query.cb);
    }
}

var mutableOperations = {

    insert : function(){
        var query = makeQuery.apply(undefined,arguments);
        return singleOrMultiOperation(query,"insert");
    },

    remove : function(){
        var query = makeQuery.apply(undefined,arguments);
        return singleOrMultiOperation(query,"remove");
    },

    update : function(){
        var query = makeUpdateQuery.apply(null,arguments);
        return query.collection().update(query.selector,query.modifier,query.options,query.callback);
    },

    updateOne : function(){
        var query = makeUpdateQuery.apply(null,arguments);
        deepMerge(query.options,{multi:false});
        return this.update.call(this,query);
    },

    upsert : function(){
        console.log(arguments);
        var query = makeUpdateQuery.apply(null,arguments);
        deepMerge(query.options,{upsert:true});
        console.log(query.options);
        return this.update.call(this,query);
    },

    edit : function(){
        var query = makeQuery.apply(null,arguments);
        return this.update.apply(this,[query.selector,{$set:query.options}]);
    },

    increase : function(){
        var query = makeQuery.apply(null,arguments);
        return this.update.apply(this,[query.selector,{$inc:query.options}]);
    }

}; 

cloneMerge(o,mutableOperations); //so now o also has all the mutable operations
