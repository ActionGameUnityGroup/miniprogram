const {mongoose, db} = require('../mongodb/db');

console.log('模型内连接数据库');

let userSchema = new mongoose.Schema({
  openid: String,
  userid: String
  avatar: String,
  nickname: String,
  gender: Number,
  language: String,
  city: String,
  province: String,
  country: String,
}, {collection: 'User', versionKey: false});

let userModel = db.model('user', userSchema);

module.exports = userModel;