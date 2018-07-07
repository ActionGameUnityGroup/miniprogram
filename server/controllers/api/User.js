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
    await userModel.findObject(query, function(err, result){
      if (!err) {
        // console.log(result, 24);
        formatData(result).then((res) => {
          // console.log(res);
          ctx.body = res;
          ctx.type = 'text/json';
        });
      }
    });
  }

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