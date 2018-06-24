const fs = require('fs');

const routeController = (router, controller) => {
  for(let URL in controller){
    if (URL.startsWith('GET ')) {
      let controllerPath = URL.substring(4);
      router.get(controllerPath, controller[URL]);
    }
  }
};

const loadController = (router) => {
  let path = './controllers';
  fs.readdirSync(path).map((childDir) => {
    console.log(childDir);
    fs.readdirSync(childDir).map((fileName) => {
      let controller = require(fileName);
      routeController(router, controller);
    });
  });
};

module.exports = (router) => {
  loadController(router);
  return router.routes();
};