const {formatData, saveModel} = require('./formatData');
const addressModel = require('../../models/addressModel');

class Address{

  async getAddressList(ctx){
    const headers = ctx.request.headers;
    console.log(headers);
    let data = await addressModel.find({openid: headers.authorization}, '-_id');
    ctx.info(`${ctx.url}: ${data}`);
    ctx.body = await formatData(data);
    ctx.type = 'text/json';
  }

  async setAddress(ctx){
    const params = JSON.parse(ctx.request.body);
    // console.log(params, '参数');
    const openid = ctx.request.header.authorization;
    let saveData = {
      openid: openid,
      name: params.name,
      isDefault: params.isDefault,
      phone: params.phone,
      area: params.area,
      detail: params.detail
    };
    let newAddress = new addressModel(saveData);
    // let res = await saveModel(newAddress);
    let res = await newAddress.save();
    // console.log(res._id);
    if (res._id) {
      ctx.body = await formatData({info: '新增地址成功！'});
      ctx.type = 'text/json';
    } else {
      ctx.body = await formatDataFail({info: '新增地址失败！'});
      ctx.type = 'text/json';
    }
  }

}

module.exports = new Address();