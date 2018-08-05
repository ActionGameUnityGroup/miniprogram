const https = require('https');

module.exports = function(url){
  return new Promise((resolve, reject) => {
    // https.get('https://api.weixin.qq.com/sns/jscode2session')
    https.get(url, (res) => {
      res.on('data', (data) => {
        resolve(data);
      });
    }).on('error', (e) => {
      reject(e);
    });
  });
};