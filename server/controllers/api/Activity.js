const {formatData} = require('./formatData');
const activityModel = require('../../models/activityModel');

class Activity{
  async getActivityList(ctx){
    ctx.body = formatData({});
  }
}

module.exports = new Activity();