T9n.setLanguage('en');

AccountsTemplates.configure({
  showForgotPasswordLink: true,
  privacyUrl: 'privacy',
  termsUrl: 'agb',
});

AccountsTemplates.configureRoute('signIn', {
  template: 'home',
  redirect: function() {
    var user = Meteor.user();
    if ( user && user.config && user.config.status === 'completed' )
      Router.go('/admin');
    else
      Router.go('/configure-account/' + user._id + '/step1'); // could also store the step and return to it
  }
});

AccountsTemplates.configureRoute('signUp', {
  template: 'home',
  redirect: function() {
    var user = Meteor.user();
    if (user)
      Router.go('/configure-account/' + user._id + '/step1');
  }
});

AccountsTemplates.configureRoute('forgotPwd',{template: 'home'});
AccountsTemplates.configureRoute('resetPwd',{template: 'home'});

Router.plugin('ensureSignedIn', {
    only: [ 'createCourse', 'course.edit', 'course.confirm', 'user.courses', 'edit.user', 'edit.trainer']
});