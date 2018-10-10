const {formatData} = require('./formatData');
const activityModel = require('../../models/activityModel');

class Activity{
  async getActivityList(ctx){
    const activityList = await activityModel.find({}, '-_id').sort({activityDate: -1});
    ctx.body = formatData(activityList);
  }
}

module.exports = new Activity();