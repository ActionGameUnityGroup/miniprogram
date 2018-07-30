const fs = require('fs');

const addController = (router, controller) => {
  for (let URL in controller) {
    let [method, fileName] = URL.split(' ');
    if (URL.startsWith('GET ')) {
      router.get(fileName, controller[URL]);
    } else {
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
  console.log(rootPath, '根目录');
  // const path = rootPath + '/controllers';
  loadController(router, rootPath);
  return router.routes();
}