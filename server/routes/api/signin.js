const SignIn = require('../../controllers/api/SignIn');

module.exports = {
  'GET /api/sign/getSignInfo': async (ctx) => {
    await SignIn.getSignInfo(ctx);
  },
  'POSt /api/sign/signIn': async (ctx) => {
    await SignIn.signIn(ctx);
  },
};