var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

exports.save = function(req, res) {
    console.log('connecting to mongoDB C2C database....');
    var id = req.body.id;
    var email = req.body.email;
    MongoClient.connect('mongodb://localhost:27017/c2c', function(err, db)
    {
        if (err)
            throw err;
        //console.log('connected to the Database.');




        var oID = new ObjectID(id);
        var query = {'_id': oID};
        var operator = {'$set': {'status': 'Dispatched'}};

        function callback(err, doc) {
            if (err)
                throw err;

            if (doc === null)
                return db.close();

            console.dir(doc);
            res.send(doc);

            //db.close();
        }

        //db.collection('orders').find(query).toArray(function(err, docs){
        //     console.log('returning data from the orders collection.');
        //   console.log(docs);
        //res.send(docs);
        //});

        db.collection('orders').update(query, operator, function(err, updated) {
            if (err)
                throw err;
            console.log('Successfully added to processing ' + updated + ' documents.');







            res.send({'dispatched': true});
        });



    });


    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: 'service.c2c@gmail.com',
            pass: 'service@c2c'
        },
        maxConnections: 5,
        maxMessages: 10
    }));

    transporter.sendMail({
        from: 'service.c2c@gmail.com',
        to: email,
        subject: 'Order Dispatched',
        text: 'Hello, your order has been dispatched by C2C. Your reference number for the order is ' + id + ''
    });

};