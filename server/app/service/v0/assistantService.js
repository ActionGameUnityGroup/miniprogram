const path = require('path');
const fs = require('fs');
const rootDirectory = path.resolve(__dirname, '../../');
const staticDirectory = path.resolve(rootDirectory, '../static/');
const assistantModel = require(`${rootDirectory}/model/v0/assistantModel`);
const formatData = require(`${rootDirectory}/service/formatData`);
// const introduce = require(`${rootDirectory}/static/assistant.introduce`);

class AssistantService extends formatData {

  async getAssistantList(ctx) {
    let response;
    try {
      let data = await assistantModel.find({}, '-_id');
      response = this.formatDataSuccess(data);
    } catch (e) {
      response = this.formatDataFail(e.message);
    }
    return response;
  }

  async getAssistantIntroduce(ctx) {
    let response;
    try {
      let data = fs.readFileSync(`${staticDirectory}/assistant.introduce.txt`, 'utf8');
      response = this.formatDataSuccess(data);
    } catch (e) {
      response = this.formatDataFail(e.message);
    }
    return response;
  }

  async setAssistantIntroduce(ctx) {
    let response;
    try {
      let params = JSON.parse(ctx.request.body) || {};
      let introduce = params.introduce;
      let err = fs.writeFileSync(`${staticDirectory}/assistant.introduce.txt`, introduce);
      if (err) {
        throw new Error(err);
      }
      response = this.formatDataSuccess('修改助教信息成功');
    } catch(e) {
      response = this.formatDataFail(e.message);
    }
    return response;
  }

}

module.exports = new AssistantService();