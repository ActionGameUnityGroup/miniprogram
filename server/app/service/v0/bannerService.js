const path = require('path');
const fs = require('fs');
const rootDirectory = path.resolve(__dirname, '../../');
const bannerModel = require(`${rootDirectory}/model/v0/bannerModel`);
const formatData = require(`${rootDirectory}/service/formatData`);

class BannerService extends formatData{
	async getBannerList(ctx){
		// const params = ctx.request.query;
		// const reqPage = params.page;
		let response;

		try{
			let data = await bannerModel.find({}, '-_id').sort({weight: -1});
			response = this.formatDataSuccess([{bannerList: data}]);
		} catch(e){
			response = this.formatDataFail(e.message);
			ctx.throw(500);
		}

		return response;
	}

	async getBannerItem(ctx){
		// const params = ctx.request.query;
		// const reqPage = params.page;
		let response;

		try{
			let data = await bannerModel.find({}, '-_id').sort({weight: -1});
			response = this.formatDataSuccess([{bannerList: data}]);
		} catch(e){
			response = this.formatDataFail(e.message);
			ctx.throw(500);
		}

		return response;
	}

	async updateBanner(ctx){
		// const params = ctx.request.query;
		// const reqPage = params.page;
		let response;

		try{
			let data = await bannerModel.find({}, '-_id').sort({weight: -1});
			console.log(data);
			response = this.formatDataSuccess([{bannerList: data}]);
		} catch(e){
			response = this.formatDataFail(e.message);
			ctx.throw(500);
		}

		return response;
	}

	async upload(ctx){
		console.log('上传');
		const files = ctx.request.body.files;
		console.log(files, '文件');
		let response;
		try{
			let ws = fs.createWriteStream('')
			response = this.formatDataSuccess({info: '上传成功'});
		} catch(e){
			response = this.formatDataFail(e.message);
		}
		return response;
	}
}

module.exports = new BannerService();