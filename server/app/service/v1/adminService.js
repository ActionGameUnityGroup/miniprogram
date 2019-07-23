const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../');
const adminModel = require(`${rootDirectory}/model/v1/adminModel`);
const formatData = require(`${rootDirectory}/service/formatData`);
const uuid = require('uuid');
// const checkLogged = request(`${rootDirectory}/service/checkLogged`);

class AdminService extends formatData {

  async login(ctx) {
    let response;
    try {
      /*let isLogged = checkLogged(ctx);
      if (!isLogged) {
        response = this.formatDataFail('登录信息已过期，请登录');
      } else {}*/
      let params = JSON.parse(ctx.request.body) || {};
      let { username, password } = params;
      if (!username || !password) {
        throw new Error('登录失败！');
      }
      let queryOptions = { username, password };
      let adminInfo = await adminModel.findOne(queryOptions, '-_id -username -password');
      if (adminInfo) {
        ctx.session.logged = true;
        ctx.session.token = uuid.v4();
        // console.log(adminInfo.token);
        // console.log('session:', adminInfo.token);
        response = this.formatDataSuccess({
          avatar: adminInfo.avatar,
          nickname: adminInfo.nickname,
          info: '欢迎你, '+ adminInfo.nickname,
          // token: adminInfo.token,
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