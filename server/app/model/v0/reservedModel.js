const path = require('path');
const dbDirectory = path.resolve(__dirname, '../../../config');
const { db, mongoose } = require(`${dbDirectory}/config.db`);

const reservedSchema = new mongoose.Schema({
	openId: String,
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