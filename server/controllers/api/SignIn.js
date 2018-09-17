// const signModel = require('../../models/signModel');
const {formatData, formatDataFail} = require('./formatData');

class SignIn{

  async getSignInfo(ctx){
    let openid = ctx.request.headers.authorization;
    console.log(openid);
    ctx.body = formatData({});
    ctx.type = 'text/json';
  }

  async signIn(ctx){}

}

module.exports = new SignIn();