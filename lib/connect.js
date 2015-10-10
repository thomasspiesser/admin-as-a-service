if (Meteor.isClient) {

    


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
        

        // relations = schemas.relations;
        // mymain = schemas.main;

        // console.log(relations);
        // console.log(mymain);

        // _.map(relations, function (val, key) {
        //     add_schema(val, key);
        // })

        // _.map(mymain, function(val, key) {
        //     var type = val.keyType;
        //     delete(val.keyType);

        //     switch (type) {
        //         case 'String':
        //         case 'Number':
        //         case 'Date':
        //         case 'Boolean':
        //             mymain[key].type = this[type];
        //     }
        // });

        // console.log(mymain);
        // NewSchema = new SimpleSchema(mymain);
    }, 1000);
}