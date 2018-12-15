const mime = require('mime');
const fs = require('fs');
const path = require('path');

module.exports = function(){
  return async(ctx, next) => {
    let URL = ctx.url;
    if (URL.includes('public') && URL !== '/favicon.ico') {
      // 读取静态文件
      const rootPath = path.resolve(__dirname, '../..');
      URL = rootPath + URL;
      ctx.body = await fs.createReadStream(URL);
      ctx.type = await mime.getType(URL);
    }
    await next();
  };
};