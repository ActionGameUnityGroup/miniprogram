const path = require('path');
const dbDirectory = path.resolve(__dirname, '../../../config');
const { db, mongoose } = require(`${dbDirectory}/config.db`);

/**
 * @param {String} id 课程风采ID
 * @param {String} title 标题
 * @param {Number} viewCount 浏览量
 * @param {Number} releaseTime 发布时间
 * @param {Array} content 内容
*/
const assistantSchema = new mongoose.Schema({
    id: String,
    avatar: String,
    title: String,
    name: String,
    qrcode: String,
    phone: String
}, { collection: 'Assistant', versionKey: false });

const assistant = db.model('assistant', assistantSchema);

module.exports = assistant;