const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../../');
const assistantService = require(`${rootDirectory}/service/v0/assistantService`);

class Assistant {

  async getAssistantList(ctx) {
    const response = await assistantService.getAssistantList(ctx);
    ctx.body = response;
  }

}

module.exports = new Assistant();