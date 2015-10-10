Meteor.methods({
  updateUser: function (mongo_url) {
    check(mongo_url, String);
    if ( ! this.userId )
      throw new Meteor.Error(403, "You must be logged in");
    Roles.setUserRoles(this.userId, 'admin');
    Meteor.users.update( {_id: this.userId }, { $set: { mongo_url: mongo_url } } );

    // instanciate connection to remote DB
    console.log('now');
    
    var usersapp = new MongoInternals.RemoteCollectionDriver("mongodb://127.0.0.1:3031/meteor");
    Schemas = new Mongo.Collection("aaas_schemas", {_driver: usersapp});

    Meteor.publish('schemas', function () {
      return Schemas.find();
    });

    Schemas.find().forEach(function (schema) {
      // instanciate the user collections
      eval( sanitize(schema.name) + "= new Mongo.Collection(schema.name, {_driver: usersapp});" );
      // get a reference to the collection name
      eval("x="+sanitize(schema.name));
      // publish it
      Meteor.publish(schema.name, function () {
          return x.find();
      });
    });
    // get list of collections
    // create simpleSchemas
    // create AdminConfig = {} using collection name
    return;
  }
});

