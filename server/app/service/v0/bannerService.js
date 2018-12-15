const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../');
const bannerModel = require(`${rootDirectory}/model/v0/bannerModel`);
const { formatDataSuccess, formatDataFail } = require('../formatData');

class BannerService{
	async getBanner(ctx){
		const params = ctx.request.query;
		const reqPage = params.page;
		let response;

		try{
			let data = await bannerModel.find({page: reqPage});
			response = formatDataSuccess(data);
		} catch(e){
			response = formatDataFail(e.message);
			ctx.throw(500);
		}

		return response;
	}
}

module.exports = new BannerService();