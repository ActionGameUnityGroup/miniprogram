const crypto = require('crypto');

function PKCS7Encoder(){

  this.block_size = 32;

}

PKCS7Encoder.prototype.encode = function(msg){
  /* 对需要加密的明文进行填充补位
  @param text: 需要进行填充补位操作的明文
  @return: 补齐明文字符串
  */
  var text_length = msg.length;
  console.log(text_length, '字符串长度');
  // 计算需要填充的位数
  var amount_to_pad = this.block_size - (text_length % this.block_size);
  console.log(amount_to_pad, '补位数');
  if (amount_to_pad == 0)
    amount_to_pad = this.block_size
  // 获得补位所用的字符
  var pad = '';
  for(var i = 0; i < amount_to_pad; i++){
    pad += String.fromCharCode(amount_to_pad);
  }
  console.log(pad);
  return msg + pad;
}

function XMLParse(){

  /*var AES_TEXT_RESPONSE_TEMPLATE = `<xml>
                                       <Encrypt><![CDATA[%(msg_encrypt)s]]></Encrypt>
                                       <MsgSignature><![CDATA[%(msg_signaturet)s]]></MsgSignature>
                                       <TimeStamp>%(timestamp)s</TimeStamp>
                                       <Nonce><![CDATA[%(nonce)s]]></Nonce>
                                     </xml>`*/
 
//   XMLParse.prototype.extract = function(this, xmltext){
//     // 提取出xml数据包中的加密消息
//     // @param xmltext: 待提取的xml字符串
//     // @return: 提取出的加密消息字符串
//     try{
//       var xml_tree = ET.fromstring(xmltext)
//       encrypt = xml_tree.find("Encrypt")
//       touser_name = xml_tree.find("ToUserName")
//       return  encrypt.text, touser_name.text
//     } catch(e){
//       return ierror.WXBizMsgCrypt_ParseXml_Error,None,None
//     }
//   }

}

XMLParse.prototype.generate = function(encrypt, signature, timestamp, nonce){
    // 生成xml消息
    /*@param encrypt: 加密后的消息密文
    @param signature: 安全签名
    @param timestamp: 时间戳
    @param nonce: 随机字符串
    @return: 生成的xml字符串*/
    /*var resp_dict = {
      msg_encrypt: encrypt,
      msg_signaturet: signature,
      timestamp: timestamp,
      nonce: nonce,
    }*/
    var resp_xml = `<xml>
                      <Encrypt>${encrypt}</Encrypt>
                      <MsgSignature>${signature}</MsgSignature>
                      <TimeStamp>${timestamp}</TimeStamp>
                      <Nonce>${nonce}</Nonce>
                    </xml>`
    return resp_xml;
  }

function Prpcrypt(aesKey){
  this.aesKey = aesKey;
}

Prpcrypt.prototype.encrypt = function(msg, appid){
  msg = createRandomCode() + msg + appid;
  var pkcs7 = new PKCS7Encoder();
  console.log(msg, '第一次明文');
  msg = pkcs7.encode(msg);
  console.log(msg, '加密后的明文');
  var aesKeyLength = this.aesKey.substring(0, 16);
  var cipher = crypto.createCipher('aes-128-cbc', this.aesKey);
  cipher.setAutoPadding(true);
  // console.log(AES, 'AES加密算法');
  var ciphertext = cipher.update(msg, 'utf8', 'base64');
  console.log(ciphertext, '加密后的msg');
  return ciphertext;
  // var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
};

function WXBizMsgCrypt(token, aesKey, appid) {
  this.token = token;
  // this.aesKey = aesKey;
  this.aesKey = new Buffer.from(aesKey+'=', 'binary').toString('base64');
  this.appid = appid;
}

WXBizMsgCrypt.prototype.EncryptMsg = function(replyMsg, nonce, timestamp) {
  var pc = new Prpcrypt(this.aesKey);
  var encrypt = pc.encrypt(replyMsg, this.appid);
  // console.log(ret);
  if (timestamp == null)
    timestamp = toString(parseInt(new Date().getTime()));
  // 生成安全签名
  var sha1 = crypto.createHash('sha1');
  sha1.update(this.token, timestamp, nonce, encrypt);
  var signature = sha1.digest('hex');
  // if (ret != 0) return ret
  var xmlParse = new XMLParse();
  return xmlParse.generate(encrypt, signature, timestamp, nonce)
  /*return {
    encrypt: encrypt,
    signature: signature,
    timestamp: timestamp,
    sNonce: nonce
  };*/
}

const DecryptMsg = function(postData, signature, timeStamp, nonce){
  var pc = Prpcrypt(this.key);
}



function createRandomCode(){
  let code = "";
  var codeLength = 16; //验证码的长度
  var codeChars = new Array(
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ); //所有候选组成验证码的字符，当然也可以用中文的
  for (var i = 0; i < codeLength; i++) {
    var charNum = Math.floor(Math.random() * 52);
    code += codeChars[charNum];
  }
  // console.log(code);
  // resolve(code);
  return code;
}

module.exports = WXBizMsgCrypt;