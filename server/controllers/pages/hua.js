const getFilePromise = require('../../app/getFilePromise');

/*module.exports = {
  'GET /hua': async (ctx) => {
    ctx.body = await getFilePromise('hua.html');
    ctx.type = 'text/html';
  }
};*/

class Hua {
	custructor(){}
  async show(ctx) {
    ctx.body = await getFilePromise('hua.html');
    ctx.type = 'text/html';
  }
};

module.exports = new Hua();