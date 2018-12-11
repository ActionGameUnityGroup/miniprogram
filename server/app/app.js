const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const loadRouter = require('./loadRouter');
const koaBody = require('koa-body');
const bodyParser = require('koa-bodyparser');
const path = require('path');
// const static = require('koa-static');
const bindConsole = require('./bindConsole');
const staticFile = require('./static-file');
const error = require('./error');

const env = process.env.NODE_ENV == 'production';

class App {
  constructor(){
    app.use(async (ctx, next) => {
      ctx.set('Access-Control-Allow-Origin', '*');
      ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
      ctx.set('Access-Control-Allow-Methods','PUT, POST, GET, DELETE, OPTIONS');
      if (ctx.method === 'OPTIONS') {
        ctx.status = 200;
      };
      await next();
    });

    const rootPath = path.resolve(__dirname, '..');

    app.use(error());

    app.use(bindConsole());

    app.use(staticFile(rootPath));

    app.use(bodyParser());

    app.use(koaBody());

    app.use(loadRouter(router, rootPath));

    this.app = app;
  }

  listen(port, f){
    this.app.listen(port, f());
  }

}

module.exports = App;