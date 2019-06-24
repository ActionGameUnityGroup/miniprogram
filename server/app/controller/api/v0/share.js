const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../../');
const shareService = require(`${rootDirectory}/service/v0/shareService`);

class Share {

  async getShareList(ctx) {
    let response = await shareService.getShareList(ctx);
    ctx.body = response;
  }

}

module.exports = new Share();