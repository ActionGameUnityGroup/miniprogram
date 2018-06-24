/*module.exports = {
  'GET /': async (ctx) => {
    ctx.body = 'INDEX';
    ctx.type = 'text/html';
  },
  'GET /index': async (ctx) => {
    ctx.body = 'INDEX';
    ctx.type = 'text/html';
  },
};*/

const getFilePromise = require('../../app/getFilePromise');

class Index {
	constructor(){}
  async show(ctx){
    ctx.body = await getFilePromise('index.html');
    ctx.type = 'text/html';
  }
}

module.exports = new Index();