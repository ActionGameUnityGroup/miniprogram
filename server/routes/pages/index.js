const Index = require('../../controllers/pages/index');

module.exports = {
  'GET /': async (ctx) => {
  	console.log('主页');
  	Index.show(ctx);
  },
}