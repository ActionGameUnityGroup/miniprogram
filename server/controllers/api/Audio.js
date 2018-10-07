const upload = require('./upload');

class Audio {
  async setAudio(ctx){
    console.log('上传文件');
    let fileStream = await upload(ctx);
  }
  async getAudio(ctx){
    // 
  }
}

module.exports = new Audio();