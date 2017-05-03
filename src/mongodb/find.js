var MongoClient = require('mongodb').MongoClient;
const DB_CONN_STR = "mongodb://localhost:27017/repair";

function findType(db, data, callback) {

    var collection = db.collection(data.data);

    collection.find(data.name?(data.password?{name:data.name, password:data.password}:{name:data.name}):{}).toArray(function (err, result) {
        if (err) {
            console.log("Error：" + err);
            return;
        }
        //console.log(result)
        callback(result);
    });

    //var type;
    //var id = data.split('id=')[1];
    //if(id === undefined) {
    //    type = decodeURI(data.split('type=')[1]);
    //}else {
    //    type = decodeURI(data.split('type=')[1].split('&')[0]);
    //}
    //if(type !== 'undefined') {
    //    var collection = db.collection(data.split('&')[0]);
    //    if(id === undefined) {
    //        collection.find({type:type}).toArray(function(err, result) {
    //            if(err) {
    //                console.log("Error："+err);
    //                return;
    //            }
    //            callback(result);
    //        })
    //    }else {
    //        collection.find({id:parseInt(id)}).toArray(function(err, result) {
    //            if(err) {
    //                console.log("Error："+err);
    //                return;
    //            }
    //            callback(result);
    //        })
    //    }
    //
    //
    //}else {
    //    var collection = db.collection(data);
    //
    //    collection.find({}).toArray(function(err, result) {
    //        if(err) {
    //            console.log("Error："+err);
    //            return;
    //        }
    //        callback(result);
    //    });
    //}
}

exports.find = function (ctx, callback) {
    MongoClient.connect(DB_CONN_STR, function (err, db) {
        //var dataRow = ctx.originalUrl;
        console.log(ctx);
        var data = ctx.url.split('data=')[1].split('&')[0];
        var name, password;
        if (ctx.url.split('name=')[1] && ctx.url.split('password=')[1]) {
            name = decodeURI(ctx.url.split('name=')[1].split('&')[0]);
            password = ctx.url.split('password=')[1];
            console.log(name)
            console.log(password)
        }else if(ctx.url.split('name=')[1]){
            name = decodeURI(ctx.url.split('name=')[1]);
        }
        //var name = ctx.url.split('name=')[1].split('&')[0];
        //var password = ctx.url.split('name=')[1].split('&')[1];
        //console.log(data)
        //console.log(name)
        //console.log(password)
        //var password = ctx.url.split('password=')[1];
        //console.log(ctx.originalUrl);
        //console.log(data);
        //console.log(data.split('data=')[1])
        //var data = dataRow.split('data=')[1].split('&_')[0];
        findType(db, {data, name, password}, function (result) {
            callback(result);
            db.close();
        })
    })
}
