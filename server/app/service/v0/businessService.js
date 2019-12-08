const path = require('path');
const fs = require('fs');
const rootDirectory = path.resolve(__dirname, '../../');
const businessModel = require(`${rootDirectory}/model/v0/businessModel`);
const formatData = require(`${rootDirectory}/service/formatData`);

class BusinessService extends formatData {

  async getBusinessInfo(ctx) {
    let response;
    try {
      let data = await businessModel.findOne({}, '-_id');
      response = this.formatDataSuccess(data);
    } catch (e) {
      response = this.formatDataFail(e.message);
    }
    return response;
  }

  async updateBusinessInfo(ctx) {
    let response;
    try {
        let params = JSON.parse(ctx.request.body) || {};
        let updateOptions = Object.assign({}, params);
        let data = await businessModel.update({}, updateOptions, { multi: false });
        if (!data) {
          throw new Error('更新承接业务信息失败');
        }
        response = this.formatDataSuccess({ info: '更新承接业务信息成功' });
    } catch (e) {
      response = this.formatDataFail(e.message);
    }
    return response;
  }

}

module.exports = new BusinessService();