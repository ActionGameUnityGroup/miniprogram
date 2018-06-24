const mime = require('mime');

module.exports = (url) => {
  return new Promise((resolve, reject) => {
    fs.readFile(url, (err, data) => {
      if (!err) {
        resolve(data);
      }
      reject(data);
    });
  });
};