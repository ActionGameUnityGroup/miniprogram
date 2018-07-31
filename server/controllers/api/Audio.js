const audioModel = require('../../models/audioModel');
const {formatData} = require('./formatData');

class Audio {

  constructor(){}

  async getAudio(ctx){
    let query = ctx.query;
    let data = await audioModel.find(query);
    ctx.info(`${ctx.url}: ${data}`);
    ctx.body = await formatData(data);
    ctx.type = 'text/json';
    /*audioModel.find(query, function(err, result) {
      if (!err) {
      }
      ctx.error(err);
    });*/
  }

}

module.exports = new Audio();