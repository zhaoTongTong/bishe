const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');

const index = require('./routes/index');
const users = require('./routes/users');

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
//增加中间件，用来拦截请求
app.use(async (ctx, next) => {
  console.log("path:" + ctx.path);
  var j = ctx.cookies.get('koa:sess');
  if(validateUrl(ctx.path) && !j){
    ctx.redirect('/home');
  }else{
    j = j ? JSON.parse(decodeURI(j)) : {};
    await next();
  }
});
//校验请求URL
function validateUrl(path){
  //需要校验的请求path加入下面的数组中
  var valiArr = ['/getnew', '/list', '/personal'];
  var state = false;
  for(var i = 0; i < valiArr.length; i ++){
    if(path == valiArr[i]){
      state = true;
      break;
    }
  }
  return state;
}

router.use('/', index.routes(), index.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());

app.use(router.routes(), router.allowedMethods());
// response

app.on('error', function(err, ctx){
  console.log(err)
  logger.error('server error', err, ctx);
});


module.exports = app;