const FeedBack = require('../../controllers/api/FeedBack');

module.exports = {
  'GET /api/feedback/getFeedBackList': async (ctx) => {
    console.log('获取意见');
    await FeedBack.getFeedBackList(ctx);
  },
  'POST /api/feedback/sendFeedBack': async (ctx) => {
    console.log('发送意见');
    await FeedBack.sendFeedBack(ctx);
  },
}