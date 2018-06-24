const Index = require('../../controllers/pages/index');

module.exports = {
  /*router.get('/', async (ctx) => {})*/
  'GET /': async (ctx) => {
  	console.log('主页');
  	Index.show(ctx);
  },
  'GET /index': async (ctx) => {
  	console.log('主页');
  	Index.show(ctx);
  },
}