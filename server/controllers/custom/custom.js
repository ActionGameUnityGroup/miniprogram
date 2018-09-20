const {formatData, formatDataFail} = require('../api/formatData');
const customModel = require('../../models/customModel');
// const request = require('../../app/request');
// const WXBizDataCrypt = require('../../app/WXBizDataCrypt');
const WXBizMsgCrypt = require('wechat-crypto');

class Custom {

  async getUserMessage(ctx){
    let params = ctx.query;
    // let data = await customModel.find(query, '-_id');
    const [token, appid, encodingaeskey] = ['changdao2018', "wxba59a2c0824fd1db", '2NViDJCTlFv2IGxFrn4jQJJFWhSlFqqdHlXHw45pgH2'];
    let [
      signature,
      timestamp,
      nonce,
      echostr
    ] = [
      params.signature,
      params.timestamp,
      params.nonce,
      params.echostr,
    ];
    let cryptor = new WXBizMsgCrypt(token, encodingaeskey, appid);
    let data = cryptor.decrypt(echostr);
    console.log(data, 'data');
    ctx.body = data.message;
    // ctx.type = 'text/json';
  }

};

module.exports = new Custom();