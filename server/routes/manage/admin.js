const Admin = require('../../controllers/manage/admin');

module.exports = {
  'POST /manage/login': async (ctx) => {
    console.log('登录后台');
    await Admin.post_login(ctx);
  },
  'GET /manage/login': async (ctx) => {
    console.log('登录后台');
    await Admin.login(ctx);
  },
};