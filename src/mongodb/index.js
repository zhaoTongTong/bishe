var MongoClient = require('mongodb').MongoClient;
var Promise = require('promise');
const DB_CONN_STR = 'mongodb://localhost:27017/repair';

/**
 * @description mongodb 函数实例
 */
function mongoDb() {
    return {
        /**
         * @ignore
         * @description mongo建立连接
         */
        _getConnect: function (callback) {
            return new Promise(function (resolve, reject) {
                MongoClient.connect(DB_CONN_STR, function (err, db) {
                    if (err) {
                        console.log('[MONGODB]', err);
                        reject(err);
                    }
                    resolve(db);
                });
            });
        },
        /**
         * @description 新增数据
         * @param collectionName {String} 集合名称
         * @param data {Object} 新增数据
         * @param callback {Function} 新增回调函数
         */
        addRow: function (collectionName, data, callback) {
            var _this = this;
            return new Promise(async function (resolve, reject) {
                var db = await _this._getConnect();
                var collection = db.collection(collectionName);
                collection.insertOne(data, function (err, result) {
                    if (err) {
                        console.log('[MONGODB]' + err);
                        reject(err);
                    }
                    db.close();
                    resolve(result);
                    // callback && callback(err, result);
                });
            });
        },
        /**
         * @description 修改数据
         * @param collectionName {String} 集合名称
         * @param filter {Object} 筛选条件
         * @param update {Object} 更新数据
         * @param callback {Function} 修改回调函数
         */
        updateRow: function (collectionName, filter, update, callback) {
            var _this = this;
            return new Promise(async function (resolve, reject) {
                var db = await _this._getConnect();
                var collection = db.collection(collectionName);
                collection.updateMany(filter, {
                    $set: update
                }, {
                    safe: true
                }, function (err, result) {
                    if (err) {
                        console.log('[MONGODB]' + err);
                        reject(err);
                    }
                    db.close();
                    resolve(result);
                    // callback && callback(err, result);
                });
            });
        },
        /**
         * @description 删除数据
         * @param collectionName {String} 集合名称
         * @param filter {Object} 筛选条件
         * @param options {Object} 删除选项
         * @param callback {Function} 删除回调函数
         */
        deleteRow: function (collectionName, filter, options, callback) {
            var _this = this;
            return new Promise(async function (resolve, reject) {
                var db = await _this._getConnect();
                var collection = db.collection(collectionName);
                collection.deleteMany(filter, options, function (error, result) {
                    if (err) {
                        console.log('[MONGODB]' + err);
                        reject(err);
                    }
                    db.close();
                    resolve(result);
                    // callback && callback(err, result);
                });
            });
        },
        /**
         * @description 获取数据列表
         * @param collectionName {String} 集合名称
         * @param query {Object} 查询条件
         * @param callback {Function} 执行回调函数
         */
        getRows: function (collectionName, query, callback) {
            var _this = this;
            return new Promise(async function (resolve, reject) {
                var db = await _this._getConnect();
                // this._getConnect(function (err, db) {
                var collection = db.collection(collectionName);
                collection.find(query || {}).toArray(function (err, result) {
                    if (err) {
                        console.log('[MONGODB]' + err);
                        reject(err);
                    }
                    db.close();
                    resolve(result);
                    // callback && callback(err, result);
                });
                // });
            });
        },
        /**
         * @description 获取数据信息
         * @param collectionName {String} 集合名称
         * @param query {Object} 查询条件
         * @param callback {Function} 执行回调函数
         */
        getRowByQuery: function (collectionName, query, callback) {
            var _this = this;
            return new Promise(async function (resolve, reject) {
                var db = await _this._getConnect();
                var collection = db.collection(collectionName);
                collection.findOne(query || {}, function (err, result) {
                    if (err) {
                        console.log('[MONGODB]' + err);
                        reject(err);
                    }
                    db.close();
                    resolve(result);
                    // callback && callback(err, result);
                });
            });
        }
    }
}


module.exports = mongoDb();
// mongoDb().addRow('reports', {
//     name: 'CodeScan_scan_4_1491018227232.tar.gz',
//     lastModifyData: '2017-04-01T11:48:00.000Z'
// }, function(err, result){
//     if(err){
//         console.log(err);
//     }
//     console.log(result);
// });
// async function abc(){
// var res = await mongoDb().getRowByQuery('product', {id: 5});
// console.log(res);
// }
// abc();

