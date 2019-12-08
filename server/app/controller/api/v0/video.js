const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../../');
const videoService = require(`${rootDirectory}/service/v0/videoService`);

class Video {

  async getVideoList(ctx) {
    let response = await videoService.getVideoList(ctx);
    ctx.body = response;
  }

  async getVideoInfo(ctx) {
    let response = await videoService.getVideoInfo(ctx);
    ctx.body = response;
  }

  async setVideoInfo(ctx) {
    let response = await videoService.setvideoInfo(ctx);
    ctx.body = response;
  }

  async updateVideoInfo(ctx) {
    let response = await videoService.updateVideoInfo(ctx);
    ctx.body = response;
  }

}

module.exports = new Video();