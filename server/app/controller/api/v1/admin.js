const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../../');
const adminService = require(`${rootDirectory}/service/v1/adminService`);

class Admin{

  async login(ctx){
    let response = await adminService.login(ctx);
    ctx.body = response;
    ctx.type = 'text/json';
  }

  async getadminInfo(ctx){
    let response = await adminService.getadminInfo(ctx);
    ctx.body = response;
    ctx.type = 'text/json';
  }

}

module.exports = new Admin();