const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../../');

class Test {

  async list(ctx){
    ctx.body = [{
      id: 1,
      name: 'test1'
    }, {
      id: 1,
      name: 'test1'
    }];
    ctx.type = 'text/json';
  }

}

module.exports = new Test();