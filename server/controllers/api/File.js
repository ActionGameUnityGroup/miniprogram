const upload = require('./upload');
const {formatData} = require('./formatData');
const path = require('path');
const fs = require('fs');

class File {

  async getFile(ctx){
    let publicPath = path.resolve(__dirname, '../../public/image');
    console.log(publicPath);
    let file = fs.readFileSync(`${publicPath}/course201891515124cover.txt`, 'utf8');
    // let file = require('../../public/image/course201891515124cover.txt');
    ctx.body = formatData({
      bannerList: [
        {name: "banner", url: file}
      ]
    });
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