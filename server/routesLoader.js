const fs = require('fs');
const Router = require('koa-router');
const router = new Router();

// 添加路由
const loadRouters = (ROUTE) => {
  for(let requestURL in ROUTE){
    let [method, url] = requestURL.split(' ');
    method === 'GET' ? router.get(url, ROUTE[requestURL]) : router.post(url, ROUTE[requestURL]);
  }
};

// 解析路由
const parseRouter = (RoutesURL) => {
  // console.log(RoutesURL);
  fs.readdirSync(RoutesURL).forEach((dir) => {
    const childRoutesURL = RoutesURL+'/'+dir;
    fs.readdirSync(childRoutesURL).forEach((childDir) => {
    // console.log(childDir);
      let routeFileUrl = RoutesURL + '/' + dir + '/' + childDir;
      const route = require(routeFileUrl);
      loadRouters(route);
    });
  });
};

module.exports = function(){
  const _URL = './routers';
  parseRouter(_URL);
  return router.routes();
};