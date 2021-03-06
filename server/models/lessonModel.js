const {mongoose, db} = require('../mongodb/db');

let lessonSchema = new mongoose.Schema({
  lessonId: String,
  courseId: String,
  lessonAudioName: String,
  lessonAudioUrl: Array,
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