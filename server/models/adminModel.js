const {mongoose, db} = require('../mongodb/db');

let adminSchema = new mongoose.Schema({
  token: String,
  avatar: String,
  nickname: String,
  username: String,
  password: String
}, {collection: 'Administrator'});

let adminModel = db.model('admin', adminSchema);

module.exports = adminModel;