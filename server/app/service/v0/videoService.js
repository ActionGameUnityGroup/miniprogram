const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../');
const videoModel = require(`${rootDirectory}/model/v0/videoModel`);
const formatData = require(`${rootDirectory}/service/formatData`);
// const checkSession = require(`${rootDirectory}/service/checkSession`);
const uuid = require('uuid');

class VideoService extends formatData {

  async getVideoList(ctx) {
    let response,
        query = ctx.request.query;
    try {
      let params = {},
          sortParams = {sort: -1};
      let { number, size } = query;
      if (!number || !size) {
        throw new Error('请添加查询页数和查询数量');
      }
      let data = await videoModel.find(params, '-_id').limit(size * 1).skip((number * 1) - 1).sort(sortParams);
      const count = Math.ceil(await videoModel.count({}));
      const total = Math.ceil(count/size);
      response = this.formatDataSuccess({ data, count, total, size: size * 1, current: number * 1 });
    } catch (e) {
      response = this.formatDataFail(e.message);
    }
    return response;
  }

  async getVideoInfo(ctx) {
    const videoId = ctx.request.query.videoId || '';
    let response;
    try {
      let data = await videoModel.find({ videoId }, '-_id');
      response = this.formatDataSuccess(data);
    } catch(e) {
      response = this.formatDataFail(e.message);
    }
    return response;
  }

  async setVideoInfo(ctx) {
    let response;
    try {
      let params = JSON.parse(ctx.request.body);
      let videoInfo = new videoModel({
        videoId: uuid.v4(),
        ...params
      });
      let data = await videoInfo.save();
      if (!data) {
        throw new Error('保存视频信息失败');
      }
      response = this.formatDataSuccess({info: '保存视频信息成功'});
    } catch(e) {
      response = this.formatDataFail(e.message);
    }
    return response;
  }

  async updateVideoInfo(ctx) {
    let response;
    try {
      let params = JSON.parse(ctx.request.body);
      let videoId = params.videoId;
      let updateOptions = Object.assign({}, params);
      delete updateOptions.videoId;
      if (!videoId) {
        throw new Error('请选择导师!');
      }
      let data = await videoModel.update({ videoId }, updateOptions, { multi: false });
      if (!data) {
        throw new Error('更新视频信息失败');
      }
      response = this.formatDataSuccess({info: '更新视频信息成功'});
    } catch(e) {
      response = this.formatDataFail(e.message);
    }
    return response;
  }

}

module.exports = new VideoService();