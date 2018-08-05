const {formatData} = require('./formatData');
const userModel = require('../../models/userModel');
const {getQuery, getParams} = require('../../services/userService');
const request = require('../../app/request');

const saveModel = (model) => {
  return new Promise((resolve, reject) => {
    model.save(function(err, res){
      if (!err) {
        resolve(res);
      }
      reject(err);
    });
  });
};

class User {

  async getUserInfo(ctx){
    let query = getQuery(ctx);
    // console.log(ctx.headers);
    let data = await userModel.find(query, '-_id');
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
      let res = await saveModel(User);
      const requestdata = formatData(res);
      console.log(requestdata);
      ctx.body = requestdata ;
      ctx.type = 'text/json';
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
    let params = getQuery(ctx);
    // console.log(params);
    let res = await request(
      `https://api.weixin.qq.com/sns/jscode2session?appid=wxba59a2c0824fd1db&secret=5fb3f9c59ed54b36206dd07288620d7d&js_code=${params.code}&grant_type=authorization_code`,
      {}
    );
    console.log(res);
    ctx.body = {};
    ctx.type = 'text/json';
  }

};

module.exports = new User();