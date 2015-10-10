if (Meteor.isServer) {
    var usersapp = new MongoInternals.RemoteCollectionDriver("mongodb://127.0.0.1:3031/meteor");
    Schemas = new Mongo.Collection("aaas_schemas", {_driver: usersapp});

    Meteor.publish('schemas', function () {
        return Schemas.find();
    })
}

if (Meteor.isClient) {
    Meteor.subscribe('schemas');

    Schemas = new Mongo.Collection('aaas_schemas');

    var relations;
    var mymain;

    var add_schema = function (val, key) {
        var type = val.keyType;
        delete(val.keyType);

        switch (type) {
            case 'String':
                break;

            case 'Array':
                mymain[key].type = [this[val._dollar.type.name]];
                break;

            case 'Object':
                mymain[key].type = new SimpleSchema(val);
                break;
        }
        delete(mymain[key].keyType);
    }

    setTimeout(function() {
        var schemas = Schemas.findOne();

        relations = schemas.relations;
        mymain = schemas.main;

        console.log(relations);
        console.log(mymain);

        _.map(relations, function (val, key) {
            add_schema(val, key);
        })

        _.map(mymain, function(val, key) {
            var type = val.keyType;
            delete(val.keyType);

            switch (type) {
                case 'String':
                case 'Number':
                case 'Date':
                case 'Boolean':
                    mymain[key].type = this[type];
            }
        });

        console.log(mymain);
        NewSchema = new SimpleSchema(mymain);
    }, 1000);
}