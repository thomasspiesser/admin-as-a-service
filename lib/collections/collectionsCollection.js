CollectionsCollection = new Mongo.Collection('collectionsCollection');

collectionInstances = {};

CollectionsCollection.getCollectionInstance = function(id) {
  console.log(id);
  if (collectionInstances[id]) {
    return collectionInstances[id];
  }

  var collectionInfo = CollectionsCollection.findOne(id);
  console.log('collectionInfo');
  console.log(collectionInfo);

  // TODO check if current user owns this collection
  collectionInstances[id] = new Mongo.Collection(collectionInfo.name, {
    _driver: new MongoInternals.RemoteCollectionDriver(collectionInfo.url)
  });

  // console.log(collectionInstances[id] );
  return collectionInstances[id];
};

