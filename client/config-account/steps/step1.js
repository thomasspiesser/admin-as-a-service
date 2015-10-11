Template.step1.events({
  'click .btn': function (e, t) {
    var mongo_url = t.find('#input-mongo-url').value;
    Meteor.call('updateUser', mongo_url, function (error, ids) {
      if (error)
        console.log(error);
      else {
        'going now'
        Router.go( "/admin" );
      }
    });
    
  }
});

