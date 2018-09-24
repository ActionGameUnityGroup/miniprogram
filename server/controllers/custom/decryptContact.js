// decryptContact.js

const crypto = require('crypto') // 加密模块
// const miniAppConfig = require('./wx_config');

const decodePKCS7 = function (buff) {
  let pad = buff[buff.length - 1];
  if (pad < 1 || pad > 32) {
    pad = 0;
  }
  return buff.slice(0, buff.length - pad);
};

// 微信转发客服消息解密
const decryptContact = (key, iv, crypted) => {
  const aesCipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  aesCipher.setAutoPadding(false);
  let decipheredBuff = Buffer.concat([aesCipher.update(crypted, 'base64'), aesCipher.final()]);
  decipheredBuff = decodePKCS7(decipheredBuff);
  const lenNetOrderCorpid = decipheredBuff.slice(16);
  const msgLen = lenNetOrderCorpid.slice(0, 4).readUInt32BE(0);
  const result = lenNetOrderCorpid.slice(4, msgLen + 4).toString();
  return result;
};

// 解密微信返回给配置的消息服务器的信息
const decryptWXContact = (wechatData) => {
  const key = new Buffer('2NViDJCTlFv2IGxFrn4jQJJFWhSlFqqdHlXHw45pgH2' + '=', 'base64');
  const iv = key.slice(0, 16);
  const result = decryptContact(key, iv, wechatData);
  const decryptedResult = JSON.parse(result);
  console.log(decryptedResult);
  return decryptedResult;
};

module.exports = decryptWXContact;