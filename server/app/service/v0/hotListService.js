const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../');
const hotListModel = require(`${rootDirectory}/model/v0/hotListModel`);
const formatData = require(`${rootDirectory}/service/formatData`);

class HotListService extends formatData{

	async getHotList(ctx){
		let response;
		try{
			let data = await hotListModel.find({}, '-_id').sort({courseId: -1});
			response = this.formatDataSuccess(data);
		} catch(e){
			response = this.formatDataFail(e.message);
			ctx.throw(500);
		}
		return response;
	}

}

module.exports = new HotListService();