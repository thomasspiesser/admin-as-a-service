Schemas = new Mongo.Collection('aaas_schemas');

Meteor.subscribe('schemas', function(){
  var schemas = Schemas.find().fetch();
  console.log(schemas);

  Schemas.find().forEach(function (schema) {
    // instanciate the user collections
    eval( sanitize(schema.name) + "= new Mongo.Collection(schema.name);" );
    // subscribe to the data
    Meteor.subscribe(schema.name);
  });
});

Meteor.subscribe('all');
Meteor.subscribe('userCollection');