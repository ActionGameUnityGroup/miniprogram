const upload = require('./upload');
const {formatData} = require('./formatData');
const path = require('path');
const fs = require('fs');

class File {

  async getFile(ctx){
    ctx.body = formatData({});
  }

  /*async setFile(ctx){
    const fileStream = await upload(ctx);
    console.log(fileStream, '文件流');
    console.log(fileStream.mimeType, '文件流格式');
    const folderName = Date.parse(new Date());
    fs.mkdirSync(`../../public/audio/${folderName}`);
    // if()
    fileStream.file.pipe(fs.createWriteStream(path.resolve(`../../public/image/${folderName}/0${}`)));
    ctx.body = formatData({info: '上传文件成功'});
  }*/

}

module.exports = new File();