const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../');
const payModel = require(`${rootDirectory}/model/v0/payModel`);
const { formatDataSuccess, formatDataFail } = require(`${rootDirectory}/service/formatData`);

class PayService{

	async getKurseList(ctx){
		let response;
		try{
			let data = await payModel.find({key: 'kurse'}, '-_id').limit(3);
			response = formatDataSuccess(data);
		} catch(e){
			response = formatDataFail(e.message);
			ctx.throw(500);
		}
		return response;
	}

}

module.exports = new PayService();