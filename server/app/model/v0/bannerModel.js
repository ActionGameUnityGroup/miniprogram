const path = require('path');
const dbDirectory = path.resolve(__dirname, '../../../config');
const { db, mongoose } = require(`${dbDirectory}/config.db`);

const bannerSchema = new mongoose.Schema({
  page: String,
  bannerList: Array
}, {collection: 'Banner', versionKey: false});

const bannerModel = db.model('banner', bannerSchema);

module.exports = bannerModel;