
Meteor.methods({
  updateUser: function (mongo_url) {
    check(mongo_url, String);
    if ( ! this.userId )
      throw new Meteor.Error(403, "You must be logged in");
    Roles.setUserRoles(this.userId, 'admin');
    Meteor.users.update( {_id: this.userId }, { $set: { mongo_url: mongo_url } } );

    // var usersapp = new MongoInternals.RemoteCollectionDriver("mongodb://127.0.0.1:3031/meteor");
    // var usersapp = new MongoInternals.RemoteCollectionDriver(mongo_url);

    var collection;
    var id;

    var aaas_collection = CollectionsCollection.findOne({
      userId: Meteor.userId(),
      url: mongo_url,
      name: "aaas_schemas"
    });
    if (! aaas_collection) {
      id = CollectionsCollection.insert({
        userId: Meteor.userId(),
        url: mongo_url,
        name: "aaas_schemas"
      });
    }
    else
      id = aaas_collection._id;

    collection = CollectionsCollection.getCollectionInstance(id);

    var ids = [];

    // Schemas.find().forEach(function (schema) {
    collection.find().forEach(function (schema) {
      // store the user collections
      id = CollectionsCollection.insert({
        userId: Meteor.userId(),
        url: mongo_url,
        name: sanitize2(schema.name)
      });
      ids.push(id);
      addCollToAdminConfig( sanitize(schema.name) );
      collection = CollectionsCollection.getCollectionInstance(id);
      // eval( sanitize(schema.name) + "= new Mongo.Collection(schema.name, {_driver: usersapp});" );
      // get a reference to the collection name
      // eval("x="+sanitize(schema.name));
      // publish it
      
    });
    // get list of collections
    // create simpleSchemas
    // create AdminConfig = {} using collection name
    return ids;
  }
});


