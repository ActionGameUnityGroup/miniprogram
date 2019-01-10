const https = require('https');

module.exports = function(options){
  return new Promise((resolve, reject) => {
    // https.get('https://api.weixin.qq.com/sns/jscode2session')
    https.request(options, (res) => {
      res.on('data', (data) => {
        // console.log(data);
        resolve(JSON.parse(data));
      });
    }).on('error', (e) => {
      reject(e);
    }).end();
  });
};