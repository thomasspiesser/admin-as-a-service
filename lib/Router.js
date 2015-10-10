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
  // onBeforeAction: function () {
  //   if ( this.data().bookingStatus === 'completed' )
  //     this.params.state = 'bookCourseShare';
  //   if ( ! this.params.state || ! Meteor.userId() )
  //     this.params.state = 'bookCourseRegister'; // default state
  //   if ( this.params.state === 'bookCourseRegister' && Meteor.userId() )
  //     this.params.state = 'bookCourseAddress'; // has registered - go to address
  //   this.next();
  // }
});