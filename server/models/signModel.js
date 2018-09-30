const {mongoose, db} = require('../mongodb/db');

console.log('模型内连接数据库');

let signSchema = new mongoose.Schema({
  openid: String,
  date: String,
  time: String
}, {collection: 'Sign', versionKey: false});

let signModel = db.model('sign', signSchema);

module.exports = signModel;