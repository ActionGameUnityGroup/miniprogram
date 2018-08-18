const BusBoy = require('busboy');

module.exports = (ctx) => {
  console.log('上传文件');
  let busboy = new BusBoy({headers: ctx.req.headers});
  // console.log(busboy);
  return new Promise((resolve, reject) => {

    busboy.on('file', (fieldName, file, fileName, encoding, mimeType) => {
      /*console.log(fieldName);
      console.log(file);
      console.log(fileName);
      console.log(encoding);
      console.log(mimeType);*/
      resolve({fieldName, file, fileName, encoding, mimeType});
    });

    busboy.on('finish', (fieldName, file, fileName, encoding, mimeType) => {
      resolve({fieldName, file, fileName, encoding, mimeType});
    });

    busboy.on('error', err => {
      console.log('文件上传错误');
      reject(err);
    });

    ctx.req.pipe(busboy);

  });
};