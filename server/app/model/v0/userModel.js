const path = require('path');
const dbDirectory = path.resolve(__dirname, '../../../config');
const { db, mongoose } = require(`${dbDirectory}/config.db`);

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