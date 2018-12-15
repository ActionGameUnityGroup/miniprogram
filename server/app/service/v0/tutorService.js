const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../');
const tutorModel = require(`${rootDirectory}/model/v0/tutorModel`);
const { formatDataSuccess, formatDataFail } = require(`${rootDirectory}/service/formatData`);

class TutorService{
	async getTutorList(ctx){
		const params = ctx.request.query;
		let response;
		try{
			let data = await tutorModel.find({});
			response = formatDataSuccess(data);
		} catch(e){
			response = formatDataFail(e.message);
			ctx.throw(500);
		}
		return response;
	}
}

module.exports = new TutorService();