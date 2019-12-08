const path = require('path');
const dbDirectory = path.resolve(__dirname, '../../../config');
const { db, mongoose } = require(`${dbDirectory}/config.db`);

/**
 * @param {String} banner banner
 * @param {String} name 公司名称
 * @param {String} address 公司地址
 * @param {String} intro 公司简介
*/
const introductionSchema = new mongoose.Schema({
    banner: String,
    name: String,
    address: String,
    intro: String,
}, { collection: 'Introduction', versionKey: false });

const introduction = db.model('introduction', introductionSchema);

module.exports = introduction;