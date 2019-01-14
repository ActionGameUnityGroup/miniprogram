const path = require('path');
const request = require('request');
const xmlreader = require('xmlreader');
const crypto = require('crypto');
const uuid = require('uuid');
const rootDirectory = path.resolve(__dirname, '../../../');
const config = require(`${rootDirectory}/config/miniprogram.config.js`);
const orderModel = require(`${rootDirectory}/app/model/v0/orderModel`);
const formatData = require(`${rootDirectory}/app/service/formatData`);

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
    const { formatDataSuccess, formatDataFail } = this;
    try{
      const { appid, mch_id, secret_key, } = config;
      console.log(appid, mch_id, secret_key);
      /*let nonce_str = wxpay.createNonceStr();
      let timestamp = wxpay.createTimeStamp();
      let body = '测试微信支付';
      let out_trade_no = orderId;
      let total_fee = wxpay.getmoney(money);
      let spbill_create_ip = ctx.request.header['x-forwarded-for'] || '';
      console.log(spbill_create_ip, '终端IP');
      let notify_url = 'https://www.changdaolife.cn/api/v0/pay/receivePaymentInfo';
      let trade_type = 'JSAPI';*/
      // console.log(`APP传过来的参数是: ${orderId}-----${money}-----${appid}-----${appsecret}-----${mch_id}-----${mch_key}`);
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

/*
appid=wxba59a2c0824fd1db
body=测试微信支付
mch_id=1522061141
nonce_str=5d9b3f15a038481b9a985a711f78e0ab
notify_url=https://www.changdaolife.cn/api/v0/pay/receivePaymentInfo
openid=owLC84lbLCkG0nhZNu6pq7ZYakws
out_trade_no=154736535580628jcnf7p4hh
spbill_create_ip=127.0.0.1
total_fee=1
trade_type=JSAPI
key=5fb3f9c59ed54b36206dd07288620d7d
 */

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

      await request({ url: url, method: 'POST', body: formData }, async (err, res, body) => {
        if(!err && res.statusCode == 200){
          console.log(body);
          xmlreader.read(body.toString("utf-8"), function (error, xmlResponse) {
            if (null !== error) {
              console.log(error)
              return;
            }
            console.log(xmlResponse.xml.return_code.text(), 'return_code');
            console.log(xmlResponse.xml.return_msg.text(), 'return_code');
            let timeStamp = `${new Date().getTime() / 1000}`;
            let paySignString = `appId=${appid}&nonceStr=${order.nonce_str}&package=prepay_id=${xmlResponse.xml.prepay_id.text()}&signType=MD5&timeStamp=${timeStamp}&key=${secret_key}`
            let paySign = await crypto.createHash('md5').update(paySignString, 'utf8').digest('hex').toUpperCase();
            response = formatDataSuccess({
              timeStamp: timeStamp,
              nonceStr: order.nonce_str,
              package: `prepay_id=${xmlResponse.xml.prepay_id.text()}`,
              signType: 'MD5',
              paySign: paySign,
            });
            /*console.log('长度===', xmlResponse.xml.prepay_id.text().length);
            var prepay_id = xmlResponse.xml.prepay_id.text();
            console.log('解析后的prepay_id==', prepay_id);*/
            //将预支付订单和其他信息一起签名后返回给前端
            // let finalsign = wxpay.paysignjsapifinal(appid,mch_id,prepay_id,nonce_str,timestamp,mchkey);
            // res.json({'appId':appid,'partnerId':mchid,'prepayId':prepay_id,'nonceStr':nonce_str,'timeStamp':timestamp,'package':'Sign=WXPay','sign':finalsign});
          });
        }
      });

      // 检查回调
      // let xmlResponse = await xmlreader.read(res.body.toString("utf-8"));
      /*await xmlreader.read(res.body.toString("utf-8"), function (error, xmlResponse) {
        if (null !== error) {
          console.log(error);
          throw new Error(error)
        }
        console.log(xmlResponse, 'xmlResponse');
        console.log('长度===', xmlResponse.xml.prepay_id.text().length);
        var prepay_id = xmlResponse.xml.prepay_id.text();
        console.log('解析后的prepay_id==',prepay_id);
        //将预支付订单和其他信息一起签名后返回给前端
        let finalsign = wxpay.paysignjsapifinal(appid,mch_id,prepay_id,nonce_str,timestamp,mchkey);
        response = this.formatDataSuccess({'appId': appid, 'partnerId': mchid, 'prepayId': prepay_id, 'nonceStr': nonce_str, 'timeStamp': timestamp, 'package': 'Sign=WXPay', 'sign': finalsign});
      });*/
      /*console.log(xmlResponse, 'xml');
      console.log('长度===', xmlResponse.xml.prepay_id.text().length);
      var prepay_id = xmlResponse.xml.prepay_id.text();
      console.log('解析后的prepay_id==', prepay_id);
      //将预支付订单和其他信息一起签名后返回给前端
      let finalsign = wxpay.paysignjsapifinal(appid, mch_id, prepay_id, nonce_str, timestamp, mch_key);*/
    } catch(e){
      response = this.formatDataFail(e.message);
      ctx.throw(500);
    }
    return response;
  }

  async receivePaymentInfo(ctx){
    console.log(ctx.request.body);
    console.log(ctx.request.query);
  }

}

module.exports = new PayService();