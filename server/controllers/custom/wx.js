const fs = require('fs');
const path = require('path');
const request = require('request-promise');


const domain = `https://api.weixin.qq.com`;
const apis = {
  token: `${domain}/cgi-bin/token`, // 获取token
  sendMessage: `${domain}/cgi-bin/message/custom/send`, // 发送消息
};
const accessTokenJson = require('./access_token.json'); //引入本地存储的 access_token

class Wechat {
  constructor(config) {
    this.config = config;
    this.token = config.token
    this.appID = config.appID
    this.appScrect = config.appScrect
  }

  // 获取AccessToken
  getAccessToken() {
    return new Promise((resolve, reject) => {
      const currentTime = new Date().getTime();
      const url = `${apis.token}?grant_type=client_credential&appid=wxba59a2c0824fd1db&secret=5fb3f9c59ed54b36206dd07288620d7d`;
      // 过期判断
      if (!accessTokenJson.access_token || accessTokenJson.access_token == '' || accessTokenJson.expires_time < currentTime) {
        request(url).then(data => {
          const res = JSON.parse(data);
          if (data.indexOf('errcode' < 0)) {
            accessTokenJson.access_token = res.access_token;
            accessTokenJson.expires_time = new Date().getTime() + (parseInt(res.expires_in) - 200) * 1000;
            // 存储新的 access_token
            fs.writeFile('./access_token.json', JSON.stringify(accessTokenJson), (err, res) => {
              if (err) {
                reject();
                return;
              }
            })
            resolve(accessTokenJson.access_token);
          } else {
            resolve(res);
          }
        }).catch((err) => {
          reject();
        })
      } else {
        resolve(accessTokenJson.access_token);
      }
    })
  }


  // 发送文本消息
  async sendTextMessage(openid, message) {
    const token = await this.getAccessToken();
    const msgData = {
      "touser": openid,
      "msgtype": 'text',
      "text": {
        "content": message
      }
    }
    return request({
      method: 'POST',
      uri: `${apis.sendMessage}?access_token=${token}`,
      body: msgData,
      json: true
    })
  }
}

module.exports = Wechat