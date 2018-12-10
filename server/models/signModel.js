const {mongoose, db} = require('../mongodb/db');

let signSchema = new mongoose.Schema({
  openid: String,
  date: String,
  time: String
}, {collection: 'Sign', versionKey: false});

let signModel = db.model('sign', signSchema);

module.exports = signModel;