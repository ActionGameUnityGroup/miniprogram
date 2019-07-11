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
      const data = await courseFeatureModel.find({}, '-_id').limit(size * 1).skip((number * 1) - 1).sort({ sort: -1 });
      const count = Math.ceil(await courseFeatureModel.count({}));
      const total = Math.ceil(count/size);
      response = this.formatDataSuccess({ data, count, total, current: number * 1, size: size * 1 });
    }catch (e) {
      response = this.formatDataFail(e.message);
      // ctx.throw(400);
    }
    return response;
  }

  async getCourseFeatureInfo(ctx) {
    let response;
    try {
      let { featureId, source } = ctx.request.query;
      if (!featureId) {
        throw new Error('缺少课程特色ID！');
      }
      if (source === 'miniprogram') {
        let updateCb = await courseFeatureModel.update({ featureId: featureId }, { $inc: { viewCount: 1 } }, { multi: false });
        // console.log(updateCb);
      }
      const data = await courseFeatureModel.find({ featureId: featureId }, '-_id');
      response = this.formatDataSuccess(data);
    }catch (e) {
      response = this.formatDataFail(e.message);
      // ctx.throw(400);
    }
    return response;
  }

}

module.exports = new courseFeatureService();