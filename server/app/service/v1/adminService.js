const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../');
const adminModel = require(`${rootDirectory}/model/v1/adminModel`);
const formatData = require(`${rootDirectory}/service/formatData`);

class AdminService extends formatData{

  async login(ctx){
    // 登录以后返回openID
    // 以后请求接口在请求头加入openID
    /*
      请求参数：
      code
      encryptedData
      iv
    */
    let response;
    try {
      let params = JSON.parse(ctx.request.body);
      let adminInfo = await adminModel.find({username: params.username, password: params.password}, '-_id -username -password');
      if(adminInfo.length){
        response = this.formatDataSuccess({
          token: adminInfo[0].token,
          avatar: adminInfo[0].avatar,
          nickname: adminInfo[0].nickname,
          info: '欢迎你, '+ adminInfo[0].nickname,
        });
      } else {
        response = this.formatDataFail('您不是管理员!');
      }
    } catch (e) {
      response = this.formatDataFail(e.message);
    }

    return response;
  }

}

module.exports = new AdminService();