const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../');
const courseFeatureModel = require(`${rootDirectory}/model/v0/courseFeatureModel`);
const formatData = require(`${rootDirectory}/service/formatData`);

class courseFeatureService extends formatData {

  async getCourseFeatureList () {
    let response;
    try {
      const data = await courseFeatureModel.find({}, '-_id').limit(3);
      response = data;
    }catch (e) {
      response = this.formatDataFail(e.message);
      ctx.throw(500);
    }
    return response;
  }

  async getCourseFeatureInfo () {
    let response;
    try {
      let { id } = ctx.request.query;
      const data = await courseFeatureModel.find({ id }, '-_id');
      response = data;
    }catch (e) {
      response = this.formatDataFail(e.message);
      ctx.throw(500);
    }
    return response;
  }

}

module.exports = new courseFeatureService();