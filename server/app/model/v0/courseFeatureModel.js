const path = require('path');
const dbDirectory = path.resolve(__dirname, '../../../config');
const { db, mongoose } = require(`${dbDirectory}/config.db`);

/**
 * @param {String} featureId 课程风采ID
 * @param {String} title 标题
 * @param {String} subTitle 副标题
 * @param {Number} viewCount 浏览量
 * @param {Boolean} isRelease 发布状态
 * @param {Number} releaseTime 发布时间
 * @param {Array} content 内容
*/
const courseFeatureSchema = new mongoose.Schema({
  featureId: String,
  title: String,
  subTitle: String,
  viewCount: Number,
  isRelease: Boolean,
  releaseTime: Number,
  cover: String,
  content: Array,
  order: Number,
}, {collection: 'CourseFeature', versionKey: false});

const courseFeature = db.model('courseFeature', courseFeatureSchema);

module.exports = courseFeature;