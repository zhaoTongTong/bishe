var router = require('koa-router')();
var find = require('../src/mongodb/find');

router.get('/login', async function (ctx, next) {
  var result = await new Promise(function (resolve, reject) {
    find.find(ctx, function (data) {
      resolve(data);
    });
  });
  if(result.length > 0){
    // ctx.session['koa:sess'] = result[0];
    ctx.cookies.set('koa:sess',encodeURI(JSON.stringify(result[0])));
  }
  ctx.body = result;
});

router.get('/logout', async function (ctx, next) {
  ctx.cookies.set('koa:sess', null)
  ctx.body = {};
});

module.exports = router;