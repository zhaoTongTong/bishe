var router = require('koa-router')();
var find = require('../src/mongodb/find');
var add = require('../src/mongodb/add');
var del = require('../src/mongodb/delete');
//var session = require('koa-session');
//var convert = require('koa-convert');
const formidable = require('formidable');
var Promise = require('promise');

//router.use(convert(session(router)));

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: '维修精灵'
  };

  await ctx.render('index', {
  });
});

router.get('home', async function (ctx, next) {
  var j = ctx.cookies.get('koa:sess'), name = "";
  if(j) {
    j = JSON.parse(decodeURI(j));
    name = j.name;
  }
  await ctx.render('home', {
    name:name
  });
});

router.get('details', async function (ctx, next) {
  await ctx.render('details', {
  });
});

router.get('list', async function (ctx, next) {
  await ctx.render('list', {
  });
});

router.get('getType', async function (ctx, next) {
  await ctx.render('type', {
  });
});

router.get('getBrand', async function (ctx, next) {
  await ctx.render('brand', {
  });
});

router.get('getPersonalInfo', async function (ctx, next) {
  var j = ctx.cookies.get('koa:sess'), name = "";
  if(j) {
    j = JSON.parse(decodeURI(j));
    name = j.name;
  }
  await ctx.render('personalInfo', {
    name: name,
    email: j.email,
    address: j.address,
    tel: j.tel
  });
});

router.get('changePsd', async function (ctx, next) {
  var j = ctx.cookies.get('koa:sess'), name = "";
  if(j) {
    j = JSON.parse(decodeURI(j));
  }
  await ctx.render('changePsd', {
    password: j.password,
    name: j.name,
    email: j.email,
    address: j.address,
    tel: j.tel,
    id: j.id

  });
});

router.get('getnew', async function (ctx, next) {
  await ctx.render('new', {
  });
});

router.get('editing', async function (ctx, next) {
  await ctx.render('edit', {
  });
});

router.get('personal', async function (ctx, next) {
  var j = ctx.cookies.get('koa:sess'), name = "";
  if(j) {
    j = JSON.parse(decodeURI(j));
    name = j.name;
  }
  await ctx.render('personal', {
    name:name
  });
});

router.get('sendInfo', async function (ctx, next) {
  await ctx.render('product', {
  });
});

router.get('getDataList', async function(ctx, next){

  var result = await new Promise(function(resolve, reject){
    find.find(ctx, function(data){
      resolve(data);
      console.log(data);
    });
  });
  ctx.body = result;
});

router.post('addDataRow', async function (ctx, next) {
  console.dir(ctx.request.body);
  var result = await new Promise(function(resolve, reject){
    add.add(ctx, function(data){
      resolve(data);
    });
  });
  ctx.body = result;
});

router.post('setPersonalInfo', async function (ctx, next) {
  console.dir(ctx.request.body);
  var result = await new Promise(function(resolve, reject){
    add.add(ctx, function(data){
      resolve(data);
    });
  });
  ctx.body = result;
});

router.post('setNewPsd', async function (ctx, next) {
  console.dir(ctx.request.body);
  var result = await new Promise(function(resolve, reject){
    add.add(ctx, function(data){
      resolve(data);
    });
  });
  ctx.body = result;
});

router.post('uploadFile', async function(ctx, next) {
  let form = new formidable.IncomingForm(); //创建上传表单
  form.encoding = 'utf-8'; //设置编辑
  form.uploadDir = 'public/images/upload'; //设置上传目录
  form.keepExtensions = true; //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024; //文件大小
  //let ftptool;
  let { err, fieldsjson, files } = await new Promise((resolve) => {
    form.parse(ctx.req, function(err, fieldsjson, files) {
      console.dir(files);
      //ftptool = new ftptoolobj();
      resolve({ err, fieldsjson, files });
    });
  })

  //await nextUpload(err, ctx, files, ftptool);
})

router.post('delDataRows', async function (ctx, next) {
  var result = await new Promise(function(resolve, reject){
    del.del(ctx, function(data){
      resolve(data);
    });
  });
  ctx.body = result;
});

module.exports = router;
