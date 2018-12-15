const path = require('path');
const dbDirectory = path.resolve(__dirname, '../../../db');
const { db, mongoose } = require(`${dbDirectory}/db-config`);

const courseSchema = new mongoose.Schema({
	courseId: String,
  cover: String,
  title: String,
  authorList: Array,
  courseInfo: Array,
  courseDetailList: Array,
}, {collection: 'Course', versionKey: false});

const courseModel = db.model('course', courseSchema);

module.exports = courseModel;