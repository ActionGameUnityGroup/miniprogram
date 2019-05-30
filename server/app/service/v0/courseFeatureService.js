const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../');
const courseFeatureModel = require(`${rootDirectory}/model/v0/courseFeatureModel`);
const formatData = require(`${rootDirectory}/service/formatData`);

class courseFeatureService extends formatData {

  async getCourseFeatureList (ctx) {
    let response;
    try {
      const data = await courseFeatureModel.find({}, '-_id').limit(3);
      response = this.formatDataSuccess(data);
    }catch (e) {
      response = this.formatDataFail(e.message);
      ctx.throw(500);
    }
    return response;
  }

  async getCourseFeatureInfo (ctx) {
    let response;
    try {
      let { id } = ctx.request.query;
      console.log(id);
      const data = await courseFeatureModel.find({ id: id }, '-_id');
      response = this.formatDataSuccess(data);
    }catch (e) {
      response = this.formatDataFail(e.message);
      ctx.throw(500);
    }
    return response;
  }

}

module.exports = new courseFeatureService();