const fs = require('fs');
const path = require('path');


module.exports = () => {
  return async (ctx, next) => {
    const rootDir = path.resolve(__dirname, '..');
    ctx.error = (err) => {
      // fs.createtext().pipe()
      const filePath = rootDir+'/log/error.log';
      let text = fs.readFileSync(filePath, 'utf8');
      const date = new Date();
      /*console.log(date, 11);
      console.log(text, 'read');*/
      text += `${date} ${err}\n`;
      fs.writeFileSync(filePath, text);
    };
    ctx.info = (info) => {
      const filePath = rootDir+'/log/record.log';
      let text = fs.readFileSync(filePath, 'utf8');
      const date = new Date();
      // console.log(text, 'read');
      text += `${date} ${info}\n`;
      // text.pipe(writeStream);
      fs.writeFileSync(filePath, text);
    };
    await next();
  };
};