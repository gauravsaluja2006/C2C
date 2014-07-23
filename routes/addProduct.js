var MongoClient = require('mongodb').MongoClient;

exports.save = function(req, res){
    console.log('Adding product from the service');
    var advert = req.body;
    var abc = 'abc';
    console.log(advert.type+'TYPE');
    var col = advert.type+'s';
    //console.log(advert);
    
    MongoClient.connect('mongodb://localhost:27017/c2c', function(err, db) {
    if(err) throw err;
    
    console.log('connected to the C2C database.');


    db.collection(col).insert(advert, function(err, inserted) {
        if(err) throw err;

        console.dir("Successfully inserted to the try collection : " + JSON.stringify(advert));

        return db.close();
    });
});
    
    
    
};