const audioModel = require('../../models/audioModel');
const {formatData} = require('./formatData');
const upload = require('./upload');
const path = require('path');
const fs = require('fs');

class Audio {

  constructor(){}

  async getAudio(ctx){
    let query = ctx.query;
    let data = await audioModel.find(query, '-_id', {sort: [['audioID', -1]]});
    ctx.info(`${ctx.url}: ${data}`);
    ctx.body = await formatData(data);
    ctx.type = 'text/json';
    /*audioModel.find(query, function(err, result) {
      if (!err) {
      }
      ctx.error(err);
    });*/
  }

  async getAudioList(ctx){
    let data = await audioModel.find({}, '-_id audioID audioName audioCoverUrl').sort({'audioID': -1});
    console.log(data);
    ctx.info(`${ctx.url}: ${data}`);
    ctx.body = await formatData(data);
    ctx.type = 'text/json';
  }

  async setAudio(ctx){
    // console.log('上传音频');
    let fileStream = await upload(ctx);
    fileStream.file.pipe(fs.createWriteStream(path.resolve(__dirname, `../../public/audio/${fileStream.fileName}`)));
    ctx.info(`${ctx.url}: ${fileStream}`);
    ctx.body = await formatData({});
    ctx.type = 'text/json';
  }

}

module.exports = new Audio();