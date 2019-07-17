const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../../');
const shareService = require(`${rootDirectory}/service/v0/shareService`);

class Share {

  async getShareList(ctx) {
    let response = await shareService.getShareList(ctx);
    ctx.body = response;
  }

  async getShareInfo(ctx) {
    let response = await shareService.getShareInfo(ctx);
    ctx.body = response;
  }

  async setShareInfo(ctx) {
    let response = await shareService.setShareInfo(ctx);
    ctx.body = response;
  }

  async updateShareInfo(ctx) {
    let response = await shareService.updateShareInfo(ctx);
    ctx.body = response;
  }

}

module.exports = new Share();