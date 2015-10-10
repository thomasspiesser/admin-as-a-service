Meteor.publish('userData', function () {
  if ( ! this.userId ) {
    this.ready();
  }
  return Meteor.users.find( { _id: this.userId }, { fields: { services: 0 } } );
});