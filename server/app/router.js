const path = require('path');
const Router = require('koa-router');
const router = new Router();

module.exports = (app) => {
  const { Controller } = app;

  console.log(Controller);

  router.get('/', Controller.Page.index);
  router.get('/upload', Controller.Page.upload);
  router.post('/api/v1/upload', Controller.Api.v1.upload);
  router.get('/api/v1/formatDate', Controller.Api.v1.formatDate);

  return router.routes();

};