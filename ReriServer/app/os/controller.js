const path = require('path');
const controllerPath = path.resolve(__dirname, '../controller');
const [Api, Page] = [require(`${controllerPath}/api`), require(`${controllerPath}/page`)];
module.exports = (app) => {
  app.Controller = { Api, Page };
  return async (ctx, next) => {
    await next();
  }
};