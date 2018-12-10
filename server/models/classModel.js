const {mongoose, db} = require('../mongodb/db');

let classSchema = new mongoose.Schema({
  classId : String,
  classType : Number,
  classCover : String,
  className : String
}, {collection: 'Class', versionKey: false});

let classModel = db.model('class', classSchema);

module.exports = classModel;