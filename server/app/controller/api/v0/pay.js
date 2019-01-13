const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../../');
const payService = require(`${rootDirectory}/service/v0/payService`);

class Pay{

  async payment(ctx){
    let response = await payService.payment(ctx);
    ctx.body = response;
  }

  async receivePaymentInfo(ctx){
    let response = await payService.receivePaymentInfo(ctx);
    ctx.body = response;
  }

}

module.exports = new Pay();