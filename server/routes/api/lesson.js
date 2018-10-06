const Lesson = require('../../controllers/api/Lesson');

module.exports = {
  'GET /api/lesson/getLesson': async (ctx) => {
    console.log('获取数据');
    await Lesson.getLesson(ctx);
  },
  'GET /api/lesson/getLessonList': async (ctx) => {
    console.log('获取数据');
    await Lesson.getLessonList(ctx);
  },
  'POST /api/lesson/setLesson': async (ctx) => {
    console.log('设置数据');
    await Lesson.setLesson(ctx);
  },
};