const {db, mongoose} = require('../mongodb/db');

let activitySchema = new mongoose.Schema({
  activityId: String,
  activityCover: String,
  activityName: String,
  activityTime: String,
  activityTime: String,
  activityType: Number,
  isEnd: Boolean
}, {collection: 'Activity', versionKey: false});

let activityModel = db.model('activity', activitySchema);

module.exports = activityModel;