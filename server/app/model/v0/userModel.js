const path = require('path');
const dbDirectory = path.resolve(__dirname, '../../../db');
const { db, mongoose } = require(`${dbDirectory}/db-config`);

let userSchema = new mongoose.Schema({
  openid: String,
  userid: String,
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