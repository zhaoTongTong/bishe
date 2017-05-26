var router = require('koa-router')();
var Promise = require('promise');
var mdb = require('../src/mongodb');

router.get('/getBrandListByTypeId', async function (ctx, next) {
    var collection = ctx.query.data;
    var pid = ctx.query.pid;
    var res = await mdb.getRows(collection, {pid: pid});
    console.log(res);
    ctx.body = res;
});
router.get('/list', async function (ctx, next) {
    var collection = ctx.query.data;
    var query = {};
    var type = ctx.query.type;
    var brand = ctx.query.brand;
    var res = await mdb.getRows(collection, {type: type, brand: brand});

    var j = ctx.cookies.get('koa:sess'), name = "";
    if(j) {
        j = JSON.parse(decodeURI(j));
        name = j.name;
    }
    await ctx.render('list', {
        name:name,
        type: type,
        prods: res
    });
});
router.get('/detail', async function (ctx, next) {
    var id = ctx.query.id;
    console.log(id);
    var res = await mdb.getRowByQuery('product', {id: id});
    console.log(res);
    var j = ctx.cookies.get('koa:sess'), name = "";
    if(j) {
        j = JSON.parse(decodeURI(j));
        name = j.name;
    }
    await ctx.render('details', {
        name:name,
        prod: res
    });
});

module.exports = router;