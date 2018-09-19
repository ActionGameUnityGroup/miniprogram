const {formatData, saveModel} = require('../api/formatData');
const adminModel = require('../../models/adminModel');
const {getQuery, getParams} = require('../../services/userService');
const request = require('../../app/request');
const WXBizDataCrypt = require('../../app/WXBizDataCrypt');

class Admin {

  async getAdminList(ctx){
    let query = getQuery(ctx);
    let data = await adminModel.find(query, '-_id');
    await ctx.info(`${ctx.url}: ${data}`);
    ctx.body = await formatData(data);
    ctx.type = 'text/json';
  }

  async setAdmin(ctx){
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
      const User = new adminModel(data);
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

  // async login(ctx){
  //   // 登录以后返回openID
  //   // 以后请求接口在请求头加入openID
  //   /*
  //     请求参数：
  //     code
  //     encryptedData
  //     iv
  //   */
  //   // console.log(ctx);
  //   let params = JSON.parse(ctx.request.body);
  //   console.log(params);
  //   let adminInfo = await adminModel.find({username: params.username, password: params.password}, '-_id');
  //   console.log(adminInfo, '管理员信息');
  //   if(adminInfo[0].token){
  //     ctx.body = await formatData({token: adminInfo[0].token, avatar: adminInfo[0].avatar, nickname: adminInfo[0].nickname});
  //     ctx.type = 'text/json';
  //   } else {
  //     ctx.body = await formatDataFail({info: '您不是管理员!'});
  //     ctx.type = 'text/json';
  //   }
  // }

  async login(ctx){
    // 登录以后返回openID
    // 以后请求接口在请求头加入openID
    /*
      请求参数：
      code
      encryptedData
      iv
    */
    // console.log(ctx);
    let params = ctx.query;
    console.log(params);
    let adminInfo = await adminModel.find({username: params.username, password: params.password}, '-_id');
    console.log('管理员信息', adminInfo);
    if(adminInfo[0].token){
      ctx.body = await formatData({token: adminInfo[0].token, avatar: adminInfo[0].avatar, nickname: adminInfo[0].nickname});
      ctx.type = 'text/json';
    } else {
      ctx.body = await formatDataFail({info: '您不是管理员!'});
      ctx.type = 'text/json';
    }
  }

};

module.exports = new Admin();