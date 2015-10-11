Meteor.publish('userData', function () {
  if ( ! this.userId ) {
    this.ready();
  }
  return Meteor.users.find( { _id: this.userId }, { fields: { services: 0 } } );
});

Meteor.publish('all', function() {
  if (! this.userId)
    this.ready();
  return CollectionsCollection.find({ userId: this.userId });
});

// Meteor.publish('schemas', function () {
//   return Schemas.find();
// });


// Meteor.publish('userCollection', function (id, query, options){
//   if (!id)
//     this.ready();
//   query = query || {};
//   options = options || {};

//   var collection = CollectionsCollection.getCollectionInstance(id);

//   return collection.find(query, options);
// });

Meteor.publish('userCollections', function (){
  console.log('in publish');

  var collections = _.map(CollectionsCollection.find({ userId: this.userId }).fetch(), function (collection) {
    return CollectionsCollection.getCollectionInstance(collection._id);
  });
  // console.log(collections);
  cursors =_.map(collections, function (collection){
    return collection.find();
  });
  console.log('publishing cursors');
  return cursors;
});