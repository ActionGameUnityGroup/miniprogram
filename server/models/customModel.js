const {mongoose, db} = require('../mongodb/db');

let customSchema = new mongoose.Schema({
  token: String,
  avatar: String,
  nickname: String,
  username: String,
  password: String
}, {collection: 'Customer', versionKey: false});

let customModel = db.model('custom', customSchema);

module.exports = customModel;