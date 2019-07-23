const path = require('path');
const dbDirectory = path.resolve(__dirname, '../../../config');
const { db, mongoose } = require(`${dbDirectory}/config.db`);

let adminSchema = new mongoose.Schema({
  adminId: String,
  nickname: String,
  username: String,
  password: String
}, { collection: 'Administrator', versionKey: false });

let adminModel = db.model('admin', adminSchema);

module.exports = adminModel;