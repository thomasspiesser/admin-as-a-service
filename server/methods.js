Meteor.methods({
  updateUser: function (mongo_url) {
    check(mongo_url, String);
    if ( ! this.userId )
      throw new Meteor.Error(403, "You must be logged in");
    Roles.setUserRoles(this.userId, 'admin');
    Meteor.users.update( {_id: this.userId }, { $set: { mongo_url: mongo_url } } );
    // instanciate connection to remove DB
    // get list of collections
    // create simpleSchemas
    // create AdminConfig = {} using collection name
    return;
  }
});