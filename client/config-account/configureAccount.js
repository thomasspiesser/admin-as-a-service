Template.configureAccount.helpers({
  active: function () {
    return Router.current().params.step;
  }
});