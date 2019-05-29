const path = require('path');
const dbDirectory = path.resolve(__dirname, '../../../config');
const { db, mongoose } = require(`${dbDirectory}/config.db.js`);

const tutorSchema = new mongoose.Schema({
  tutorId: String,
  avatar: String,
  name: String,
  title: Array,
  type: String,
  charactersIntro: Array,
  personalIdentification: Array,
}, {collection: 'Tutor', versionKey: false});

const tutorModel = db.model('tutor', tutorSchema);

module.exports = tutorModel;