const path = require('path');
const fs = require('fs');
const rootDirectory = path.resolve(__dirname, '../../');
const introductionModel = require(`${rootDirectory}/model/v0/introductionModel`);
const formatData = require(`${rootDirectory}/service/formatData`);

class IntroductionService extends formatData {

  async getIntroductionInfo(ctx) {
    let response;
    try {
      let data = await introductionModel.findOne({}, '-_id');
      response = this.formatDataSuccess(data);
    } catch (e) {
      response = this.formatDataFail(e.message);
    }
    return response;
  }

  async updateIntroductionInfo(ctx) {
    let response;
    try {
        let params = JSON.parse(ctx.request.body) || {};
        let updateOptions = Object.assign({}, params);
        let data = await introductionModel.update({}, updateOptions, { multi: false });
        if (!data) {
          throw new Error('更新公司介绍失败');
        }
        response = this.formatDataSuccess({ info: '更新公司介绍成功' });
    } catch (e) {
      response = this.formatDataFail(e.message);
    }
    return response;
  }

}

module.exports = new IntroductionService();