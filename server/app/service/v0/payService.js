const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../../');
const config = require(`${rootDirectory}/config/miniprogram.config.js`);
const payModel = require(`${rootDirectory}/app/model/v0/payModel`);
const userModel = require(`${rootDirectory}/app/model/v0/userModel`);
const formatData = require(`${rootDirectory}/app/service/formatData`);
const wxpay = require(`${rootDirectory}/app/service/utils`);

class PayService extends formatData{

  async addOrder(ctx){

    //首先拿到前端传过来的参数
    let { orderCode, money, orderID, } = ctx.request.params;
    //首先生成签名sign
    // appid
    const { appid, appsecret, mch_id, mch_key, } = config;
    let nonce_str = wxpay.createNonceStr();
    let timestamp = wxpay.createTimeStamp();
    let body = '测试微信支付';
    let out_trade_no = orderCode;
    let total_fee = wxpay.getmoney(money);
    let spbill_create_ip = req.connection.remoteAddress;
    let notify_url = wxurl;
    let trade_type = 'APP';
    console.log(`APP传过来的参数是: ${orderCode}----${money}------${orderID}----${appid}-----${appsecret}-----${mch_id}-----${mch_key}`);
 
    let sign = wxpay.paysignjsapi(appid, body, mch_id, nonce_str, notify_url, out_trade_no, spbill_create_ip, total_fee, trade_type, mch_key);
 
    console.log('sign==', sign);
 
    //组装xml数据
    // appid
    //商户号
    //随机字符串，不长于32位。
    var formData  = `"<xml>
                        <appid>${appid}</appid>
                        <body><![CDATA[测试微信支付]]></body>
                        <mch_id>${mch_id}</mch_id>
                        <nonce_str>${nonce_str}</nonce_str>
                        <notify_url>${notify_url}</notify_url>
                        <out_trade_no>${out_trade_no}</out_trade_no>
                        <spbill_create_ip>${spbill_create_ip}</spbill_create_ip>
                        <total_fee>${total_fee}</total_fee>
                        <trade_type>${trade_type}</trade_type>
                        <sign>${sign}</sign>
                      </xml>`;
 
    console.log('formData===', formData);
 
    let url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';

    let res = await request({
      hostname: 'api.weixin.qq.com',
      port: 443,
      path: `/pay/unifiedorder`,
      method: 'POST',
      body: formData,
    });

    // 检查回调
    console.log(res, 'response');
    /*let finalsign = wxpay.paysignjsapifinal(appid, mch_id, prepay_id, nonce_str, timestamp, mch_key);
    res.json({'appId': appid, 'partnerId': mchid, 'prepayId': prepay_id, 'nonceStr': nonce_str, 'timeStamp': timestamp, 'package': 'Sign=WXPay', 'sign': finalsign});*/

    /*request({url:url, method:'POST', body: formData}, function(err, response, body){
      if(!err && response.statusCode == 200){
        console.log(body);
        xmlreader.read(body.toString("utf-8"), function (errors, response) {
          if (null !== errors) {
            console.log(errors)
            return;
          }
          console.log('长度===', response.xml.prepay_id.text().length);
          var prepay_id = response.xml.prepay_id.text();
          console.log('解析后的prepay_id==', prepay_id);
          //将预支付订单和其他信息一起签名后返回给前端
          let finalsign = wxpay.paysignjsapifinal(appid, mch_id, prepay_id, nonce_str, timestamp, mch_key);
          res.json({'appId': appid, 'partnerId': mchid, 'prepayId': prepay_id, 'nonceStr': nonce_str, 'timeStamp': timestamp, 'package': 'Sign=WXPay', 'sign': finalsign});
        });
      }
    });*/

    console.log(ctx.request.header);

    let response;
    try{
      let data = await payModel.find({key: 'kurse'}, '-_id').limit(3);
      response = this.formatDataSuccess(data);
    } catch(e){
      response = this.formatDataFail(e.message);
      ctx.throw(500);
    }
    return response;
  }

}

module.exports = new PayService();