/*const Koa = require('koa');
const app = new Koa();*/
const Router = require('koa-router');
const router = new Router();
const loadRouter = require('./loadRouter');
const koaBody = require('koa-body');
const bodyParser = require('koa-bodyparser');
const bindConsole = require('./bindConsole');

const env = process.env.NODE_ENV == 'production';

module.exports = (app, rootPath) => {
  app.use(async (ctx, next) => {
    console.log(ctx.method, ctx.url);
    ctx.set('Access-Control-Allow-Origin', '*');
    await next();
  });

  app.use(bindConsole());

  if(!env){
    const staticFile = require('./static-file');
    app.use(staticFile(rootPath));
  }

  app.use(bodyParser());

  app.use(koaBody());

  app.use(loadRouter(router, rootPath));
};