const request = require('request');

module.exports = function(options){
  return new Promise((resolve, reject) => {
    request(options, function(err, res, body){
      if(err) {
        reject(err);
      } else if(res.statusCode == 200){
        resolve(JSON.parse(body));
      }
    });
  });
};