const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../../');
const hotListService = require(`${rootDirectory}/service/v0/hotListService`);

class Activity{

	async getHotList(ctx){
		const response = await hotListService.getHotList(ctx);
		ctx.body = response;
		ctx.type = 'text/json';
	}

}

module.exports = new Activity();