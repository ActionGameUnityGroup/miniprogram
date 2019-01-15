const path = require('path');
// const request = require('request');
const rootDirectory = path.resolve(__dirname, '../../../');
const config = require(`${rootDirectory}/config/miniprogram.config.js`);
const userModel = require(`${rootDirectory}/app/model/v0/userModel`);
const formatData = require(`${rootDirectory}/app/service/formatData`);
const request = require(`${rootDirectory}/app/service/request`);
const WXBizDataCrypt = require(`${__dirname}/WXBizDataCrypt`);

class UserService extends formatData{

  async login(ctx){
    /*
     * @Description: 登录以后返回openID
    */
    let response;
    try {
      let params = ctx.request.body;
      const clientIP = ctx.request.header['x-forwarded-for'];
      console.log(`client's ip: ${clientIP}`);
      /*let res = await request({
        hostname: `api.weixin.qq.com`,
        path: `/sns/jscode2session?appid=wxba59a2c0824fd1db&secret=5fb3f9c59ed54b36206dd07288620d7d&js_code=${params.code}&grant_type=authorization_code`,
        method: 'GET',
        header: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      });*/
      let res = await request({
        url: `https://api.weixin.qq.com/sns/jscode2session?appid=${config.appid}&secret=${config.secret}&js_code=${params.code}&grant_type=${config.grant_type}`,
        method: 'GET'
      });
      console.log(res, 'response');
      if(!res.errcode){
        const { openid, session_key } = res;
        let user = await userModel.find({ openid, }, '-_id');
        console.log(user, '用户');
        if (user.length) {
          // 数据库有
          response = this.formatDataSuccess({ openid });
        } else {
          this.register(openid, session_key);
          response = this.formatDataSuccess({ openid });
        }
      }
    } catch(e) {
      console.log(e.message);
      response = this.formatDataFail(e.message);
      ctx.throw(500);
    }
    return response;
  }

  async register(openid, session_key){
  	const pc = new WXBizDataCrypt(config.appid, session_key);
    console.log(pc, 'pc');
	  const data = pc.decryptData(`${decodeURIComponent(query.encryptedData)}`, `${decodeURIComponent(query.iv)}`);
    console.log(data, '解析完毕');
	  const save = {
	    unionid: data.unionid || '',
	    // userid: createUserId(new Date().getTime()),
	    userid: '',
	    openid: data.openId || '',
	    avatar: data.avatarUrl || '',
	    nickname: data.nickName || '',
	    gender: data.gender || 0,
	    language: data.language || '',
	    city: data.city || '',
	    province: data.province || '',
	    country: data.country || ''
	  };
	  const User = new userModel(save);
	  let saveInfo = await User.save();
  }

  async getUserInfo(ctx){
    const { userId } = ctx.request.query || '';
    let response;
    if(userId.length){
      try{
        let data = await userModel.find({userId: userId}, '-_id');
        if(data.length) throw new Error('请先授权！');
        response = this.formatDataSuccess(data);
      } catch(e){
        response = this.formatDataFail(e.message);
        ctx.throw(500);
      }
    } else {
      response = this.formatDataFail('无法获取个人信息，请先授权');
      ctx.throw(500);
    }
    return response;
  }

}

module.exports = new UserService();