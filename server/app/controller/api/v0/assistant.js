const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../../');
const assistantService = require(`${rootDirectory}/service/v0/assistantService`);

class Assistant {

  async getAssistantList(ctx) {
    const response = await assistantService.getAssistantList(ctx);
    ctx.body = response;
  }

  async getAssistantInfo(ctx) {
    const response = await assistantService.getAssistantInfo(ctx);
    ctx.body = response;
  }

  async getAssistantIntroduce(ctx) {
    const response = await assistantService.getAssistantIntroduce(ctx);
    ctx.body = response;
  }

  async setAssistantIntroduce(ctx) {
    const response = await assistantService.setAssistantIntroduce(ctx);
    ctx.body = response;
  }

  async setAssistantInfo(ctx) {
    const response = await assistantService.setAssistantInfo(ctx);
    ctx.body = response;
  }

  async updateAssistantInfo(ctx) {
    const response = await assistantService.updateAssistantInfo(ctx);
    ctx.body = response;
  }

}

module.exports = new Assistant();