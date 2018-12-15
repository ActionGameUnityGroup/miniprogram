const path = require('path');
const dbDirectory = path.resolve(__dirname, '../../../db');
const { db, mongoose } = require(`${dbDirectory}/db-config`);

const tutorSchema = new mongoose.Schema({
	tutorId: String,
  cover: String,
  introductionCover: String,
  name: String,
  honnorList: Array,
  introductionList: Array,
}, {collection: 'Tutor', versionKey: false});

const tutorModel = db.model('tutor', tutorSchema);

module.exports = tutorModel;