const fs = require('fs');

module.exports = function(rootPath){
  return (ctx, next) => {
    let URL = ctx.url;
    if (URL.includes('.')&&URL!=='/favicon.ico') {
      // 读取静态文件
      URL = rootPath + '/public' + URL;
      const mime = require('mime');
      console.log('获取文件');
      // console.log(ctx, 'response body');
      ctx.body = fs.createReadStream(URL);
      ctx.type = mime.getType(URL);
    }
    next();
  };
};