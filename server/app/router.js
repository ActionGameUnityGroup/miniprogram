const path = require('path');
const Router = require('koa-router');
const router = new Router();

module.exports = (app) => {
  const { Page, Api } = app.Controller;

  router.get('/', Page.index);
  router.get('/login', Page.login);
  router.get('/tutor', Page.tutor);
  router.get('/setTutor', Page.setTutor);
  router.get('/assistant', Page.assistant);
  router.get('/setAssistant', Page.setAssistant);
  router.get('/feature', Page.feature);
  router.get('/setFeature', Page.setFeature);
  router.get('/rich', Page.rich);
  router.get('/setRich', Page.setRich);
  router.get('/video', Page.video);
  router.get('/setVideo', Page.setVideo);
  router.get('/studentShare', Page.studentShare);
  router.get('/setStudentShare', Page.setStudentShare);
  router.get('/introduction', Page.introduction);
  router.get('/business', Page.business);
  router.get('/upload', Page.upload);
  router.get('/session', Page.session);
  router.post('/api/v0/user/login', Api.v0.User.login);
  router.get('/api/v0/user/getUserInfo', Api.v0.User.getUserInfo);
  router.post('/api/v0/reserved/setReservedInfo', Api.v0.Reserved.setReservedInfo);
  router.post('/api/v0/order/generateOrder', Api.v0.Order.generateOrder);
  router.post('/api/v0/pay/payment', Api.v0.Pay.payment);
  router.get('/api/v0/pay/receivePaymentInfo', Api.v0.Pay.receivePaymentInfo);
  router.post('/api/v0/pay/receivePaymentInfo', Api.v0.Pay.receivePaymentInfo);
  router.get('/api/v0/banner/getBannerList', Api.v0.Banner.getBannerList);
  router.post('/api/v0/banner/upload', Api.v0.Banner.upload);
  router.get('/api/v0/tutor/getTutorList', Api.v0.Tutor.getTutorList);
  router.get('/api/v0/tutor/getTutorInfo', Api.v0.Tutor.getTutorInfo);
  router.post('/api/v0/tutor/setTutorInfo', Api.v0.Tutor.setTutorInfo);
  router.post('/api/v0/tutor/updateTutorInfo', Api.v0.Tutor.updateTutorInfo);
  router.get('/api/v0/courseFeature/getCourseFeatureList', Api.v0.CourseFeature.getCourseFeatureList);
  router.get('/api/v0/courseFeature/getCourseFeatureInfo', Api.v0.CourseFeature.getCourseFeatureInfo);
  router.post('/api/v0/courseFeature/setCourseFeatureInfo', Api.v0.CourseFeature.setCourseFeatureInfo);
  router.post('/api/v0/courseFeature/updateCourseFeatureInfo', Api.v0.CourseFeature.updateCourseFeatureInfo);
  router.get('/api/v0/course/getCourseList', Api.v0.Course.getCourseList);
  router.get('/api/v0/course/getCourseInfo', Api.v0.Course.getCourseInfo);
  router.post('/api/v0/course/setCourseInfo', Api.v0.Course.setCourseInfo);
  router.post('/api/v0/course/updateCourseInfo', Api.v0.Course.updateCourseInfo);
  /*router.get('/api/v0/course/getLastestList', Api.v0.Course.getLastestList);
  router.get('/api/v0/course/getAllCourse', Api.v0.Course.getAllCourse);
  router.get('/api/v0/course/getCourseList', Api.v0.Course.getCourseList);
  router.get('/api/v0/course/getUnexpireCourse', Api.v0.Course.getUnexpireCourse);*/
  router.get('/api/v0/activity/getHotList', Api.v0.Activity.getHotList);
  // router.post('/api/v1/upload', Api.v1.Upload.uploadFile);
  router.post('/api/v1/admin/login', Api.v1.Admin.login);
  router.post('/api/v1/admin/logout', Api.v1.Admin.logout);

  router.get('/api/v1/test/list', Api.v1.Test.list)
  router.post('/api/v1/test/list', Api.v1.Test.list)

  router.post('/api/v0/upload/image', Api.v0.Upload.image);
  router.post('/api/v0/upload/video', Api.v0.Upload.video);

  router.get('/api/v0/assistant/getAssistantList', Api.v0.Assistant.getAssistantList);
  router.get('/api/v0/assistant/getAssistantInfo', Api.v0.Assistant.getAssistantInfo);
  router.post('/api/v0/assistant/setAssistantInfo', Api.v0.Assistant.setAssistantInfo);
  router.post('/api/v0/assistant/updateAssistantInfo', Api.v0.Assistant.updateAssistantInfo);
  router.get('/api/v0/assistant/getAssistantIntroduce', Api.v0.Assistant.getAssistantIntroduce);
  router.post('/api/v0/assistant/setAssistantIntroduce', Api.v0.Assistant.setAssistantIntroduce);

  router.get('/api/v0/share/getShareList', Api.v0.Share.getShareList);
  router.get('/api/v0/share/getShareInfo', Api.v0.Share.getShareInfo);
  router.post('/api/v0/share/setShareInfo', Api.v0.Share.setShareInfo);
  router.post('/api/v0/share/updateShareInfo', Api.v0.Share.updateShareInfo);

  router.get('/api/v0/video/getVideoList', Api.v0.Video.getVideoList);
  router.get('/api/v0/video/getVideoInfo', Api.v0.Video.getVideoInfo);
  router.post('/api/v0/video/setVideoInfo', Api.v0.Video.setVideoInfo);
  router.post('/api/v0/video/updateVideoInfo', Api.v0.Video.updateVideoInfo);

  router.get('/api/v0/introduction/getIntroductionInfo', Api.v0.Introduction.getIntroductionInfo);
  router.post('/api/v0/introduction/updateIntroductionInfo', Api.v0.Introduction.updateIntroductionInfo);

  router.get('/api/v0/business/getBusinessInfo', Api.v0.Business.getBusinessInfo);
  router.post('/api/v0/business/updateBusinessInfo', Api.v0.Business.updateBusinessInfo);

  return router.routes();

};