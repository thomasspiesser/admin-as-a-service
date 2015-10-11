Schemas = new Mongo.Collection('aaas_schemas');

Meteor.subscribe('userCollections', function(){
  if ( Schemas.find().count() === 0) {
    console.log('nothing in client schema');
    return;
  }
  else {
    console.log('something in client schemas');
    var schemas = Schemas.find().fetch();
    console.log(schemas);

    Schemas.find().forEach(function (schema) {
      addCollToAdminConfig( sanitize(schema.name) );
      // instanciate the user collections
      eval( sanitize(schema.name) + "= new Mongo.Collection(schema.name);" );
      // subscribe to the data
      // Meteor.subscribe(schema.name);
    });
    console.log('done here');
  }
});

Meteor.subscribe('all');
// Meteor.subscribe('userCollections');