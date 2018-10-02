const SignIn = require('../../controllers/api/SignIn');

module.exports = {
  'GET /api/sign/getSignInfo': async (ctx) => {
    await SignIn.getUserSignInfo(ctx);
  },
  'POST /api/sign/signIn': async (ctx) => {
    console.log('签到');
    await SignIn.signIn(ctx);
  },
};