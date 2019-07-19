const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../../');
const adminService = require(`${rootDirectory}/service/v1/adminService`);

class Admin {

  async login(ctx) {
    let response = await adminService.login(ctx);
    ctx.body = response;
  }

  /*async getAdminInfo(ctx){
    let response = await adminService.getAdminInfo(ctx);
    ctx.body = response;
  }*/

}

module.exports = new Admin();