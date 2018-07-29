const {mongoose, db} = require('../mongodb/db');

console.log('模型内连接数据库');

let audioSchema = new mongoose.Schema({
  audioID: Number,
  audioName : String,
  audioUrl : String,
  audioAuthor : String,
  aduioCoverUrl : String,
  audioLength : String
}, {collection: 'Audio', versionKey: false});

audioSchema.methods.findObject = function(obj, callback){
  return this.model('audio').find(obj, callback);
};

audioSchema.statics.findObject = function(obj, callback){
  return this.model('audio').find(obj, callback);
};

let audioModel = db.model('audio', audioSchema);

module.exports = audioModel;