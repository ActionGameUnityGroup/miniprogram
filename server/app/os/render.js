const path = require('path');
const fs = require('fs');

const renderPath = (pageURL) => {
  return new Promise((resolve, reject) => {
    const rootUrl = path.resolve(__dirname, '..');
    let data = fs.createReadStream(pageURL);
    if (data) {
      resolve(data);
    }
    reject(data);
  });
};

module.exports = () => {
  return async (ctx, next) => {
    ctx.render = async (pageName) => {
      const viewRootPath = path.resolve(__dirname, '../view');
      let page = await renderPath(`${viewRootPath}/${pageName}`);
      ctx.body = page;
      ctx.type = 'text/html';
    };
    await next();
  };
}