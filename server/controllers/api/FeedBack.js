const feedbackModel = require('../../models/feedbackModel');
const {formatData, formatDataFail} = require('./formatData');

class FeedBack{

  async getFeedBackList(ctx){}

  async sendFeedBack(ctx){
    const params = JSON.parse(ctx.request.body);
    const openid = ctx.request.headers.authorization;
    const options = {
      openid: openid,
      suggest: params.suggest,
      contact: params.contact,
      date: params.date,
      time: params.time
    };
    let feedback = new feedbackModel(options);
    feedback.save((err) => {
      if(err) {
        ctx.body = formatDataFail({info: '无法提交该意见'});
      }
      ctx.body = formatData({info: '您的意见已成功提交'});
    });
  }

}

module.exports = new FeedBack();
