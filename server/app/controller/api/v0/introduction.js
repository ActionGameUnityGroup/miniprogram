const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../../');
const introductionService = require(`${rootDirectory}/service/v0/introductionService`);

class Introduction {

  async getIntroductionInfo(ctx) {
    const response = await introductionService.getIntroductionInfo(ctx);
    ctx.body = response;
  }

  async updateIntroductionInfo(ctx) {
    const response = await introductionService.updateIntroductionInfo(ctx);
    ctx.body = response;
  }

}

module.exports = new Introduction();