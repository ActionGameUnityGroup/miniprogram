const getFilePromise = require('../../app/getFilePromise');

/*module.exports = {
  'GET /upload': async (ctx) => {
    ctx.body = await getFilePromise('upload.html');
    ctx.type = 'text/html';
  }
};*/

class UpLoad {
  custructor(){}
  async show(ctx) {
    ctx.body = await getFilePromise('upload.html');
    ctx.type = 'text/html';
  }
};

module.exports = new UpLoad();