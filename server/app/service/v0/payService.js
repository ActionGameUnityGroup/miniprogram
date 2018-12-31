const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../');
const payModel = require(`${rootDirectory}/model/v0/payModel`);
const userModel = require(`${rootDirectory}/model/v0/userModel`);
const formatData = require(`${rootDirectory}/service/formatData`);

class PayService extends formatData{

	async addOrder(ctx){
		let response;
		try{
			let data = await payModel.find({key: 'kurse'}, '-_id').limit(3);
			response = this.formatDataSuccess(data);
		} catch(e){
			response = this.formatDataFail(e.message);
			ctx.throw(500);
		}
		return response;
	}

}

module.exports = new PayService();