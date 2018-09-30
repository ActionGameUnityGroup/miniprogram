const feedbackModel = require('../../models/feedbackModel');
const {formatData, formatDataFail} = require('./formatData');

class FeedBack{

  async getFeedBackList(ctx){}

  async sendFeedBack(ctx){
    const params = JSON.parse(ctx.request.body);
    console.log(params, 'post内容');
    const openid = ctx.request.headers.authorization;
    console.log(openid, '用户凭证');
    const options = {
      openid: openid,
      suggest: params.suggest,
      contact: params.contact,
      date: params.date,
      time: params.time
    };
    let feedback = new feedbackModel(options);
    console.log(feedback, '意见');
    let res = await feedback.save();
    console.log(res.length, '保存意见的回调');
    if(res) {
      console.log('成功提交');
      ctx.body = formatData({info: '您的意见已成功提交'});
    } else {
      ctx.body = formatDataFail({info: '无法提交该意见'});
    }
  }

}

module.exports = new FeedBack();
