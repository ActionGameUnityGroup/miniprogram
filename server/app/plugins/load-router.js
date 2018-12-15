/*const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const router = new Router();

const addController = (controller) => {
  for (let URL in controller) {
    console.log(URL, 8);
    let [method, fileName] = URL.split(' ');
    if (URL.startsWith('GET ')) {
      router.get(fileName, controller[URL]);
    } else if (URL.startsWith('OPTIONS ')) {
      ctx.options(fileName, (ctx) => {
        ctx.status = 200;
      });
    } else if(URL.startsWith('POST ')) {
      router.post(fileName, controller[URL]);
    }
  }
};

const loadController = (rootPath) => {
  const path = rootPath + '/route';
  fs.readdirSync(path).map((dir) => {
    fs.readdirSync(`${path}/${dir}`).map((controllerItem) => {
      let controller = require(`${path}/${dir}/${controllerItem}`);
      addController(controller);
    });
  });
}

module.exports = () => {
  const rootPath = path.resolve(__dirname, '..');
  loadController(rootPath);
  return router.routes();
}*/

module.exports = () => {
  return async (ctx, next) => {
    await next();
  };
};