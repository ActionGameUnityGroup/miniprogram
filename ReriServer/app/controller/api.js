const fs = require('fs');
const path = require('path');

class Api {
  async upload(ctx){
    const files = ctx.request.body.files;
    const rootDirectory = path.resolve(__dirname, '../../public/');
    // console.log(files);
    let flag = false;
    for(let fileKey in files){
      console.log(files[fileKey]);
      if (files[fileKey].type.includes('image')) {
        // 图片
        let uploadFileStream = await fs.createWriteStream(`${rootDirectory}/image/${files[fileKey].name}`);
        await files[fileKey].pipe(uploadFileStream);
        await fs.readdir(`${rootDirectory}/${files[fileKey].name}`, (err, data) => {
          if (err) {
            ctx.body = {status: 404, message: `上传文件失败`};
            ctx.type = 'text/json';
          } else {
            flag = true;
          }
        });
      } else {
        ctx.body = {status: 400, message: `上传的文件错误`};
        ctx.type = 'text/json';
      }
    }
    fs.readdir()
    ctx.body = {status: 200, message: `上传的文件：${files}`};
    ctx.type = 'text/json';
  }
};

module.exports = {
  v1: new Api()
};