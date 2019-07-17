const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../');
const studentShareModel = require(`${rootDirectory}/model/v0/studentShareModel`);
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
      const data = await studentShareModel.find(queryParams, '-_id').limit(size * 1).skip((number * 1) - 1);
      response = this.formatDataSuccess(data);
    }catch (e) {
      response = this.formatDataFail(e.message);
    }
    return response;
  }

  async getShareInfo(ctx) {
    let response;
    try {
      // let flag = checkSession(ctx);
      // if (!flag) {
        let query = ctx.request.query || {};
        let studentId = query.studentId;
        if (!studentId) {
          throw new Error('缺少学员ID，无法获取信息!');
        }
        let data = await studentShareModel.find({ studentId }, '-_id');
        response = this.formatDataSuccess(data);
      // }
    } catch (e) {
      response = this.formatDataFail(e.message);
    }
    return response;
  }

  async setShareInfo(ctx) {
    let response;
    try {
      let params = JSON.parse(ctx.request.body);
      let shareInfo = new studentShareModel({
        studentId: uuid.v4(),
        ...params
      });
      let data = await shareInfo.save();
      if (!data) {
        throw new Error('保存学员分享信息失败');
      }
      response = this.formatDataSuccess({info: '保存学员分享信息成功'});
    } catch(e) {
      response = this.formatDataFail(e.message);
    }
    return response;
  }

  async updateShareInfo(ctx) {
    let response;
    try {
      let params = JSON.parse(ctx.request.body);
      let studentId = params.studentId;
      console.log(studentId);
      let updateOptions = Object.assign({}, params);
      delete updateOptions.studentId;
      console.log(updateOptions);
      if (!studentId) {
        throw new Error('请选择学员!');
      }
      let data = await studentShareModel.update({ studentId }, updateOptions, { multi: false });
      console.log(data);
      if (!data) {
        throw new Error('更新学员分享失败');
      }
      response = this.formatDataSuccess({info: '更新学员分享成功'});
    } catch(e) {
      response = this.formatDataFail(e.message);
    }
    return response;
  }

}

module.exports = new ShareService();