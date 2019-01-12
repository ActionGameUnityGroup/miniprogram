const path = require('path');
const dbDirectory = path.resolve(__dirname, '../../../db');
const { db, mongoose } = require(`${dbDirectory}/db-config`);

const reservedSchema = new mongoose.Schema({
	openid: String,
	name: String,
	mobile: String,
	profession: String,
	city: String,
	email: String,
	gender: String,
	courseId: String,
}, {collection: 'Reserved', versionKey: false});

const reservedModel = db.model('reserved', reservedSchema);

module.exports = reservedModel;