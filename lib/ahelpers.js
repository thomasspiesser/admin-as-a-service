AdminConfig = {
  collections: {}
};

sanitize = function(string) {
  if ( ! /^\w*$/.test(string) )
    throw new Meteor.Error(403, "not a valid string");
  return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
};

addCollToAdminConfig = function(collName) {
  AdminConfig['collections'][collName] = {};
  return;
};