module.exports = {
  'POST /api/setInfo': async (ctx) => {
    const userModel = require('../../models/user');
    let params = ctx.request.body;
    console.log(params.name, 5);
    params = JSON.parse(params);
    console.log(params.name, 7);
    let _ID = 0;
    userModel.findAll(function(err, res){
      console.log(!res.length);
      if (!err && res.length) {
        _ID = res.length + 1;
      }else if(!res.length){
        // 空表
        _ID = 0;
      }else{
        console.error('Error: ', err);
      }
    });
    const User = new userModel({
                                  userId: _ID,
                                  name: params.name,
                                  sexual: params.sex,
                                  age: params.age,
                                  weight: params.weight,
                                  height: params.height,
                               });
    // {name: "ward", sexual: "male", weight: 53, height: 175, age: 24}
    User.save(function(err, res){
      console.log(err, res, 30);
      if (!err && res) {
        // resData = res
      }
    })
    ctx.body = {status: 'post_fail', data: []};
    ctx.type = 'text/json';
  },
};