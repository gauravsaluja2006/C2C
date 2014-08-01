var MongoClient = require('mongodb').MongoClient;

exports.save = function(req, res){
    console.log('Adding Order from the service');
    var order = req.body;
    var abc = 'abc';
    //console.log(advert.type+'TYPE');
    //var col = advert.type+'s';
    //console.log(advert);
    
    MongoClient.connect('mongodb://localhost:27017/c2c', function(err, db) {
    if(err) throw err;
    
    console.log('connected to the C2C database.');


    db.collection('orders').insert(order, function(err, inserted) {
        if(err) throw err;

        console.dir("Successfully inserted to the order collection : " + JSON.stringify(order));

        return db.close();
    });
});
    
    
    
};