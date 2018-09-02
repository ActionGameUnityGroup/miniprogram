const {mongoose, db} = require('../mongodb/db');

console.log('模型内连接数据库');

let lessonSchema = new mongoose.Schema({
  audioID: Number,
  audioName : String,
  audioUrl : String,
  author : String,
  courseName: '',
  lessonCoverUrl : String,
  audioLength : String
}, {collection: 'Lesson', versionKey: false});

/*audioSchema.methods.findObject = function(obj, callback){
  return this.model('audio').find(obj, callback);
};

audioSchema.statics.findObject = function(obj, callback){
  return this.model('audio').find(obj, callback);
};*/

let lessonModel = db.model('lesson', lessonSchema);

module.exports = lessonModel;