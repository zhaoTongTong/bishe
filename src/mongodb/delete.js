var MongoClient = require('mongodb').MongoClient;
const DB_CONN_STR = "mongodb://localhost:27017/repair";


function delRows(db, dataRow, callback) {
    console.log(dataRow.collection);
    var collection = db.collection(dataRow.collection);
    for(var i = 0; i < dataRow.data.length; i++) {
        collection.removeOne({id: parseInt(dataRow.data[i])});
    }
}
exports.del = function(ctx, callback) {
    MongoClient.connect(DB_CONN_STR, function(err, db) {
        var dataRow = ctx.request.body;
        delRows(db, dataRow, function(result) {
            //callback(result);
            db.close();
        })
    })
}
