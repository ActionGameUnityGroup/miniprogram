/*const Koa = require('koa');
const app = new Koa();*/
const Router = require('koa-router');
const router = new Router();
const loadRouter = require('./loadRouter');
const koaBody = require('koa-body');
// const xmlParser = require('koa-xml-body')
const bodyParser = require('koa-bodyparser');
// const static = require('koa-static');
const bindConsole = require('./bindConsole');
const staticFile = require('./static-file');
// const connectHistory = require('connect-history-api-fallback');


const env = process.env.NODE_ENV == 'production';

module.exports = (app, rootPath) => {

  app.use(async (ctx, next) => {
    console.log(ctx.method, ctx.url);
    console.log(ctx.req.body, '请求req的body');
    console.log(ctx.request.body, '请求request的body');
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    ctx.set('Access-Control-Allow-Methods','PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method === 'OPTIONS') {
      ctx.status = 200;
    };
    await next();
  });

  /*app.use(() => {
    const middleware = connectHistory();
    const noop = ()  => {};
    return async (ctx, next)=> {
      middleware(ctx, null, noop);
      await next();
    };
  });*/

  app.use(bindConsole());

  app.use(staticFile(rootPath));
  // app.use(static(__dirname+'../public'));

  /*app.use(xmlParser({
    onerror: (err, ctx) => {
      // ctx.throw(err.status, err.message);
      console.log('解析xml体失败：', err);
      console.log('xml主体：', err.body);
      ctx.request.body = err.body;
      throw err;
    }
  }));*/
  app.use(async(ctx, next) => {
    getRawBody(ctx.req, {
      length: ctx.req.headers['content-length'],
      limit: '1mb',
      encoding: contentType.parse(ctx.req).parameters.charset
    }, async function (err, string) {
      if (err) return next(err)
      ctx.req.text = string
      await next();
    });
  });

  app.use(bodyParser());

  app.use(koaBody());

  app.use(loadRouter(router, rootPath));
};