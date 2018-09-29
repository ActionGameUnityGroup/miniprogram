const {db, mongoose} = require('../mongodb/db');

let feedbackSchema = new mongoose.Schema({
  openid: String,
  suggest: String,
  contact: String,
  date: String,
  time: String
}, {collection: 'Feedback', versionKey: false});

let feedbackModel = db.model('feedback', feedbackSchema);

module.exports = feedbackModel;