const Test = require('../../controllers/pages/test');
console.log(Test, 2);

module.exports = {
  'GET /test': async (ctx) => {
    // console.log('去test页面');
    Test.show(ctx);
  },
};