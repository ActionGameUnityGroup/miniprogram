const path = require('path');
const fs = require('fs');
const rootDirectory = path.resolve(__dirname, '../../');
const staticDirectory = path.resolve(rootDirectory, '../static/');
const assistantModel = require(`${rootDirectory}/model/v0/assistantModel`);
const formatData = require(`${rootDirectory}/service/formatData`);
// const checkSession = require(`${rootDirectory}/service/checkSession`);
const uuid = require('uuid');
// const introduce = require(`${rootDirectory}/static/assistant.introduce`);

class AssistantService extends formatData {

  async getAssistantList(ctx) {
    let response;
    try {
      // let flag = checkSession(ctx);
      // if (!flag) {
        let data = await assistantModel.find({}, '-_id');
        response = this.formatDataSuccess(data);
      // }
    } catch (e) {
      response = this.formatDataFail(e.message);
    }
    return response;
  }

  async getAssistantInfo(ctx) {
    let response;
    try {
      // let flag = checkSession(ctx);
      // if (!flag) {
        let query = ctx.request.query || {};
        let assistantId = query.assistantId;
        if (!assistantId) {
          throw new Error('缺少助教ID，无法获取信息!');
        }
        let data = await assistantModel.find({ assistantId }, '-_id');
        response = this.formatDataSuccess(data);
      // }
    } catch (e) {
      response = this.formatDataFail(e.message);
    }
    return response;
  }

  async setAssistantInfo(ctx) {
    let response;
    try {
      // let flag = checkSession(ctx);
      // if (!flag) {
        let params = JSON.parse(ctx.request.body) || {};
        let assistantInfo = new assistantModel({
          assistantId: uuid.v4(),
          ...params,
        });
        let data = await assistantModel.save(assistantInfo);
        if (!data) {
          throw new Error('保存助教信息失败！');
        }
        response = this.formatDataSuccess({ info: '保存助教信息成功' });
      // }
    } catch (e) {
      response = this.formatDataFail(e.message);
    }
    return response;
  }

  async updateAssistantInfo(ctx) {
    let response;
    try {
      // let flag = checkSession(ctx);
      // if (!flag) {
        let params = JSON.parse(ctx.request.body) || {};
        let { assistantId } = params;
        if (!assistantId) {
          throw new Error('缺少助教ID，无法更新助教信息');
        }
        let updateOptions = Object.assign({}, params);
        delete updateOptions.assistantId;
        let data = await assistantModel.update({ assistantId }, updateOptions, { multi: false });
        if (!data) {
          throw new Error('更新助教信息失败！');
        }
        response = this.formatDataSuccess({ info: '更新助教信息成功' });
      // }
    } catch (e) {
      response = this.formatDataFail(e.message);
    }
    return response;
  }

  async getAssistantIntroduce(ctx) {
    let response;
    try {
      // let flag = checkSession(ctx);
      // if (!flag) {
        let data = fs.readFileSync(`${staticDirectory}/assistant.introduce.txt`, 'utf8');
        response = this.formatDataSuccess(data);
      // }
    } catch (e) {
      response = this.formatDataFail(e.message);
    }
    return response;
  }

  async setAssistantIntroduce(ctx) {
    let response;
    try {
      // let flag = checkSession(ctx);
      // if (!flag) {
        let params = JSON.parse(ctx.request.body) || {};
        let introduce = params.introduce;
        let err = fs.writeFileSync(`${staticDirectory}/assistant.introduce.txt`, introduce);
        if (err) {
          throw new Error(err);
        }
        response = this.formatDataSuccess('修改助教信息成功');
      // }
    } catch(e) {
      response = this.formatDataFail(e.message);
    }
    return response;
  }

}

module.exports = new AssistantService();