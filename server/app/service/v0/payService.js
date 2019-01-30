const path = require('path');
// const request = require('request');
const parseString  = require('xml2js').parseString;
const crypto = require('crypto');
const uuid = require('uuid');
const rootDirectory = path.resolve(__dirname, '../../../');
const config = require(`${rootDirectory}/config/miniprogram.config.js`);
const orderModel = require(`${rootDirectory}/app/model/v0/orderModel`);
const formatData = require(`${rootDirectory}/app/service/formatData`);
const request = require(`${rootDirectory}/app/service/request`);
const xmlParser = require(`${rootDirectory}/app/service/xmlParser`);

class PayService extends formatData{

  async objTostring(obj){
    var preSign = '';
    for (let key in obj) {
      preSign += `${key}=${obj[key]}&`
    }
    return preSign
  }

  async payment(ctx){
    let response;
    let { orderId, openid, } = ctx.request.body;
    try{
      const { appid, mch_id, secret_key, } = config;
      let orderList = await orderModel.find({orderId: orderId}, '-_id');
      console.log(orderList);
      let orderItem = orderList[0];
      console.log(orderItem);
      if(!orderItem){
        throw new Error('没有该订单!');
      }
      let order = {
        appid: appid,
        mch_id: mch_id,
        nonce_str: (uuid.v4()).replace(/-/g, ''),
        sign: '',
        attach: orderItem.attach,
        body: orderItem.detail,
        out_trade_no: orderId,
        total_fee: Number(orderItem.money) * 100,
        spbill_create_ip: ctx.request.ip.replace(/::ffff:/g, ''),
        notify_url: 'https://www.changdaolife.cn/api/v0/pay/receivePaymentInfo',
        trade_type: 'JSAPI', //小程序支付必须
        openid: orderItem.openId,
      };

      let preSign = `appid=${order.appid}&attach=${order.attach}&body=${order.body}&mch_id=${order.mch_id}&nonce_str=${order.nonce_str}&notify_url=${order.notify_url}&openid=${order.openid}&out_trade_no=${order.out_trade_no}&spbill_create_ip=${order.spbill_create_ip}&total_fee=${order.total_fee}&trade_type=${order.trade_type}&key=${secret_key}`;
      order.sign = await crypto.createHash('md5').update(preSign, 'utf8').digest('hex').toUpperCase();

      let url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';

      //组装xml数据
      // appid
      //商户号
      //随机字符串，不长于32位。
      let formData = `<xml>
                        <appid>${order.appid}</appid>
                        <attach>${order.attach}</attach>
                        <body>${order.body}</body>
                        <mch_id>${order.mch_id}</mch_id>
                        <nonce_str>${order.nonce_str}</nonce_str>
                        <notify_url>${order.notify_url}</notify_url>
                        <openid>${order.openid}</openid>
                        <out_trade_no>${order.out_trade_no}</out_trade_no>
                        <spbill_create_ip>${order.spbill_create_ip}</spbill_create_ip>
                        <total_fee>${order.total_fee}</total_fee>
                        <trade_type>${order.trade_type}</trade_type>
                        <sign>${order.sign}</sign>
                      </xml>`;

      let body = await request({ url: url, method: 'POST', body: formData });

      let xmlResponse = await xmlParser.xmlToJson(body);
      let timeStamp = `${parseInt(new Date().getTime() / 1000)}`;
      /*
      appId
      nonceStr
      package
      signType
      timeStamp
      key
       */
      let paySignString = `appId=${appid}&nonceStr=${order.nonce_str}&package=prepay_id=${xmlResponse.xml.prepay_id}&signType=MD5&timeStamp=${timeStamp}&key=${secret_key}`;
      let paySign = await crypto.createHash('md5').update(paySignString, 'utf8').digest('hex').toUpperCase();
      response = this.formatDataSuccess({
        appId: appid,
        timeStamp: timeStamp,
        nonceStr: order.nonce_str,
        package: `prepay_id=${xmlResponse.xml.prepay_id}`,
        signType: 'MD5',
        paySign: paySign,
      });
    } catch(e){
      console.log(e.message, 'something wrong...');
      response = this.formatDataFail(e.message);
    }
    return response;
  }

  async receivePaymentInfo(ctx){
    let response;
    try{
      const { openId, orderId, } = ctx.request.body;
      if(!openId || !orderId){
        throw new Error('信息不足，无法记录！');
      }
      const updateRes = await orderModel.update({ openId: openId, orderId: orderId, }, {payTime: new Date().getTime(), }, {multi: true,});
      response = this.formatDataSuccess('信息已记录！');
      if(Object.keys(body).length){}
    }catch(e){
      response = this.formatDataFail('信息无法记录！');
    }
    return response;
  }

}

module.exports = new PayService();