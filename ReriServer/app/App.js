const Koa = require('koa');
const fs = require('fs');
const error = require('./os/error');
const render = require('./os/render');
const controller = require('./os/controller');
const router = require('./os/router');
const body = require('./os/body');
const bodyParser = require('./os/body-parser');
// const koaBetterBody = require('koa-better-body');

class App {
  constructor(){
    this.app = new Koa();
    this.loadPlugin();
  }

  loadPlugin(){

    const pluginPath = `${__dirname}/plugins`;
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

    _this.app.use(error());
    _this.app.use(render());

    _this.app.use(controller(_this));
    _this.app.use(router(_this));
    _this.app.use(body({multipart: true}));
    _this.app.use(bodyParser());

    // _this.app.use(koaBetterBody())

    fs.readdirSync(pluginPath).map(pluginName => {
      const plugin = require(`${pluginPath}/${pluginName}`);
      _this.app.use(plugin());
    });

  }

  listen(port, f){
    this.app.listen(port, f());
  }

}

module.exports = App;