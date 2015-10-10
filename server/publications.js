Meteor.publish('userData', function () {
  if ( ! this.userId ) {
    this.ready();
  }
  return Meteor.users.find( { _id: this.userId }, { fields: { services: 0 } } );
});

Meteor.publish('all', function() {
  return CollectionsCollection.find()
});


Metoer.publish('userCollection', function (id, query, options){

  var collection = CollectionsCollection.getCollectionInstance(id);

  return collection.find(query, options);
});

