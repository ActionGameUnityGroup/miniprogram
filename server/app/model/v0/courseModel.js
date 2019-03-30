const path = require('path');
const dbDirectory = path.resolve(__dirname, '../../../config');
const { db, mongoose } = require(`${dbDirectory}/config.db`);

/**
 * @param {String} courseId 课程ID
 * @param {String} cover1 小程序首页课程封面
 * @param {String} thumb1 小程序首页课程封面略缩图
 * @param {String} cover2 小程序课程列表页课程封面
 * @param {String} thumb2 小程序课程列表页课程封面略缩图
 * @param {String} cover3 小程序课程详情页课程封面
 * @param {String} thumb3 小程序课程详情页课程封面略缩图
 * @param {String} mainTitle 课程主标题
 * @param {String} subTitle 课程副标题
 * @param {Array} authorList 课程讲师列表
 * @param {Array} courseInfo 课程信息
 * @param {Array} courseDetailList 课程详情图片列表
 * 
*/
const courseSchema = new mongoose.Schema({
	courseId: String,
  cover1: String,
  thumb1: String,
  cover2: String,
  thumb2: String,
  cover3: String,
  thumb3: String,
  authorList: Array,
  courseInfo: Array,
  courseDetailList: Array,
  city: String,
  expenses: String,
  unifieldPrice: String,
  isSpread: Boolean,
  date: String,
  venue: String,
  type: String,
  time: Number,
  mainTitle: String,
  subTitle: String,
  key: String,
  isExpire: Boolean
}, {collection: 'Course', versionKey: false});

const courseModel = db.model('course', courseSchema);

module.exports = courseModel;