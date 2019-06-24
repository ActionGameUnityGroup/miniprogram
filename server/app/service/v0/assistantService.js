const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../');
const assistantModel = require(`${rootDirectory}/model/v0/assistantModel`);
const formatData = require(`${rootDirectory}/service/formatData`);

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

}

module.exports = new AssistantService();