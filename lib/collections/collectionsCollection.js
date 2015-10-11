CollectionsCollection = new Mongo.Collection('collectionsCollection');

var collectionInstances = {};

CollectionsCollection.getCollectionInstance = function(id) {
  if (collectionInstances[id]) {
    return collectionInstances[id];
  }

  var collectionInfo = CollectionsCollection.findOne(id);

  // TODO check if current user owns this collection
  return collectionInstances[id] = new Mongo.Collection(collectionInfo.name, {
    _driver: new MongoInternals.RemoteCollectionDriver(collectionInfo.url)
  });
};

