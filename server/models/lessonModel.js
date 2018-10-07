const {mongoose, db} = require('../mongodb/db');

console.log('模型内连接数据库');

let lessonSchema = new mongoose.Schema({
  lessonId: String,
  courseId: String,
  lessonAudioName: String,
  lessonAudioUrl: String,
  lessonName: String,
  lessonAudioLengthNumber: Number,
  lessonAudioLengthString: String,
  studyNumber: Number
}, {collection: 'Lesson', versionKey: false});

/*audioSchema.methods.findObject = function(obj, callback){
  return this.model('audio').find(obj, callback);
};

audioSchema.statics.findObject = function(obj, callback){
  return this.model('audio').find(obj, callback);
};*/

let lessonModel = db.model('lesson', lessonSchema);

module.exports = lessonModel;