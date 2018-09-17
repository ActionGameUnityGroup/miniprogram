/*const Koa = require('koa');
const app = new Koa();*/
const Router = require('koa-router');
const router = new Router();
const loadRouter = require('./loadRouter');
const koaBody = require('koa-body');
const bodyParser = require('koa-bodyparser');
// const static = require('koa-static');
const bindConsole = require('./bindConsole');
const staticFile = require('./static-file');
const connectHistory = require('connect-history-api-fallback');


const env = process.env.NODE_ENV == 'production';

module.exports = (app, rootPath) => {

  app.use(async (ctx, next) => {
    console.log(ctx.method, ctx.url);
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

  app.use(bodyParser());

  app.use(koaBody());

  app.use(loadRouter(router, rootPath));
};