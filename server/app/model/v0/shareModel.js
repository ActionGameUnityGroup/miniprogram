const path = require('path');
const dbDirectory = path.resolve(__dirname, '../../../config');
const { db, mongoose } = require(`${dbDirectory}/config.db`);

/**
 * @param {String} id 学员id
 * @param {String} avatar 头像
 * @param {String} name 姓名
 * @param {String} time 发表时间
 * @param {Array} message 留言
*/
const shareSchema = new mongoose.Schema({
  id: String,
  avatar: String,
  name: String,
  time: Number,
  message: Array
}, {collection: 'Share', versionKey: false});

const shareModel = db.model('share', shareSchema);

module.exports = shareModel;