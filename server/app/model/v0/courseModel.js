const path = require('path');
const dbDirectory = path.resolve(__dirname, '../../../db');
const { db, mongoose } = require(`${dbDirectory}/db-config`);

const kurseSchema = new mongoose.Schema({
	kurseId: String,
  cover: String,
  title: String,
  authorList: Array,
  kurseInfo: Array,
  kurseDetailList: Array,
}, {collection: 'Kurse', versionKey: false});

const kurseModel = db.model('kurse', kurseSchema);

module.exports = kurseModel;