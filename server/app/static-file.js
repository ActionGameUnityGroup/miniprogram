module.exports = function(){
  return async(ctx, next) => {
    let URL = ctx.url;
    if (URL.includes('.')&&URL!=='/favicon.ico') {
      // 读取静态文件
      URL = __dirname + URL;
      const mime = require('mime');
      const fs = require('fs');
      ctx.body = await fs.createReadStream(URL);
      ctx.type = await mime.getType(URL);
    }
    await next();
  };
};