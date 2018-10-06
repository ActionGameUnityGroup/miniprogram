const lessonModel = require('../../models/lessonModel');
const {formatData} = require('./formatData');
const upload = require('./upload');
const path = require('path');
const fs = require('fs');

class Audio {

  constructor(){}

  async getLesson(ctx){
    let query = ctx.query;
    let data = await lessonModel.find(query, '-_id').sort({'audioID': -1});
    ctx.info(`${ctx.url}: ${data}`);
    ctx.body = await formatData(data);
    ctx.type = 'text/json';
    /*lessonModel.find(query, function(err, result) {
      if (!err) {
      }
      ctx.error(err);
    });*/
  }

  async getLessonList(ctx){
    let data = await lessonModel.find({}, '-_id').sort({'audioID': -1});
    console.log(data);
    ctx.info(`${ctx.url}: ${data}`);
    ctx.body = await formatData(data);
    ctx.type = 'text/json';
  }

  async setLesson(ctx){
    // console.log('上传音频');
    let fileStream = await upload(ctx);
    fileStream.file.pipe(fs.createWriteStream(path.resolve(__dirname, `../../public/audio/${fileStream.fileName}`)));
    ctx.info(`${ctx.url}: ${fileStream}`);
    ctx.body = await formatData({});
    ctx.type = 'text/json';
  }

}

module.exports = new Audio();