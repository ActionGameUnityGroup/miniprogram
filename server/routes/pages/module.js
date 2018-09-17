const Index = require('../../controllers/pages/module');

module.exports = {
  /*router.get('/', async (ctx) => {})*/
  'GET /module': async (ctx) => {
    console.log('主页');
    Index.show(ctx);
  },
}