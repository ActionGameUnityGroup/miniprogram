const {db, mongoose} = require('../mongodb/db');

let bannerSchema = new mongoose.Schema({
  page: String,
  bannerList: Array
}, {collection: 'Banner', versionKey: false});

let bannerModel = db.model('banner', bannerSchema);

module.exports = bannerModel;