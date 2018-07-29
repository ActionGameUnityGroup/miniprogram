const audioModel = require('../../models/audioModel');
const {formatData} = require('./formatData');

class Audio {

  constructor(){}

  async getAudio(ctx){
    let query = ctx.query;
    await audioModel.find(query, function(err, result) {
      if (!err) {
        ctx.body = formatData(result);
        ctx.type = 'text/json';
      }
    });
  }

}

module.exports = new Audio();