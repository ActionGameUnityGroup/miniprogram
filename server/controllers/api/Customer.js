const formatData = require('./formatData');
const customerModel = require('../../models/customerModel');
const getObject = require('../../services/customerService');

const saveInfo = (model) => {
  return new Promise((resolve, reject) => {
    model.save(function(err, res){
      if (!err) {
        resolve(res);
      }
      reject(err);
    });
  });
};

class Customer {

  constructor(){}

  async getInfo(ctx){
    let query = getObject(ctx);
    await customerModel.findObject(query, function(err, result){
      if (!err) {
        const data = formatData(result);
        ctx.body = data;
        ctx.type = 'text/json';
      }
    });
  }

  async setInfo(ctx){
    // const customerModel = require('../../models/customer');
    let params = ctx.request.body;
    console.log(params.name, 5);
    params = JSON.parse(params);
    console.log(params.name, 7);
    let _ID = 0;
    await customerModel.findAll(function(err, res){
      console.log(err, res);
      if (!err && res.length) {
        _ID = res.length;
        console.log('修改userID', _ID);
      }else if(!res.length){
        // 空表
        _ID = 0;
      }else{
        console.error('Error: ', err);
      }
    });
    console.log('userId: ', _ID);
    const Custom = new customerModel({
                                  userId: _ID,
                                  userName: params.userName,
                                  sexual: params.sex,
                                  age: params.age,
                                  weight: params.weight,
                                  height: params.height,
                               });
    await saveInfo(Custom)
                          .then(res => {
                            console.log(res, 'resolve');
                            let callback = {status: 'post_success', data: res, text: '修改成功！'};
                            ctx.body = callback;
                            ctx.type = 'text/json';
                          })
                          .catch(err => {
                            console.error(err, 'reject');
                            let callback = {status: 'post_failure', data: err, text: '修改失败！'};
                            ctx.body = {status: 'post_failure', data: err};
                            ctx.type = 'text/json';
                          });
  }

};

module.exports = new Customer();