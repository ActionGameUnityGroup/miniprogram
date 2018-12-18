const Koa = require('koa');
const fs = require('fs');
const log4js = require(`${__dirname}/os/log4js`);
const render = require(`${__dirname}/os/render`);
const controller = require(`${__dirname}/os/controller`);
const router = require(`${__dirname}/router`);
const body = require(`${__dirname}/os/body`);
const compress = require(`${__dirname}/os/compress`);
const koaStatic = require(`${__dirname}/os/static`);
const bodyParser = require(`${__dirname}/os/body-parser`);
const path = require('path');
const rootDirectory = path.resolve(__dirname, '..');
const db = require(`${rootDirectory}/db/db-config`);

class App {
  constructor(){
    this.app = new Koa();

    const pluginPath = `${__dirname}/plugins`;
    const publicDirectory = `${rootDirectory}/public`;
    const _this = this;

    _this.app.use(async (ctx, next) => {
      console.log(ctx.method, ctx.url);
      ctx.set('Access-Control-Allow-Origin', '*');
      ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
      ctx.set('Access-Control-Allow-Methods','PUT, POST, GET, DELETE, OPTIONS');
      if (ctx.method === 'OPTIONS') {
        ctx.status = 200;
      };
      await next();
    });

    _this.app.use(async (ctx, next) => {
      const start = new Date();
      await next();
      const ms = new Date() - start;
      log4js.responseLogger(ctx, ms);
    });

    _this.app.on('error', (err, ctx) => {
      log4js.errorLogger(ctx, err);
    });

    _this.app.use(body({ multipart: true }));
    _this.app.use(bodyParser());
    _this.app.use(render());
    _this.app.use(compress({threshold: 2048}));
    _this.app.use(controller(_this));
    _this.app.use(router(_this));
    _this.app.use(koaStatic(publicDirectory));

    fs.readdirSync(pluginPath).map(pluginName => {
      const plugin = require(`${pluginPath}/${pluginName}`);
      _this.app.use(plugin());
    });

  }

  listen(port, f = function(){}){
    this.app.listen(port, f());
  }

}

module.exports = App;