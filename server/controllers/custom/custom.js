const {formatData, formatDataFail} = require('../api/formatData');
const customModel = require('../../models/customModel');
// const request = require('../../app/request');
// const WXBizDataCrypt = require('../../app/WXBizDataCrypt');
const crypto = require('crypto');
const xml2js = require('xml2js');
// const WXBizMsgCrypt = require('./WXBizMsgCrypt');
const decryptWXContact = require('./decryptContact');
const WX = require('./wx');
const miniapp = new WX({
  token: 'changdao',
  appID: 'wxba59a2c0824fd1db',
  appScrect: '5fb3f9c59ed54b36206dd07288620d7d'
});

class Custom {

  async getUserMessage(ctx){
    // 获取用户信息
    let params = ctx.query;
    console.log(ctx.request.body, '请求body');
    // signature  签名
    // echostr  随机字符串
    // timestamp  时间戳
    // nonce  随机数

    // 1. 获取微信推送过来的信息
    let {
      signature,
      echostr,
      timestamp,
      nonce
    } = params;

    // 2. 将token、timestamp、nonce三个参数进行字典排序
    let array = ['changdao', timestamp, nonce];
    await array.sort();

    // 3. 将三个参数拼接成一个字符串进行sha1加密
    const tempStr = array.join('');
    const hashCode = crypto.createHash('sha1');
    const resultCode = hashCode.update(tempStr, 'utf8').digest('hex');
    console.log(resultCode, '加密后的code');
    // 4. 将加密后的字符串与signature对比，标识请求来源于微信
    if(resultCode === signature){
      ctx.body = echostr;
    } else {
      ctx.body = {code: -1, data: '验证失败'};
    }
  }

  async achieveUserMessage(ctx){
    // 获取用户信息
    let params = ctx.query;
    console.log(params, '请求参数');
    console.log(ctx.request.body, '请求body');
    console.log(ctx.text.toString(), '请求text');
    let body = JSON.parse(ctx.text.toString());
    console.log(body, 'xml的body');

    const builder = new xml2js.Builder(); // json转xml

    const { ToUserName, Encrypt } = body;
    console.log('ToUserName: ', ToUserName);
    console.log('Encrypt: ', Encrypt);
    const decryptData = decryptWXContact(Encrypt);
    /*const xml = `<xml>
                  <ToUserName>${decryptData.ToUserName}</ToUserName>
                  <FromUserName>${decryptData.FromUserName}</FromUserName>
                  <CreateTime>${decryptData.CreateTime}</CreateTime>
                  <MsgType>transfer_customer_service</MsgType>
                </xml>`;*/
    const returnMsg = {
      ToUserName: decryptData.ToUserName,
      FromUserName: decryptData.FromUserName,
      CreateTime: decryptData.CreateTime,
      MsgType: 'transfer_customer_service'
    };
    ctx.body = returnMsg;
    /*decryptData.MsgType = 'transfer_customer_service ';
    console.log('json：', decryptData);
    console.log('json转xml');
    const returnXML = builder.buildObject(decryptData);
    console.log('json：', returnXML);
    ctx.body = returnXML;*/
    /*
      ToUserName
      FromUserName
      CreateTime
      MsgType
      Content
      MsgId
     */
    /*
    <xml>
      <ToUserName><![CDATA[oia2TjjewbmiOUlr6X-1crbLOvLw]]></ToUserName>
      <FromUserName><![CDATA[gh_7f083739789a]]></FromUserName>
      <CreateTime>1407743423</CreateTime>
      <MsgType><![CDATA[video]]></MsgType>
      <Video>
        <MediaId><![CDATA[eYJ1MbwPRJtOvIEabaxHs7TX2D-HV71s79GUxqdUkjm6Gs2Ed1KF3ulAOA9H1xG0]]></MediaId>
        <Title><![CDATA[testCallBackReplyVideo]]></Title>
        <Description><![CDATA[testCallBackReplyVideo]]></Description>
      </Video>
    </xml>
     */
    /*const { MsgType, FromUserName, MsgId } = decryptData;
    const replyMsg = decryptData.Content;
    console.log('消息类型: ', MsgType);
    console.log('openid: ', FromUserName);
    console.log('消息ID: ', MsgId);

    if (MsgType === 'text') { // 文本消息
      miniapp.sendTextMessage(FromUserName, replyMsg);
    }*/

    // ctx.body = 'success';

    // 非加密方式
    // const { MsgType, FromUserName, Content,  Event } = ctx.request.body;
    

   /* let {
      msg_signature,
      signature,
      echostr,
      timestamp,
      nonce
    } = params;*/

    // console.log('直接返回success看看怎么样');
    /*
      {
        ToUserName: '',
        FromUserName: '',
        CreateTime: '',
        MsgType: '',
        <Content><![CDATA[abcdteT]]></Content>
        <MsgId>6054768590064713728</MsgId>
        <Encrypt><![CDATA[hyzAe4OzmOMbd6TvGdIOO6uBmdJoD0Fk53REIHvxYtJlE2B655HuD0m8KUePWB3+LrPXo87wzQ1QLvbeUgmBM4x6F8PGHQHFVAFmOD2LdJF9FrXpbUAh0B5GIItb52sn896wVsMSHGuPE328HnRGBcrS7C41IzDWyWNlZkyyXwon8T332jisa+h6tEDYsVticbSnyU8dKOIbgU6ux5VTjg3yt+WGzjlpKn6NPhRjpA912xMezR4kw6KWwMrCVKSVCZciVGCgavjIQ6X8tCOp3yZbGpy0VxpAe+77TszTfRd5RJSVO/HTnifJpXgCSUdUue1v6h0EIBYYI1BD1DlD+C0CR8e6OewpusjZ4uBl9FyJvnhvQl+q5rv1ixrcpCumEPo5MJSgM9ehVsNPfUM669WuMyVWQLCzpu9GhglF2PE=]]></Encrypt>
      }
    */

    ctx.body = 'success';



  }

  // async getUserMessage(ctx){
  //   let params = ctx.query;
  //   console.log(ctx.request.body, '是否有body');
  //   /*
  //     6eac6834e2dd2ba8ab1694cd4fb6f5c4ccb82238 签名
  //     1537521497 时间戳
  //     321865937 随机数
  //     2387209843328860127 随机字符串
  //    */
  //     // signature  签名
  //     // echostr  随机字符串
  //     // timestamp  时间戳
  //     // nonce  随机数
  //   // let data = await customModel.find(query, '-_id');
  //   var to_xml = `<xml><ToUserName><![CDATA[oia2TjjewbmiOUlr6X-1crbLOvLw]]></ToUserName><FromUserName><![CDATA[gh_7f083739789a]]></FromUserName><CreateTime>1407743423</CreateTime><MsgType>  <![CDATA[video]]></MsgType><Video><MediaId><![CDATA[eYJ1MbwPRJtOvIEabaxHs7TX2D-HV71s79GUxqdUkjm6Gs2Ed1KF3ulAOA9H1xG0]]></MediaId><Title><![CDATA[testCallBackReplyVideo]]></Title><Descript  ion><![CDATA[testCallBackReplyVideo]]></Description></Video></xml>`;
  //   var signature = params.signature;
  //   var timestamp = params.timestamp;
  //   var nonce = params.nonce;
  //   var echostr = params.echostr;
  //   console.log(signature, '签名');
  //   console.log(timestamp, '时间戳');
  //   console.log(nonce, '随机数');
  //   console.log(echostr, '随机字符串');
  //   var token = 'changdao';
  //   var encodingAESKey = '2NViDJCTlFv2IGxFrn4jQJJFWhSlFqqdHlXHw45pgH2';
  //   var appid = 'wxba59a2c0824fd1db';
  //   let cryptor = new WXBizMsgCrypt(token, encodingAESKey, appid);
  //   let data = cryptor.EncryptMsg(to_xml, nonce, timestamp);
  //   // let cryptor = new WXBizMsgCrypt('', '2NViDJCTlFv2IGxFrn4jQJJFWhSlFqqdHlXHw45pgH2', 'wxba59a2c0824fd1db');
  //   // console.log(cryptor, '不知道是啥');
  //   // let data = cryptor.decrypt(echostr);
  //   console.log(data, 'data');
  //   ctx.body = data;
  //   // ctx.type = 'text/json';
  // }

};

module.exports = new Custom();