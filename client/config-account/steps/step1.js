Template.step1.events({
  'click .btn': function (e, t) {
    var mongo_url = t.find('#input-mongo-url').value;
    Meteor.call('updateUser', mongo_url, function (error, result) {
      if (error)
        console.log(error);
      else
        console.log('success');
    });
    
    // Router.go( "configure.account", { _id: Meteor.userId(), step: "step2" } );
  }
});

