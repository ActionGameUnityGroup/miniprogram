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

module.exports = {
  'POST /api/setCustomerInfo': async (ctx) => {
    const customModel = require('../../models/customer');
    let params = ctx.request.body;
    console.log(params.name, 5);
    params = JSON.parse(params);
    console.log(params.name, 7);
    let _ID = 0;
    await customModel.findAll(function(err, res){
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
    const Custom = new customModel({
                                  userId: _ID,
                                  userName: params.userName,
                                  sexual: params.sex,
                                  age: params.age,
                                  weight: params.weight,
                                  height: params.height,
                               });
    // {name: "ward", sexual: "male", weight: 53, height: 175, age: 24}
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
    /*await Custom.save(function(err, res){
      console.log(err, res, 30);
      if (!err) {
        let callback = {status: 'post_success', data: '修改成功！'};
        console.log('回调1', callback);
        ctx.body = callback;
        ctx.type = 'text/json';
      }else{
        console.log('回调2');
        ctx.body = {status: 'post_failure', data: err};
        ctx.type = 'text/json';
      }
    });*/
    // console.log(ctx.body, '回调正文');
  },
};