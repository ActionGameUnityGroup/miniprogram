const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../../');
const businessService = require(`${rootDirectory}/service/v0/businessService`);

class Business {

  async getBusinessInfo(ctx) {
    const response = await businessService.getBusinessInfo(ctx);
    ctx.body = response;
  }

  async updateBusinessInfo(ctx) {
    const response = await businessService.updateBusinessInfo(ctx);
    ctx.body = response;
  }

}

module.exports = new Business();
