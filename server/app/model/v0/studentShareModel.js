const path = require('path');
const dbDirectory = path.resolve(__dirname, '../../../config');
const { db, mongoose } = require(`${dbDirectory}/config.db`);

/**
 * @param {String} studentId 学员id
 * @param {String} avatar 头像
 * @param {String} name 姓名
 * @param {String} time 发表时间
 * @param {String} content 留言
 * @param {Number} sort 排序
*/
const StudentShareSchema = new mongoose.Schema({
  studentId: String,
  avatar: String,
  name: String,
  time: Number,
  content: String,
  sort: Number,
}, {collection: 'StudentShare', versionKey: false});

const StudentShareModel = db.model('studentShare', StudentShareSchema);

module.exports = StudentShareModel;