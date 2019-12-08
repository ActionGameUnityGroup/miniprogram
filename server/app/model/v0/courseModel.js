const path = require('path');
const dbDirectory = path.resolve(__dirname, '../../../config');
const { db, mongoose } = require(`${dbDirectory}/config.db`);

/**
 * @param {String} courseId 课程ID
 * @param {String} cover 课程封面
 * @param {String} banner 课程banner
 * @param {String} category 课程分类
 * @param {String} title 课程标题
 * @param {String} subTitle 课程副标题
 * @param {Number} sort 课程排序
 * @param {Array} introList 课程介绍
*/
const courseSchema = new mongoose.Schema({
	courseId: String,
  cover: String,
  banner: String,
  category: String,
  title: String,
  subTitle: String,
  sort: Number,
  introList: Array
}, {collection: 'Course', versionKey: false});

const courseModel = db.model('course', courseSchema);

module.exports = courseModel;