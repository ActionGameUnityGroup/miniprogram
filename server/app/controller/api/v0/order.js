const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../../');
const orderService = require(`${rootDirectory}/service/v0/orderService`);

class Order{

  async getOrderList(ctx){
    let response = await orderService.getOrderList(ctx);
    ctx.body = response;
  }

  async generateOrder(ctx){
    let response = await orderService.generateOrder(ctx);
    ctx.body = response;
  }

}

module.exports = new Order();