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
    //首先生成签名sign
    // appid
    /*appid  小程序ID
      mch_id  商户号
      nonce_str 随机字符串
      sign  签名
      body  商品描述
      out_trade_no  商户订单号
      total_fee 标价金额
      spbill_create_ip  终端IP
      notify_url  通知地址
      trade_type  交易类型*/
    let response;
    //首先拿到前端传过来的参数
    let { orderId, money, openid, } = ctx.request.body;
    console.log(orderId, money, openid);
    try{
      const { appid, mch_id, secret_key, } = config;
      console.log(appid, mch_id, secret_key);
      let orderList = await orderModel.find({orderId: orderId}, '-_id');
      console.log(orderList, '订单列表');
      console.log(orderList[0], '订单信息');
      console.log(orderList[0].attach, '订单名称');
      let order = {
        appid: appid,
        mch_id: mch_id,
        nonce_str: (uuid.v4()).replace(/-/g, ''),
        sign: '',
        attach: '测试支付',
        body: '测试微信支付',
        out_trade_no: orderId,
        total_fee: Number(money) * 100,
        spbill_create_ip: ctx.request.ip.replace(/::ffff:/g, ''),
        notify_url: 'https://www.changdaolife.cn/api/v0/pay/receivePaymentInfo',
        trade_type: 'JSAPI', //小程序支付必须
        openid: openid,
      };

      /*appid
        body
        mch_id
        nonce_str
        notify_url
        out_trade_no
        spbill_create_ip
        total_fee
        trade_type*/

      let preSign = `appid=${order.appid}&attach=${order.attach}&body=${order.body}&mch_id=${order.mch_id}&nonce_str=${order.nonce_str}&notify_url=${order.notify_url}&openid=${order.openid}&out_trade_no=${order.out_trade_no}&spbill_create_ip=${order.spbill_create_ip}&total_fee=${order.total_fee}&trade_type=${order.trade_type}&key=${secret_key}`;
      console.log(secret_key, '密钥');
      order.sign = await crypto.createHash('md5').update(preSign, 'utf8').digest('hex').toUpperCase();
      console.log('签名： ', order.sign);

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

      console.log('formData===', formData);

      let body = await request({ url: url, method: 'POST', body: formData });
      console.log(body, 'response body');

      let xmlResponse = await xmlParser.xmlToJson(body);
      console.log(xmlResponse.xml, 'xmlResponse');
      let timeStamp = parseInt(new Date().getTime() / 1000);
      let paySignString = `appId=${appid}&nonceStr=${xmlResponse.xml.nonce_str}&package=prepay_id=${xmlResponse.xml.prepay_id}&signType=MD5&timeStamp=${timeStamp}&key=${secret_key}`;
      let paySign = await crypto.createHash('md5').update(paySignString, 'utf8').digest('hex').toUpperCase();
      response = this.formatDataSuccess({
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

  async setSignature(appid, nonce_str, prepay_id, signType, timeStamp, secret_key){}

  async receivePaymentInfo(ctx){
    console.log(ctx.request.body);
    console.log(ctx.request.query);
    console.log('收到支付回调信息');
    let response;
    try{
      response = this.formatDataSuccess('信息已记录！');
    }catch(e){
      response = this.formatDataFail('信息无法记录！');
    }
    return response;
  }

}

module.exports = new PayService();