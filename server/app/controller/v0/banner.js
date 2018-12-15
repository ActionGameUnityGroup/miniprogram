const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../');
const bannerService = require(`${rootDirectory}/service/v0/bannerService`);

class Banner{
	async getBanner(ctx){
		const response = await bannerService.getBanner(ctx);
		ctx.body = response;
		ctx.type = 'text/json';
	}
}

module.exports = new Banner();