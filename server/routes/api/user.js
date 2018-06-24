const User = require('../../controllers/api/User');

module.exports = {
  'GET /api/user/getUserInfo': async (ctx) => {
    console.log('获取数据');
    await User.getUserInfo(ctx);
  },
  'POST /api/user/setUserInfo': async (ctx) => {
    console.log('设置数据');
    await User.setUserInfo(ctx);
  },
};