const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../');
const bannerModel = require(`${rootDirectory}/model/v0/bannerModel`);
const formatData = require(`${rootDirectory}/service/formatData`);

class BannerService extends formatData{
	async getBannerList(ctx){
		const params = ctx.request.query;
		const reqPage = params.page;
		let response;

		try{
			let data = await bannerModel.find({page: reqPage});
			response = this.formatDataSuccess(data);
		} catch(e){
			response = this.formatDataFail(e.message);
			ctx.throw(500);
		}

		return response;
	}
}

module.exports = new BannerService();