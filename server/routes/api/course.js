const Course = require('../../controllers/api/Course');

module.exports = {
  'GET /api/Course/getCourseList': async (ctx) => {
    await Course.getCourseList(ctx);
  },
  'GET /api/Course/getCourse': async (ctx) => {
    await Course.getCourse(ctx);
  },
  'POST /api/Course/setCourse': async (ctx) => {
    await Course.setCourse(ctx);
  },
  'POST /api/Course/setCourseCover': async (ctx) => {
    await Course.setCourseCover(ctx);
  }
};