const Course = require('../../controllers/api/course');

module.exports = {
  'GET /api/course/getCourse': (ctx) => {
    Course.getCourse(ctx);
  },
  'POST /api/course/setCourse': (ctx) => {
    Course.setCourse(ctx);
  },
};