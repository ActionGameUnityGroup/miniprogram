const path = require('path');
const dbDirectory = path.resolve(__dirname, '../../../config');
const { db, mongoose } = require(`${dbDirectory}/config.db`);

/**
 * @param {String} banner banner
 * @param {String} name 公司名称
 * @param {String} slogan 公司口号
 * @param {String} intro 承接业务
*/
const businessSchema = new mongoose.Schema({
    banner: String,
    name: String,
    slogan: String,
    intro: String,
}, { collection: 'Business', versionKey: false });

const business = db.model('Business', businessSchema);

module.exports = business;