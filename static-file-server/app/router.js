const path = require('path');
const Router = require('koa-router');
const router = new Router();

module.exports = (app) => {
  const { Page, Api } = app.Controller;

  // router.post('/api/v1/upload', Api.v1.Upload.uploadFile);

  return router.routes();

};