const path = require('path');
const Router = require('koa-router');
const router = new Router();

module.exports = (app) => {
  const { Page, Api } = app.Controller;

  router.get('/', Page.index);
  router.get('/api/v0/user/getUserInfo', Api.v0.User.getUserInfo);
  // router.get('/upload', Page.upload);
  router.get('/api/v0/banner/getBannerList', Api.v0.Banner.getBannerList);
  router.get('/api/v0/tutor/getTutorList', Api.v0.Tutor.getTutorList);
  router.get('/api/v0/tutor/getTutorInfo', Api.v0.Tutor.getTutorInfo);
  router.get('/api/v0/course/getLastestList', Api.v0.Course.getLastestList);
  router.get('/api/v0/course/getAllCourse', Api.v0.Course.getAllCourse);
  router.get('/api/v0/course/getCourseInfo', Api.v0.Course.getCourseInfo);
  router.get('/api/v0/course/getUnexpireCourse', Api.v0.Course.getUnexpireCourse);
  router.get('/api/v0/activity/getHotList', Api.v0.Activity.getHotList);
  // router.post('/api/v1/upload', Api.v1.Upload.uploadFile);

  return router.routes();

};