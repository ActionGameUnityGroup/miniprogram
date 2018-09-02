const SignIn = require('../../controllers/api/SignIn');

module.exports = {
  'GET /api/signin/getSignInInfo': async (ctx) => {
    await SignIn.getSignInInfo(ctx);
  },
  'POSt /api/signin/setSignInInfo': async (ctx) => {
    await SignIn.getSignInInfo(ctx);
  },
};