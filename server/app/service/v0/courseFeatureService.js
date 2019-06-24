const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../');
const courseFeatureModel = require(`${rootDirectory}/model/v0/courseFeatureModel`);
const formatData = require(`${rootDirectory}/service/formatData`);

class courseFeatureService extends formatData {

  async getCourseFeatureList(ctx) {
    let response;
    try {
      let number = ctx.request.query.number,
          size = ctx.request.query.size;
      if (!number && !size) {
        throw new Error('请添加查询页数和查询数量');
      }
      const data = await courseFeatureModel.find({}, '-_id').limit(size * 1).skip((number * 1) - 1).sort({ order: -1 });
      /*const count = await courseFeatureModel.count({});
      console.log(count);*/
      response = this.formatDataSuccess(data);
    }catch (e) {
      response = this.formatDataFail(e.message);
      // ctx.throw(400);
    }
    return response;
  }

  async getCourseFeatureInfo(ctx) {
    let response;
    try {
      let { id } = ctx.request.query;
      console.log(id);
      if (!id) {
        throw new Error('缺少课程特色ID！');
      }
      await courseFeatureModel.update({ id: id }, { $inc: { viewCount: 1 } }, { multi: false });
      const data = await courseFeatureModel.find({ id: id }, '-_id');
      response = this.formatDataSuccess(data);
    }catch (e) {
      response = this.formatDataFail(e.message);
      // ctx.throw(400);
    }
    return response;
  }

}

module.exports = new courseFeatureService();