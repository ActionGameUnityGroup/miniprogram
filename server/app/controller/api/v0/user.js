const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../../');
const userService = require(`${rootDirectory}/service/v0/userService`);

class User{
	async login(ctx){
		// 
	}
}

module.exports = new User();