const path = require('path');
const dbDirectory = path.resolve(__dirname, '../../../config');
const { db, mongoose } = require(`${dbDirectory}/config.db`);

/**
 * @param {String} id 助教ID
 * @param {Number} sort 排序
 * @param {String} avatar 头像
 * @param {String} title 助教头衔
 * @param {String} name 助教名字
 * @param {String} qrcode 微信二维码
 * @param {String} phone 手机号
 * @param {String} wechat 微信号
*/
const assistantSchema = new mongoose.Schema({
    id: String,
    sort: Number,
    avatar: String,
    title: String,
    name: String,
    qrcode: String,
    phone: String,
    wechat: String,
}, { collection: 'Assistant', versionKey: false });

const assistant = db.model('assistant', assistantSchema);

module.exports = assistant;