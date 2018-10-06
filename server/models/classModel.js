const {mongoose, db} = require('../mongodb/db');

// console.log('模型内连接数据库');

let classSchema = new mongoose.Schema({
  classId : String,
  classType : Number,
  classCover : String,
  className : String
}, {collection: 'Class', versionKey: false});

let classModel = db.model('class', classSchema);

module.exports = classModel;