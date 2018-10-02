const signModel = require('../../models/signModel');
const {formatData, formatDataFail} = require('./formatData');

class SignIn{

  async getUserSignInfo(ctx){
    let openid = ctx.request.headers.authorization;
    console.log(openid);
    const userSignInfo = await signModel.find({openid: openid}, '-_id').sort({date: 1});
    ctx.body = formatData({signInfo: userSignInfo});
    ctx.type = 'text/json';
  }

  async signIn(ctx){
    const params = JSON.parse(ctx.request.body);
    const openid = ctx.request.headers.authorization;
    const signList = await signModel.find({openid: openid, date: params.date}, '-_id');
    if(!signList.length){
      const options = {
        openid: openid,
        date: params.date,
        time: params.time
      };
      const signInfo = new signModel(options);
      const signRes = await signInfo.save();
      ctx.body = formatData({info: '签到成功', signType: 1});
    } else {
      ctx.body = formatDataFail({info: '你已经签过了哦', signType: 0});
    }
  }

}

module.exports = new SignIn();