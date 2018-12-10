const fs = require('fs');

const addController = (router, controller) => {
  for (let URL in controller) {
    let [method, fileName] = URL.split(' ');
    if (URL.startsWith('GET ')) {
      router.get(fileName, controller[URL]);
    } else if (URL.startsWith('OPTIONS ')) {
      ctx.options(fileName, (ctx) => {
        ctx.status = 200;
      });
    } else if(URL.startsWith('POST ')) {
      // console.log(fileName, 'POST路径');
      router.post(fileName, controller[URL]);
    }
  }
};


const loadController = (router, rootPath) => {
  const path = rootPath + '/routes';
  fs.readdirSync(path).map((dir) => {
    // console.log(dir, 16);
    fs.readdirSync(`${path}/${dir}`).map((controllerItem) => {
      let controller = require(`${path}/${dir}/${controllerItem}`);
      addController(router, controller);
    });
  });
}


module.exports = (router, rootPath) => {
  // console.log(rootPath, '根目录');
  // const path = rootPath + '/controllers';
  loadController(router, rootPath);
  return router.routes();
}