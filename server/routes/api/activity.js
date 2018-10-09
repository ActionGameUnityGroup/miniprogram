const Activity = require('../../controllers/api/Activity');

module.exports = {
  'GET /api/activity/getActivityList': async (ctx) => {
    await Activity.getActivityList(ctx);
  }
}