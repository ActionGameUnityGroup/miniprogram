const fs = require('fs');
const path = require('path');

module.exports = (pageURL) => {
  return new Promise((resolve, reject) => {
    const rootUrl = path.resolve(__dirname, '..');
    console.log(rootUrl, '根目录');
    let data = fs.createReadStream(`${rootUrl}/views/${pageURL}`);
    // console.log(data);
    if (data) {
      resolve(data);
    }
    reject(data);
  });
};