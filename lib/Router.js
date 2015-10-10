Router.configure({
  loadingTemplate: 'loadingTemplate',
  notFoundTemplate: 'notFound',
  layoutTemplate: 'AaaSLayout'
});

Router.onBeforeAction('dataNotFound');

/////////////////// Home ////////////////////////

Router.route('/', {
  template: 'home',
  name: 'home',
});

Router.route('/configure-account/:_id/:step?', {
  template: 'configureAccount',
  name: 'configure.account',
  waitOn: function() {
    return Meteor.subscribe( 'userData' );
  },
  data: function () {
    return Meteor.user();
  },
});