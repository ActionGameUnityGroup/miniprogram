const Custom = require('../../controllers/custom/custom');

module.exports = {
  'POST /custom/getUserMessage': async (ctx) => {
    console.log('登录后台');
    await Custom.post_login(ctx);
  },
  'GET /custom/getUserMessage': async (ctx) => {
    console.log('微信客服消息');
    await Custom.getUserMessage(ctx);
  },
};