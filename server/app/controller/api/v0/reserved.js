const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../../');
const reservedService = require(`${rootDirectory}/service/v0/reservedService`);

class Reserved{

	async getReservedList(ctx){
		let response = await reservedService.getReservedList(ctx);
		ctx.body = response;
	}

	async setReservedInfo(ctx){
		let response = await reservedService.setReservedInfo(ctx);
		ctx.body = response;
	}

}

module.exports = new Reserved();