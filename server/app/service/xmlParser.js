const parseString  = require('xml2js').parseString;

class XmlParse{
  async xmlToJson(str) {
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

}



module.exports = new XmlParse();