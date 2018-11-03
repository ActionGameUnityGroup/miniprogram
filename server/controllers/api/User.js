const {formatData, saveModel} = require('./formatData');
const userModel = require('../../models/userModel');
const {getQuery, getParams} = require('../../services/userService');
const request = require('../../app/request');
const WXBizDataCrypt = require('../../app/WXBizDataCrypt');
const createUserId = require('./createUserId');

class User {

  async getUserInfo(ctx){
    // let query = getQuery(ctx);
    // console.log(ctx.headers);
    const openid = ctx.request.headers.authorization;
    let data = await userModel.find({openid: openid}, '-_id');
    await ctx.info(`${ctx.url}: ${data}`);
    ctx.body = await formatData(data);
    ctx.type = 'text/json';
    /*userModel.find(query, function (err, result) {
      if (!err) {
        console.log(result);
        ctx.body = result;
        ctx.type = 'text/json';
      }
    });*/
    // console.log(new Date().getTime());
    /*await userModel.findObject(query, function(err, result){
      if (!err) {
        ctx.info(`${ctx.url}: ${result}`);
        ctx.body = formatData(result);
        ctx.type = 'text/json';
      }
      ctx.error(err);
    });*/
    /*let query = getQuery(ctx);
    await userModel.find(query, function(err, result){
      if (!err) {
        // console.log(result, 24);
        ctx.body = result;
        ctx.type = 'text/json';
      }
    });*/
  }

  async getUserCourse(ctx){}

  async setUserInfo(ctx){
      let params = getParams(ctx);
      console.log(params);
      const data = {
        unionid: params.unionid || 0,
        avatar: params.avatar || '',
        nickname: params.nickname || '',
        sex: params.sex || '',
        birthday: params.birthday || '',
        name: params.name || '',
        phonenumber: params.phonenumber || 0,
        address: params.address || ''
      }
      console.log(data);
      const User = new userModel(data);
      let res = await User.save();
      if (res._id) {
        const requestdata = formatData(res);
        console.log(requestdata);
        ctx.body = requestdata ;
        ctx.type = 'text/json';
      } else {
        ctx.body = await formatData({info: '添加信息成功！'});
        ctx.type = 'text/json';
      }
      /*.then((res) => {
        console.log(res, 50);
        const data = formatData(res);
        ctx.body = data;
        ctx.type = 'text/json';
      })
      .catch((err) => {
        const error = formatDataFail(err);
        ctx.body = error;
        ctx.type = 'text/json';
      });*/
  }

  async login(ctx){
    // 登录以后返回openID
    // 以后请求接口在请求头加入openID
    /*
      请求参数：
      code
      encryptedData
      iv
    */
    let query = getQuery(ctx);
    // console.log(query);
    let res = await request({
      hostname: `api.weixin.qq.com`,
      path: `/sns/jscode2session?appid=wxba59a2c0824fd1db&secret=5fb3f9c59ed54b36206dd07288620d7d&js_code=${query.code}&grant_type=authorization_code`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
    // console.log(res);
    let user = await userModel.find({openid: res.openid}, '-_id');
    // console.log(user.length, 109);
    if (user.length) {
      // 数据库有
      ctx.body = await formatData({openid: res.openid});
      ctx.type = 'text/json';
    } else {
      const appid = 'wxba59a2c0824fd1db';
      const pc = new WXBizDataCrypt(appid, res.session_key);
      // console.log(decodeURIComponent(query.encryptedData), '\n');
      // console.log(decodeURIComponent(query.iv));
      const data = pc.decryptData(`${decodeURIComponent(query.encryptedData)}`, `${decodeURIComponent(query.iv)}`);
      // console.log(data);
      const save = {
        unionid: data.unionid || '',
        userid: createUserId(new Date().getTime()),
        openid: data.openId || '',
        avatar: data.avatarUrl || '',
        nickname: data.nickName || '',
        gender: data.gender || 0,
        language: data.language || '',
        city: data.city || '',
        province: data.province || '',
        country: data.country || ''
      };
      // console.log(data);
      const User = new userModel(save);
      let saveInfo = await saveModel(User);
      if (saveInfo._id) {
        ctx.body = await formatData({openid: res.openid});
        ctx.type = 'text/json';
      } else {
        ctx.body = await formatData({openid: res.openid});
        ctx.type = 'text/json';
      }
      // console.log(saveInfo);
      // console.log(data);
      // console.log(res);
    }
  }

};

module.exports = new User();