const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../../');
const userService = require(`${rootDirectory}/service/v0/userService`);

class User{

	async login(ctx){
		let response = await userService.login(ctx);
		ctx.body = response;
	}

	async getUserInfo(ctx){
		let response = await userService.getUserInfo(ctx);
		ctx.body = response;
	}

}

module.exports = new User();