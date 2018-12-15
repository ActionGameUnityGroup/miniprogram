const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../');
const bannerService = require(`${rootDirectory}/service/v0/bannerService`);

class Banner{
	async getBannerList(ctx){
		const response = await bannerService.getBannerList(ctx);
		ctx.body = response;
		ctx.type = 'text/json';
	}
}

module.exports = new Banner();