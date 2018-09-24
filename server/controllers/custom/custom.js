const {formatData, formatDataFail} = require('../api/formatData');
const customModel = require('../../models/customModel');
// const request = require('../../app/request');
// const WXBizDataCrypt = require('../../app/WXBizDataCrypt');
// const crypto = require('crypto');
const WXBizMsgCrypt = require('./WXBizMsgCrypt');

class Custom {

  async getUserMessage(ctx){
    let params = ctx.query;
    console.log(ctx.request.body, '是否有body');
    /*
      6eac6834e2dd2ba8ab1694cd4fb6f5c4ccb82238 签名
      1537521497 时间戳
      321865937 随机数
      2387209843328860127 随机字符串
     */
    // let data = await customModel.find(query, '-_id');
    var to_xml = `<xml><ToUserName><![CDATA[oia2TjjewbmiOUlr6X-1crbLOvLw]]></ToUserName><FromUserName><![CDATA[gh_7f083739789a]]></FromUserName><CreateTime>1407743423</CreateTime><MsgType>  <![CDATA[video]]></MsgType><Video><MediaId><![CDATA[eYJ1MbwPRJtOvIEabaxHs7TX2D-HV71s79GUxqdUkjm6Gs2Ed1KF3ulAOA9H1xG0]]></MediaId><Title><![CDATA[testCallBackReplyVideo]]></Title><Descript  ion><![CDATA[testCallBackReplyVideo]]></Description></Video></xml>`;
    var signature = params.signature;
    var timestamp = params.timestamp;
    var nonce = params.nonce;
    var echostr = params.echostr;
    console.log(signature, '签名');
    console.log(timestamp, '时间戳');
    console.log(nonce, '随机数');
    console.log(echostr, '随机字符串');
    var token = 'changdao';
    var encodingAESKey = '2NViDJCTlFv2IGxFrn4jQJJFWhSlFqqdHlXHw45pgH2';
    var appid = 'wxba59a2c0824fd1db';
    let cryptor = new WXBizMsgCrypt(token, encodingAESKey, appid);
    let data = cryptor.EncryptMsg(to_xml, nonce, timestamp);
    // let cryptor = new WXBizMsgCrypt('', '2NViDJCTlFv2IGxFrn4jQJJFWhSlFqqdHlXHw45pgH2', 'wxba59a2c0824fd1db');
    // console.log(cryptor, '不知道是啥');
    // let data = cryptor.decrypt(echostr);
    console.log(data, 'data');
    ctx.body = data;
    // ctx.type = 'text/json';
  }

};

module.exports = new Custom();