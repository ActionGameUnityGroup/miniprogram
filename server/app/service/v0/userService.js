const path = require('path');
const request = require('request');
const rootDirectory = path.resolve(__dirname, '../../');
const userModel = require(`${rootDirectory}/model/v0/userModel`);
const formatData = require(`${rootDirectory}/service/formatData`);
const WXBizDataCrypt = require(`${__dirname}/WXBizDataCrypt`);

class UserService extends formatData{

	async login(ctx){
    /*
     * @Description: 登录以后返回openID
    */
    let response;
    try {
	    let { query } = ctx.request;
	    /*let res = await request({
	      hostname: `api.weixin.qq.com`,
	      path: `/sns/jscode2session?appid=wxba59a2c0824fd1db&secret=5fb3f9c59ed54b36206dd07288620d7d&js_code=${query.code}&grant_type=authorization_code`,
	      method: 'GET',
	      header: {
	        'Content-Type': 'application/json; charset=utf-8'
	      }
	    });*/
	    let res = await request(`https://api.weixin.qq.com//sns/jscode2session?appid=wxba59a2c0824fd1db&secret=5fb3f9c59ed54b36206dd07288620d7d&js_code=${query.code}&grant_type=authorization_code`);
	    console.log(res, '首次解析');
	    let user = await userModel.find({openid: res.openid}, '-_id');
	    if (user.length) {
	      // 数据库有
	      ctx.body = await formatData({openid: res.openid});
	      ctx.type = 'text/json';
	    } else {
	      const appid = 'wxba59a2c0824fd1db';
	      const pc = new WXBizDataCrypt(appid, res.session_key);
	      const data = pc.decryptData(`${decodeURIComponent(query.encryptedData)}`, `${decodeURIComponent(query.iv)}`);
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
	      response = this.formatData({openid: res.openid});
	    }
    } catch(e) {
    	console.log(e.message);
      response = this.formatDataFail(e.message);
    	ctx.throw(500);
    }
    return response;
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