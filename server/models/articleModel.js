const {db, mongoose} = require('../mongodb/db');

let articleSchema = new mongoose.Schema({
  articleName: String,
  articleCover: String,
  imageFrom: String,
  articleFrom: String,
  articleTime: String,
  browseTimes: Number,
  articleDetail: Array
}, {collection: 'Article', versionKey: false});

let articleModel = db.model('article', articleSchema);

module.exports = articleModel;