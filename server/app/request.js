const https = require('https');

module.exports = function(url, options){
  return new Promise((resolve, reject) => {
    // https.get('https://api.weixin.qq.com/sns/jscode2session')
    https.request(options, (res) => {
      res.on('data', (data) => {
        resolve(data);
      });
    }).on('error', (e) => {
      reject(e);
    });
  });
};