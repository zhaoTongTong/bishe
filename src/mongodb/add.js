var MongoClient = require('mongodb').MongoClient;
const DB_CONN_STR = "mongodb://localhost:27017/repair";
//插入数据
function insertType(db, dataRow, callback) {
    var collection = db.collection(dataRow.collection);

    collection.find({}).toArray(function (err, result) {
        dataRow.data.id = result.length+1;

        collection.insertOne(dataRow.data, function(err, result) {
            if(err) {
                console.log("Error11: "+ err);
                return;
            }else {
                callback(result);
            }
        });
    });
}

exports.add = function(ctx, callback) {
    //连接数据库
    MongoClient.connect(DB_CONN_STR, function(err, db) {
        var dataRow = ctx.request.body;
        insertType(db, dataRow, function(result) {
            callback(result);
            db.close();
        })
    })
}
