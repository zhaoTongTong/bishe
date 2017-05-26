var MongoClient = require('mongodb').MongoClient;
const DB_CONN_STR = "mongodb://localhost:27017/repair";

function updateType(db, data, callback) {

    var collection = db.collection(data.collection);
    console.log(data.data.id)
        collection.removeOne({id: parseInt(data.data.id)});
        collection.insertOne({"name":data.data.name,"email":data.data.email,"tel":data.data.email,"address":data.data.address,"password":data.data.password,"id":data.data.id}, function(err, result) {
            if(err) {
                console.log("Error11: "+ err);
                return;
            }else {
                callback(result);
            }
        });

    //collection.update({'password':'111111'},{$set:{'password':data.data.password}})
    //updateOne({'password':'111111'},{$set:{'password':data.data.password}}, function (err, result) {
    //    callback(result);
    //})
}

exports.update = function (ctx, callback) {
    MongoClient.connect(DB_CONN_STR, function (err, db) {
        console.log(ctx);
        updateType(db, data, function (result) {
            callback(result);
            db.close();
        })
    })
}
