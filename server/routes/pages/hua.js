
/*module.exports = {
	'GET /': async (ctx) => {
    // 
  },
};*/

// const getFilePromise = require('../../app/getFilePromise');
const Hua = require('../../controllers/pages/hua');
module.exports = {
  'GET /hua': async (ctx) => {
    // ctx.body = await getFilePromise('hua.html');
    // ctx.type = 'text/html';
    Hua.show(ctx);
  }
};