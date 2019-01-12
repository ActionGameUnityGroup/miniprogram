const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../');
const reservedModel = require(`${rootDirectory}/model/v0/reservedModel`);
const formatData = require(`${rootDirectory}/service/formatData`);

class reservedService extends formatData{

	async getReservedList(ctx){
		let response;
		try{
			let data = await reservedModel.find({}, '-_id');
			response = this.formatDataSuccess(data);
		} catch(e){
			response = this.formatDataFail(e.message);
			ctx.throw(500);
		}
		return response;
	}

	async setReservedInfo(ctx){
		const { openId, name, mobile, profession, city, email, gender, } = ctx.request.body || '';
		let response;
		try{
			let data = await reservedModel.find({openId: openId}, '-_id');
			response = this.formatDataSuccess(data);
		} catch(e){
			response = this.formatDataFail(e.message);
			ctx.throw(500);
		}
		return response;
	}

}

module.exports = new reservedService();