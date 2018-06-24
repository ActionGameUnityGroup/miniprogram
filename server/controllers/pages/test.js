/*module.exports = {
  'GET /test': async (ctx) => {
    const getFilePromise = require('../../app/getFilePromise');
    // console.log(user, 'user模型');
    const mongoose = require('mongoose');
    console.log(mongoose);
    const user = mongoose.model('user');
    console.log(user);
    ctx.body = await getFilePromise('test.html');
    ctx.type = 'text/html';
  }
};*/

const getFilePromise = require('../../app/getFilePromise');

class Test {
  async show(ctx) {
    ctx.body = await getFilePromise('test.html');
    ctx.type = 'text/html';
  }
};

module.exports = new Test();