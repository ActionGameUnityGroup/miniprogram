const {formatData} = require('./formatData');
const upload = require('./upload');
const path = require('path');
const fs = require('fs');

class Audio {

  async setAudio(ctx){
    console.log('上传文件');
    let fileStream = await upload(ctx);
    console.log(fileStream, '文件流');
    // fs.ftruncate(fileStream, )
    ctx.body = formatData({info: '上传成功'});
  }

  async getAudio(ctx){
    // 
  }
}

module.exports = new Audio();