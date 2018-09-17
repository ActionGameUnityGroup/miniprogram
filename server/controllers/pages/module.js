const getFilePromise = require('../../app/getFilePromise');

class Index {
  constructor(){}
  async show(ctx){
    ctx.body = await getFilePromise('index.html');
    ctx.type = 'text/html';
  }
}

module.exports = new Index();