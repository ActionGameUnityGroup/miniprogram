const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../../');
const uploadService = require(`${rootDirectory}/service/v0/uploadService`);

class Upload {

  async image (ctx) {
    let response = await uploadService.image(ctx);
    ctx.body = response;
  }

}

module.exports = new Upload();