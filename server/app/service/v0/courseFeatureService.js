const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../');
const courseFeatureModel = require(`${rootDirectory}/model/v0/courseFeatureModel`);
const formatData = require(`${rootDirectory}/service/formatData`);
const uuid = require('uuid');

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

  async setCourseFeatureInfo(ctx) {
    let response;
    try {
      let params = JSON.parse(ctx.request.body) || {};
      let featureInfo = new courseFeatureModel({
        featureId: uuid.v4(),
        ...params,
      });
      let data = await featureInfo.save();
      if (!data) {
        throw new Error('保存课程风采失败');
      }
      response = this.formatDataSuccess({info: '保存课程风采成功'});
    }catch (e) {
      response = this.formatDataFail(e.message);
    }
    return response;
  }

  async updateCourseFeatureInfo(ctx) {
    let response;
    try {
      let params = JSON.parse(ctx.request.body) || {};
      let featureId = params.featureId;
      let updateOptions = Object.assign({}, params);
      delete updateOptions.featureId;
      if (!featureId) {
        throw new Error('没有找到目标课程风采，更新课程风采失败！');
      }
      let data = await courseFeatureModel.update({ featureId }, updateOptions, { multi: false });
      if (!data) {
        throw new Error('更新课程风采失败');
      }
      response = this.formatDataSuccess({info: '更新课程风采成功'});
    }catch (e) {
      response = this.formatDataFail(e.message);
    }
    return response;
  }

}

module.exports = new courseFeatureService();