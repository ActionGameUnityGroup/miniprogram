const parseString  = require('xml2js').parseString;

const xmlToJson = (str) => {
  return new Promise((resolve, reject) => {
    parseString(str, {explicitArray : false}, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = {
  xmlToJson,
};