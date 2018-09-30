const signModel = require('../../models/signModel');
const {formatData, formatDataFail} = require('./formatData');

class SignIn{

  async getSignInfo(ctx){
    let openid = ctx.request.headers.authorization;
    console.log(openid);
    ctx.body = formatData({});
    ctx.type = 'text/json';
  }

  async signIn(ctx){
    const params = JSON.parse(ctx.request.body);
    const openid = ctx.request.headers.authorization;
    const options = {
      openid: openid,
      date: params.date,
      time: params.time
    };
    const signInfo = new signModel(options);
    signInfo.save();
  }

}

module.exports = new SignIn();