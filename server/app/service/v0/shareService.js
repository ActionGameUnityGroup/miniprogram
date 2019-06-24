const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../');
const shareModel = require(`${rootDirectory}/model/v0/shareModel`);
const formatData = require(`${rootDirectory}/service/formatData`);

class ShareService extends formatData {

  async getShareList(ctx) {
    let response;
    try {
      const queryParams = {};
      let { /*category,*/ number, size } = ctx.request.query;
      /*if (category) {
        queryParams['category'] = category;
      }*/
      if (!number || !size) {
        throw new Error('请添加分页查询参数');
      }
      const data = await shareModel.find(queryParams, '-_id').limit(size * 1).skip((number * 1) - 1);
      response = this.formatDataSuccess(data);
    }catch (e) {
      response = this.formatDataFail(e.message);
    }
    return response;
  }

}

module.exports = new ShareService();