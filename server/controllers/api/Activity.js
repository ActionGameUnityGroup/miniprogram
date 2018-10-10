const {formatData} = require('./formatData');
const activityModel = require('../../models/activityModel');

class Activity{
  async getActivityList(ctx){
    const activityList = await activityModel.find({}, '-_id').sort({});
    ctx.body = formatData(activityList);
  }
}

module.exports = new Activity();