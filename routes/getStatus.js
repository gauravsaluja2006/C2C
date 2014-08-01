var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

exports.save = function(req, res) {
    console.log('connecting to mongoDB C2C database....');

    MongoClient.connect('mongodb://localhost:27017/c2c', function(err, db)
    {
        if (err)
            throw err;
        console.log('Checking for Order Status...');
        var id = req.body.id;
        console.log(id);

        var oID = new ObjectID(id);
        var query = {'_id': oID};

        function callback(err, doc) {
            if (err)
                throw err;

            if (doc === null)
                return db.close();

            console.dir(doc);
            res.send(doc);

            //db.close();
        }

        db.collection('orders').findOne(query, function(err, doc) {
            console.log('returning status from the orders collection.');
            //console.log(docs);
            res.send(doc);
        });
        //cursor.each(callback);


        /* TODO */
    });



};