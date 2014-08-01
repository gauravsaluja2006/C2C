var MongoClient = require('mongodb').MongoClient;

exports.findAll = function(req, res){
    console.log('connecting to mongoDB C2C database....');
    
    MongoClient.connect('mongodb://localhost:27017/c2c', function(err, db) 
{
     if(err) throw err;
     console.log('connected to the Database.');
     
    
     var query = {};

     function callback(err, doc) {
          if(err) throw err;
            
         if(doc===null)
            return db.close();
          
         console.dir(doc);
         res.send(doc);

          //db.close();
     } 
        
        db.collection('keyboards').find(query).toArray(function(err, docs){
            console.log('returning data from the keyboards collection.');
            //console.log(docs);
            res.send(docs);
        });
        //cursor.each(callback);
        
        
     /* TODO */
});
   
   
   
};