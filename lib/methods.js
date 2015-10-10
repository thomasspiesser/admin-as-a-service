Meteor.methods({
  updateUser: function (mongo_url) {
    check(mongo_url, String);
    if ( ! this.userId )
      throw new Meteor.Error(403, "You must be logged in");
    Meteor.users.update( {_id: this.userId }, { $set: { mongo_url: mongo_url } } );
  }
});