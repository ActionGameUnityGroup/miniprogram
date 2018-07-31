const {formatData} = require('./formatData');
const userModel = require('../../models/userModel');
const getObject = require('../../services/userService');

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

  constructor(){}

  async getUserInfo(ctx){
    let query = getObject(ctx);
    let data = await userModel.find(query);
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
    /*let query = getObject(ctx);
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
      let params = JSON.parse(ctx.request.body);
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

};

module.exports = new User();